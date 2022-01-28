import firebase from '@/helpers/firebase'
import { findById, docToResource } from '@/helpers'

export default {
    namespaced: true,
    state: {
        items: [],
    },
    getters: {
    // scoop: state => {
    //   return (id) => {
    //     const scoop = findById(state.items, id)
    //     return {
    //       ...scoop,
    //       get author () {
    //         return findById(state.users.items, scoop.userId)
    //       }
    //     }
    //   }
    // }
    },
    actions: {
        fetchScoops: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'scoops', ids }, { root: true }),
        fetchScoop: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'scoops', id }, { root: true }),
        async createScoop ({ commit, state, rootState }, {discussionId, text}) {
            let scoop = {
                discussionId,
                text,
                timestamp: Date.now(),
                userId: rootState.auth.authId
            }
            console.log('the new scoop: ', scoop)
            console.log('the state when creating scoop: ', state)
            let scoopDiscussion = findById(rootState.discussions.items, discussionId)
            console.log('the scoops discussion: ', scoopDiscussion)
    
            const scoopRef = firebase.firestore().collection('scoops').doc()
            const discRef = firebase.firestore().collection('discussions').doc(scoopDiscussion.id)
            const userRef = firebase.firestore().collection('users').doc(rootState.auth.authId)
            const feedRef = firebase.firestore().collection('feeds').doc()
           
            const batch = firebase.firestore().batch()
            // add new scoop
            batch.set(scoopRef, scoop )
            // add scoop to users' collection
            batch.update(userRef, {
                scoopsCount: firebase.firestore.FieldValue.increment(1)
            })
            // append scoop to its discussion
            batch.update(discRef, {
                scoops:firebase.firestore.FieldValue.arrayUnion(scoopRef.id)
            })
            // append new feed to firestore feeds' collection
            batch.set(feedRef, {
                discussion : {
                    word: scoopDiscussion.word,
                    id: scoopDiscussion.id,
                    timestamp: scoopDiscussion.timestamp
                },
                latestScoop: { 
                    id: scoopRef.id,
                    text: scoop.text
                },
                timestamp: Date.now()
            })
            await batch.commit()
    
            const userId = rootState.auth.authId
            commit('setItem', { resource: 'scoops', item: scoopRef }, { root: true } )
            commit('users/appendScoopToUser', { userId, scoopId: scoopRef.id }, { root: true })
        },
        async updateScoop ({commit, state}, { id, text } ) {
            const scoop = findById(state.items, id)
            const newScoop = { ...scoop, text }
            const scoopRef = firebase.firestore().collection('scoops').doc(id)
            const batch = firebase.firestore().batch()
            batch.update(scoopRef, newScoop)
            await batch.commit()
            commit('setItem', { resource: 'scoops', item: newScoop}, { root: true })
            return docToResource(newScoop)
        }
    },
    mutations: {}
}