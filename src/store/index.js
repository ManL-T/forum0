import { createStore } from 'vuex'
import getters from '@/store/getters'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
import discussions from './modules/discussions'
import scoops from './modules/scoops'
import feeds from './modules/feeds'
import users from './modules/users'
import auth from './modules/auth'


export default createStore({
    modules: { discussions, scoops, feeds, users, auth },
    state: {         
      unsubscribes: []
    },
    getters,
    actions,
    mutations,
})
