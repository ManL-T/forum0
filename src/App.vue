<template>
  <the-navbar/>
  <div class="container">
    <router-view v-show="showPage" @ready="showPage = true" :key="$route.path"/>
    <AppSpinner v-show="!showPage"/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { TheNavbar, AppSpinner },
  data () {
    return {
      showPage: false
    }
  },
  methods: {
    ...mapActions('auth', ['fetchAuthUser'])
  },
  created () {
    this.fetchAuthUser()
    console.log('AuthUser from Home page after fetching: ', this.$store.state.auth.authId)
    this.$router.beforeEach(() => {
      this.showPage = false
    })
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #001a20;
  margin: none;
}

body {
  margin: 0em;
}

li {
  list-style: none;
}

a:link {
  text-decoration: none;
}


</style>
