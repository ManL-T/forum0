<template>
  <div v-if="discussion" class="scoop-new">
    <h1>Add a new scoop for "{{ discussion.word }}"</h1>
      <form @submit.prevent="addScoop">
        <div class="form-group">
          <label for="scoop-text">Add the text for this scoop</label>
          <textarea name="scoop-text" type="text" v-model="text" rows="10"/>
          <br>
          <label for="scoop-source">Add your sources for reference</label>
          <textarea name="scoop-sources" type="text" v-model="sources" rows="5"/>
          <br>
        </div>
        <br>
        <button type="submit" class="add-scoop">Add Scoop</button>
        <button type="cancel" class="cancel">
            <router-link :to="{name: 'Home'}" class="cancel-link">
                Cancel </router-link></button>
      </form>
  </div>
</template>

<script>
import { findById } from '@/helpers'

export default {
  props: {
    id : {
      required: true,
      type: String
    }
  },
  async created () {
    // fetch the discussion
    await this.$store.dispatch('discussions/fetchDiscussion', { id: this.id })
    this.$emit('ready')  },
  data (){
      return {
        text: "",
        sources: ""
      }
    },
  methods: {
    addScoop () {
      const newScoop = {
        text: this.text,
        sources: this.sources,
        discussionId: this.id
      }
      this.$store.dispatch('scoops/createScoop', newScoop)
      this.text = ""
      this.$router.push('/')
    }
  },
  computed: {
    discussions () {
      return this.$store.state.discussions.items
    },
    discussion () {
      console.log('the discussions from scoopNew page: ',this.discussions)
      return findById(this.discussions, this.id)
    }
  }
}
</script>

<style scoped>

h1 {
  margin: auto;
  padding: auto;
  margin-left: 20%;
  margin-top: 10px;
  font-size: 1em;
  color: #9bc2ca;
}

.scoop-new {
  width: 100%;
  height: 100vh;
}

form {
    width: 70%;
    margin: auto;
    margin-top: 10px;
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

textarea {
  font-size: 1em;
  width: 80%;
  border: none;
  border-radius: 5px;
  background-color: #9bc2ca;
  color: #031e27;
}

.add-scoop {
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

.cancel-link {
    color: #fcfeff;
}



</style>