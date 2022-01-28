<template>
  <div v-if="activeUser" class="profile-card">
    <form @submit.prevent="save">
      <div class="form-group">
        <p>
        <label for="user_name">Username:</label>
        <input
          v-model="activeUser.username"
          type="text"
          placeholder="Username"
          class="username"
        /></p>
      </div>

      <div class="form-group">
        <label for="user_bio">Bio:</label>
        <textarea
          v-model="activeUser.bio"
          class="form-input"
          rows="5"
          id="user_bio"
          placeholder="Write a few words about yourself."
        ></textarea>
      </div>

      <div class="form-group">
        <p>
        <label class="form-label" for="user_location">Location:</label>
        <input
          v-model="activeUser.location"
          autocomplete="off"
          class="form-input"
          id="user_location"
        />
        </p>
      </div>

      <div class="actions">
        <button class="cancel" @click="cancel">Cancel</button>
        <button type="submit" class="submit">Save</button>
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
  background-color: inherit;
  text-align: left;
  margin: auto;
  margin-left: 8em;
  font-size: 0.5em;
  height: 100%;
}

p {
  padding: 2px;
}

input {
  padding: 10px;
  margin: 10px;
}

textarea {
  width: 50%;
  margin-left: 20px;
  resize: none;
  vertical-align: top;
}

.submit {
  padding: 0.5em 2em 0.5em 2em;
  background-color:#3b9c0a;
  color: #ffffff;
  font-size: 1.5em;
  margin: 50px; 
  margin-top: 100px;
  border: none;
  border-radius: 5px;
}

.cancel {
  padding: 0.5em 2em 0.5em 2em;
  background-color:#b30f0f;
  color: #ffffff;
  font-size: 1.5em;
  margin: 10px; 
  border: none;
  border-radius: 5px;
}

</style>