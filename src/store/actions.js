import firebase from '@/helpers/firebase'

export default {
    fetchItem ({ commit }, { id, resource, handleUnsubscribe = null }) {
        console.log('Action >> in process of fetching item, fetch from this id: ', id)
        return new Promise((resolve) => {
            const unsubscribe = firebase.firestore().collection(resource).doc(id).onSnapshot((doc) => {
                if (doc.exists) {
                    const item = { ...doc.data(), id: doc.id }
                    console.log('on snapshot: ', resource, doc.data())
                    commit('setItem', { resource, id, item })
                    resolve(item)
                } else {
                    resolve(null)
                }
            })
            if (handleUnsubscribe) {
                handleUnsubscribe(unsubscribe)
            } else {
                commit('appendUnsubscribe', {unsubscribe})
            }
        })
    },
    fetchItems ({ dispatch }, { resource, ids }) {
        ids = ids || []
        console.log('the ids: ', ids)
        return Promise.all(ids.map(id => dispatch('fetchItem', { id, resource })))
    },
    async unsubscribeAllSnapshots ({state, commit}) {
        state.unsubscribes.forEach(unsubscribe => unsubscribe())
        commit('clearAllUnsubscribes')
    }
}