<template>
  <div v-if="user" class="profile-card">
    <router-link
      :to="{name: 'ProfileEdit'}"
      class="edit-button">
      <h6 class="edit">Edit</h6>
    </router-link>
      <h1>Profile</h1>
    <br>
    <p><b>Username: </b>{{ user.username}}</p>
    <p><b>Bio:</b> {{ user.bio }}</p>
    <!-- <div class="stats">
      <p> Stats: <span>{{ user.discussions.length }} discussion/s</span>
      <span>{{ user.scoopsCount }} scoop/s</span></p>
    </div> -->
    <p><b>Email: </b>{{ user.email }}</p>
    <p><b>Location: </b>{{ user.location }}</p>
    <!-- <h6>Your suggested words (discussions):</h6>
    <div v-for="discussion in user.discussions" :key="discussion.id" class="user-discussions">
     <p>{{ discussion.word }}</p> 
    </div> -->
    <!-- <p>Languages: {{ user.languages }}</p> language is an array so needs a v-for-->
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
      console.log('user discussions in user profile card: ', this.user.discussions.items)
      return this.user.discussions.items
    }, 
    scoops () {
      return this.user.scoops.items
    }
  }

}
</script>

<style scoped>

h1 {
  font-size: 2em;
}

p {
  font-size: 1.5em;
}

.profile-card {
    width: 60%;
    margin: auto;
    margin-top: 5%;
    padding: 2em;
    background-color: #DEF9F9;
    border-radius: 20px;
    align-content: center;
}


.edit-button {
    display:inline;
    float: right;
    margin: 0;
    padding: 0;
}

.edit {
    display:inline;
    align-content: right;
    margin: 0;
    background-color: #2c98ad;
    color: #d8eaee;
    font-size: 0.8em;
    width: 5%;
    padding: 1em;
    border-radius: 5px;
}
</style>