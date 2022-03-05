import firebase from '@/helpers/firebase'
import { findById, docToResource } from '@/helpers'

export default {
    state: {
        items: [],
    },
    getters: {
        user: (state, getters, rootState) => {
            return (id) => {
                // console.log('getters in user: ', getters)
                // console.log('on user getter this is the id to get the user: ', id)
                // console.log('on user getter this is the resources to get the user: ', state.items)
                const user = findById(state.items, id)
                if (!user) return null
                return {
                    ...user,
                    // authUser discussions & scoops
                    get discussions () {
                        return rootState.discussions.items.filter(discussion => discussion.userId === user.id)
                    },
                    get scoops () {
                        return rootState.scoops.items.filter(scoop => scoop.userId === user.id)
                    }
                }
            }
        },
    },
    actions: {
        fetchUsers: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'users', ids }, { root: true }),
        fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'users', id }, { root: true }),
        async createUser ({commit}, {id, name, username, email, location}) {
            const usernameLower = username.toLowerCase()
            email = email.toLowerCase()
            const user = { name, username, usernameLower, email, location}
            const userRef = await firebase.firestore().collection('users').doc(id)
            // this is not working??? gets create on authentication but not on firestore, why?
            userRef.set(user)
            const newUser = await userRef.get()
            commit('setItem', { resource: 'users', item: newUser}, { root: true })
            return docToResource(newUser)
        },
        async updateUser ({commit}, user) {
            const updates = {
                username: user.username || null,
                bio: user.bio || null,
                location: user.location || null
            }
            const userRef = firebase.firestore().collection('users').doc(user.id)
            await userRef.update(updates)
            commit('setItem', { resource: 'users', item: user }, { root: true })
        },
    },
    mutations: {
        appendDiscussionToUser (state, { userId, discussionId }) {
            const user = findById(state.items, userId)
            user.discussions = user.discussions || []  // create the array if does not already exist
            user.discussions.push(discussionId)
            // console.log('discussionId gets appended into this user: ', user )
        },
        appendScoopToUser ( state, { userId, scoopId }) {
            const user = findById(state.items, userId)
            user.scoops = user.scoops || [] // if array not exists, create it
            user.scoops.push(scoopId)
            // console.log('scoopId gets appended into this user: ', user )
        },
    }
}