<template>
  <header class="header" id="header">
    <nav class="navbar">
      <router-link :to="{name: 'Home'}" class="logo">
        Home
      </router-link>
      <div v-if="!authUser" class="user-access">
        <span class="log-in"><router-link :to="{name:'SignIn'}">Log in</router-link></span>
        <span>|</span>
        <span class="sign-in"><router-link :to="{name:'Register'}">Sign up</router-link></span>
      </div>
      <div v-if="authUser" class="dropdown">
          <span>{{authUser.username}}</span>
          <div class="dropdown-content">
            <br>
            <router-link class="profile" :to="{name:'Profile'}">Profile</router-link>
            <br><br>
            <router-link class="add-discussion" :to="{name:'DiscussionNew'}">Add a discussion</router-link>
            <br><br>
            <router-link class="sign-out" :to="{name:'Home'}"><a @click="$store.dispatch('auth/signOut')">Sign out</a></router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['authUser'])
  },
  mounted() {
    console.log('mounted on navbar. authUser: ', this.authUser)
  },
  unmounted() {
    console.log('unmounted on navbar. authUser: ', this.authUser)
  }
}
</script>

<style scoped>

a {
  color: white;
}

span {
  padding: 0.5em;
}

.navbar {
  /* display: flex; */
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  height:60px;
  background-color: #13bbe0;
  color: white;
  font-weight: bold;
}

.logo {
  float: left;
  padding: 0.5em;
  padding-left:1em;
}

.user-access {
  float: right;
  padding: 0.5em;
  padding-right: 1em;
}

.dropdown {
  float: right;
  padding: 0.5em;
  padding-right: 1em;
}

.dropdown:hover .dropdown-content {
  display: block;
  font-weight:normal;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #13bbe0;
  box-shadow: 0px 8px 16px 0px rgba(71, 60, 60, 0.2);
  padding: 0.5em;
  text-align: left;
  z-index: 1;
}
</style>