import { upsert } from '@/helpers'

export default {
    setItem (state, { resource, item }) {
        upsert(state[resource].items, item)
    },
    appendUnsubscribe (state, { unsubscribe }) {
        state.unsubscribes.push(unsubscribe)
    },
    clearAllUnsubscribes (state) {
        state.unsubscribes = []
    }
}