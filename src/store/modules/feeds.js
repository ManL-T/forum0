import firebase from '@/helpers/firebase'
// import { findById, docToResource } from '@/helpers'

export default {
    namespaced: true,
    state: {
        items: [],
        currentCategory: ""
    },
    getters: {},
    actions: {
        fetchFeeds: ({ commit }) => new Promise((resolve) => {
            // I could be using same pattern as rest fetchs but I have no ids to pass as set
            const unsubscribe = firebase.firestore().collection('feeds').onSnapshot((querySnapshot) => {
                const feeds = querySnapshot.docs.map(doc => {
                    const item = { id: doc.id, ...doc.data() }
                    commit('setItem', { resource: 'feeds', item }, { root: true })
                    return item
                })
                resolve(feeds)
                // console.log('Action >> fetchFeeds: ', feeds)
            })   
            commit('appendUnsubscribe', {unsubscribe}, { root: true })
        }),
        updateCategory ({commit}, {category}) {
            commit('setCategory', category)
        }
    },
    mutations: {
        setCategory (state, category) {
            state.currentCategory = category
            // console.log('category inside mutation', category)
        }
    // we don't need these anymore since we fetch data when we navigate, hence delete????
    // appendDiscussionToFeeds (state, newFeed ) {
    //     state.items.push(newFeed)
    //     console.log('this new discussion gets appended into feeds: ', newFeed)
    // },
    // appendScoopToFeeds (state, { newScoop }) {
    //     const scoopsDiscussion = findById(state.discussions.items, newScoop.discussionId)
    //     const newFeed = {
    //     discussion : {
    //         word: scoopsDiscussion.word,
    //         timestamp : scoopsDiscussion.timestamp,
    //         id: scoopsDiscussion.id
    //     },
    //     latestScoop: newScoop,
    //     id: 'ffdd' + Math.random(),
    //     timestamp: Date.now()
    //     }
    //     state.items.push(newFeed)
    //     console.log('this new scoop gets appended into feeds: ',newFeed )
    // },
    }
}