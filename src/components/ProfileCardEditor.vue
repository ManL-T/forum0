<template>
  <div v-if="activeUser" class="profile-card">
    <form @submit.prevent="save">
      <div class="form-group">
        <label for="user_name">Username:</label><br>
        <input
          v-model="activeUser.username"
          type="text"
          placeholder="Username"
          class="username"
        />
        <br>
        <label for="user_bio">Bio:</label><br>
        <textarea
          v-model="activeUser.bio"
          class="form-input"
          rows="5"
          id="user_bio"
          placeholder="Write a few words about yourself."
        ></textarea>
        <br>
        <label class="form-label" for="user_location">Location:</label>
        <input
          v-model="activeUser.location"
          autocomplete="off"
          class="form-input"
          id="user_location"
        />
      </div>
      <br>

      <div class="actions">
        <button type="submit" class="save">Save</button>
        <button class="cancel" @click="cancel">Cancel</button>
      </div>
    </form>
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
  data () {
    return {
      activeUser: { ...this.user } // clone of user by using spread operator
    }
  },
  methods: {
    save () {
      this.$store.dispatch('updateUser', { ...this.activeUser })
      this.$router.push({ name: 'Profile' })    
    },
    cancel () {
      this.$router.push({ name: 'Profile' })
    }
  }
}
</script>

<style scoped>

.profile-card {
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
}
form {
    width: 70%;
    margin: auto;
    margin-top: 2%;
    padding: 2em;
    background-color: #DEF9F9;
    border-radius: 20px;
    align-content: center;
}

.form-group {
  margin-left: 20%;
  padding: auto;
  align-content: center;
  align-items: center;
}

label {
  font-size: 1em;
  color: #064637;
  margin-top: 0.5em;
}

input {
  font-size: 1em;
  width: 80%;
  border: none;
  border-radius: 5px;
  background-color: #9bc2ca;
  color: #031e27;
}

textarea {
  font-size: 1em;
  width: 80%;
  border: none;
  border-radius: 5px;
  background-color: #9bc2ca;
  color: #031e27;
}

.save {
  font-size: 1em;
  color: #fcfeff;
  width: 65%;
  border: none;
  background-color: #0c6953;
  border-radius: 10px;
  padding: 1em;
  margin-bottom: 10px;
  margin-left: 20%;
  font-weight: bold;
}

.cancel {
  font-size: 1em;
  color: #fcfeff;
  width: 65%;
  border: none;
  background-color: #8d7a0e;
  border-radius: 10px;
  padding: 1em;
  margin-left: 20%;
  font-weight: bold;
}


</style>