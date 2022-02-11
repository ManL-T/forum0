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
      showPage: true
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
  margin: 0;
  padding: 0;
  width: 100%;
  /* border:rgb(18, 224, 145) solid; */
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
    /* border:rgb(224, 18, 224) solid; */
}

.container {
  margin: 0;
  padding: 0;
  width: 100%;
}

li {
  list-style: none;
}

a:link {
  text-decoration: none;
}


</style>
