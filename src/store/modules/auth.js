import firebase from '@/helpers/firebase'

export default {
    namespaced: true,
    state: {
        authId: null,
        authUserUnsubscribe: null,
        authObserverUnsubscribe: null
    },
    getters: {
        authUser: (state, rootState, getters, rootGetters) => {
            console.log('rootState: ', rootState)
            console.log('getters: ', getters)
            return rootGetters['user'](state.authId)
        }
    },
    actions: {
        initAuthentication ({ dispatch, commit, state }) {
            if (state.authObserverUnsubscribe) return
            return new Promise((resolve) => {
                const unsubscribe = firebase.auth().onAuthStateChanged( async (user) => {
                    console.log('the user has changed. User: ', user)
                    dispatch('unsubscribeAuthUserSnapshot')
                    if(user) {
                        await dispatch('fetchAuthUser')
                        resolve(user)
                    } else {
                        resolve(null)
                    }
                })
                commit('setAuthObserverUnsubscribe', unsubscribe)
            })
        },
        fetchAuthUser: async ({ dispatch, state, commit }) => {
            const userId = firebase.auth().currentUser?.uid
            if(!userId) return
            await dispatch('fetchItem', { 
                resource: 'users', 
                id: userId,
                handleUnsubscribe: (unsubscribe) => {
                    commit('setAuthUserUnsubscribe', unsubscribe)
                }},
                { root: true })
            commit('setAuthId', userId)
            console.log('using state to get authId: ', state.authId)
        },
        async registerUserWithEmailAndPassword ({dispatch}, { email, name, username, password }) {
            const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
            await dispatch('users/createUser', { id: result.user.uid, email, name, username })
            console.log('dispatching fetchAuthUser')
            await dispatch('fetchAuthUser')
            // await dispatch('signOut')
        },
        async signInWithEmailAndPassword (context, { email, password }) {
            return firebase.auth().signInWithEmailAndPassword(email, password)
        },
        async signOut ({commit}) {
            await firebase.auth().signOut()
            commit('setAuthId', null)
        },
        async unsubscribeAuthUserSnapshot ({ state, commit }) {
            if (state.authUnsubscribe) {
                state.authUserUnsubscribe()
                commit('setAuthUserUnsubscribe', null)
            }
        }
    },
    mutations: {
        setAuthId (state, id) {
            console.log('setting mutation authId to logged in user with id: ', id)
            state.authId = id
            console.log('authId: ',state.authId)
        },
        setAuthUserUnsubscribe (state, unsubscribe) {
            state.authUserUnsubscribe = unsubscribe
        },
        setAuthObserverUnsubscribe (state, unsubscribe) {
            state.authObserverUnsubscribe = unsubscribe
        }
    }
}