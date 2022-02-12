<template>
  <header class="header" id="header">
    <nav class="navbar">
      <div class="container">
        <router-link :to="{name: 'Home'}" class="logo">
        <img ref="src/assets/LOGO.png">2ingo
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
            <router-link class="about" :to="{name:'About'}">About</router-link>
            <br><br>
            <router-link class="profile" :to="{name:'Profile'}">Profile</router-link>
            <br><br>
            <router-link class="add-discussion" :to="{name:'DiscussionNew'}">Add a Word</router-link>
            <br><br>
            <router-link class="sign-out" :to="{name:'Home'}"><a @click="$store.dispatch('auth/signOut')">Sign out</a></router-link>
          </div>
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
  color: #f4d00a;
}

span {
  padding: 0.5em;
}

.navbar {
  align-items: center;
  width: 100%;
  height:40px;
  background-color: #010c0f;
  color: #f4d00a;
  font-weight: bold;
}

.container {
  width: 100%;
}

.logo {
  float: left;
  padding: 0;
  margin: 0;
  margin-top: 5px;
  padding-left:1em;
}

.user-access {
  float: right;
  margin: 0;
  padding: 0;
  margin-top: 5px;
  padding-right: 1em;
}

.dropdown {
  float: right;
  padding: 0;
  margin: 0;
  margin-top: 5px;
  margin-right: 50px;
  /* padding-left: 1em; */
}

.dropdown:hover .dropdown-content {
  display: block;
  font-weight:normal;
}

.dropdown-content {
  display: none;
  position: fixed;
  width: 160px;
  background-color: #010c0f;
  box-shadow: 0px 8px 16px 0px rgba(71, 60, 60, 0.2);
  padding: 0.3em;
  text-align: left;
  z-index: 1;
}
</style>