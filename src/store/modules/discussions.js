import firebase from '@/helpers/firebase'
import { findById, docToResource } from '@/helpers'

export default {
    namespaced: true,
    state: {
        items: [],
    },
    getters: {
        discussion: (state, getters, rootState) => { // not sure if this is working
            return (id) => {
                console.log(getters)
                const discussion = findById(state.items, id)
                    return { 
                        ...discussion,
                        get author () {
                            return findById(rootState.users.items, discussion.userId)
                        }
                    }
            }
        },
    },
    actions: {
        fetchDiscussion: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'discussions', id }, { root: true }),
        async createDiscussion ({ commit, state, rootState }, {word, definition, question} ) {
            console.log('received dicussion to send to firestore: word, definition, question...', word, definition, question)
            console.log('state from createDiscussion: ', state)
            const discussion = {
                userId: rootState.auth.authId,
                timestamp: Date.now(),
                word,
                definition,
                question
            }
            const batch = firebase.firestore().batch()
            const discRef = firebase.firestore().collection('discussions').doc()
            const feedRef = firebase.firestore().collection('feeds').doc()
            const userRef = firebase.firestore().collection('users').doc(rootState.auth.authId)
            // add new discussion to firestore users collection
            batch.set(discRef, discussion)
            // add new discussion to firestore users collection
            batch.update(userRef, {
                discussions: firebase.firestore.FieldValue.arrayUnion(discRef.id)
            })
            // append new feed to firestore feeds' collection
            batch.set(feedRef, {
                discussion : {
                    word,
                    question,
                    id: discRef.id,
                    userId:discussion.userId
                },
                timestamp: Date.now()
            })
            console.log('new discussion', discRef)
            console.log('newfeed: ', feedRef)
            await batch.commit()
    
            commit('setItem', { resource: 'discussions', item: discRef }, { root: true })
            const userId = rootState.auth.authId
            commit('users/appendDiscussionToUser', { userId, discussionId: discRef.id}, { root: true })
        },
        async updateDiscussion ({commit, state}, {word, definition, question, id}) {
            let discussion = findById(state.items, id)
            const newDiscussion = { ...discussion, word, definition, question }
            const discussionRef = firebase.firestore().collection('discussions').doc(id)
            const batch = firebase.firestore().batch()
            batch.update(discussionRef, newDiscussion)
            await batch.commit()
            commit('setItem', { resource: 'discussions', item: newDiscussion}, { root: true })
            return docToResource(newDiscussion)
        }    
    },
    mutations: {}
}