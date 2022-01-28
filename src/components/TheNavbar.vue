<template>
  <header class="header" id="header">
    <nav class="navbar">
      <router-link :to="{name: 'Home'}" class="logo">
        Home
      </router-link>
      <div v-if="authUser" class="dropdown">
          <span>{{authUser.username}}</span>
          <div class="dropdown-content">
            <router-link class="profile" :to="{name:'Profile'}">Profile</router-link>
        <p>-----</p>
            <router-link class="sign-out" :to="{name:'Home'}"><a @click="$store.dispatch('auth/signOut')">Sign out</a></router-link>
          </div>
      </div>
      <div v-if="!authUser" class="user-access">
        <span class="log-in"><router-link :to="{name:'SignIn'}">Log in</router-link></span>
        <span>|</span>
        <span class="sign-in"><router-link :to="{name:'Register'}">Sign up</router-link></span>
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

p {
  color: white;
}

.user-access {
  padding: 1em;
  float: right;
  color: white;
}

span {
  padding: 1em;
  color: white;
}

.dropdown {
  /* position: relative; */
  /* display: inline-block; */
  color: white;
  float: right;
  min-width: 7em;
  margin-right: 0;
  margin-right: 0;
  padding: 1em;
  padding-right: 0em;
  padding-left: 5em;
  font-weight: bold;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #13bbe0;
  color: white;
  /* min-width: 160px; */
  box-shadow: 0px 8px 16px 0px rgba(71, 60, 60, 0.2);
  padding: 1em;
  z-index: 1;
}

.profile {
  padding-bottom: 20px;
  margin-bottom: 10em;
  color: white;
  /* border:rgb(245, 7, 7) solid; */
}

.sign-out {
  padding-top: 3em;
  margin-bottom: 2em;
  color: white;
  /* border:rgb(245, 7, 7) solid; */
}

.header {
  width: 100%;
  height:60px;
}

.navbar {
  background-color: #13bbe0;
  color: white;
  height:60px;
  margin-top: 0;
  /* border-radius: 10px; */
}

.logo {
  float: left;
  text-decoration: none;
  font-weight: bold;
  margin: 10px;
  margin-left: 0.5em;
  padding: 5px;
  color: #e6e4db;
}

.profile-icon {
  float: right;
  margin: 10px;
  margin-right: 1em;
  padding: 5px;
  color: #f7f6f1;
  font-weight: bold;
}
</style>