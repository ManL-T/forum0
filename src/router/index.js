import { createRouter, createWebHistory } from 'vue-router'
import { findById } from '@/helpers'
import store from '@/store'
import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import NotFound from '@/pages/NotFound'
import DiscussionPage from '@/pages/DiscussionPage.vue'
import DiscussionNew from '@/pages/DiscussionNew.vue'
import DiscussionEdit from '@/pages/DiscussionEdit.vue'
import Register from '@/pages/Register.vue'
import SignIn from '@/pages/SignIn.vue'
import ScoopNew from '@/pages/ScoopNew.vue'
import ScoopEdit from '@/pages/ScoopEdit.vue'
import Profile from '@/pages/Profile'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/discussion-page/:id',
    name: 'DiscussionPage',
    component: DiscussionPage,
    props: true,
    async beforeEnter (to, from, next) {
      await store.dispatch('discussions/fetchDiscussion', { id: to.params.id })
      // check if thread exists
      const discussionExists = findById(store.state.discussions.items, to.params.id)
      // if exists continue
      if (discussionExists) {
        return next()
      } else {
        console.log('discussion does NOT EXIST')
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          // preserve existing query and hash
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/discussion-new',
    name: 'DiscussionNew',
    component: DiscussionNew,
    meta: { requiresAuth: true }

  },
  {
    path: '/discussion-edit/:id',
    name: 'DiscussionEdit',
    component: DiscussionEdit,
    props: true
  },
  {
    path: '/scoop-new/:id',
    name: 'ScoopNew',
    component: ScoopNew,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/scoop-edit/:id',
    name: 'ScoopEdit',
    component: ScoopEdit,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { requiresGuest: true }
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
    meta: { toTop: true, smoothScroll: true, requiresAuth: true}
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: { edit: true },
    meta: { requiresAuth: true}
  },
  {
    path: '/logout',
    name: 'SignOut',
    async beforeEnter () {
      await store.dispatch('auth/signOut')
      return { name: 'Home' }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router =  createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})

router.beforeEach( async (to, from) => {
  await store.dispatch('auth/initAuthentication')
  console.log(`navigating to ${to.name} from ${from.name}`)
  console.log('authId is: ', store.state.auth.authId)
  store.dispatch('unsubscribeAllSnapshots')
  if (to.meta.requiresAuth && !store.state.auth.authId) {
    return { name: 'SignIn'}
  }
  if (to.meta.requiresGuest && store.state.auth.authId) {
    return { name: 'Home'}
  }
})

export default router