<template>
  <div v-if="user" class="profile-card">
    <br>
    <p>Username: {{ user.username}}</p>
    <p>Bio: {{ user.bio }}</p>
    <div class="stats">
      <p> Stats: <span>{{ user.discussions.length }} discussion/s</span>
      <span>{{ user.scoopsCount }} scoop/s</span></p>
    </div>
    <p>Email: {{ user.email }}</p>
    <p>Location: {{ user.location }}</p>
    <!-- <p>Languages: {{ user.languages }}</p> language is an array so needs a v-for-->
    <router-link
      :to="{name: 'ProfileEdit'}"
      class="edit-button">
        Edit Profile
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    discussions () {
      return this.user.discussions.items
    }, 
    scoops () {
      return this.user.scoops.items
    }
  }

}
</script>

<style scoped>

.profile-card {
  background-color: inherit;
  text-align: left;
  margin: auto;
  margin-left: 8em;
}

p {
  font-size: 0.5em;
}

span {
  padding: 10px;
}

.edit-button {
  padding: 0.5em;
  background-color:#3b9c0a;
  color: #ffffff;
  font-size: 0.5em;
  margin: 50px; 
  margin-top: 100px;
  border: none;
  border-radius: 5px;
}

</style>