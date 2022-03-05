<template>
  <div class="new-discussion">
    <form @submit.prevent="saveDiscussion">
        <div class="form-group">
        <label for="word">Add a new word</label><br>
      <input type="text" v-model="word">
        <br><br>
        <label for="definition">Add any pertinent definitions</label><br>
      <textarea type="text" v-model="definition"/><br>
        <label for="question">Add a pertinent question</label><br>
      <input type="text" v-model="question">
        <br><br>
        <label for="category">Category:</label>
        <br>
      <select v-model="category" placeholder="select one please" class="category"> 
        <option value="person">Person' name</option>
        <option value="location">Location/place name</option>
        <option value="academic">Academic, technical name</option>
        <option value="generic">Generic (does not specifically apply to any of the above)</option>
      </select>
      </div>
   <br><br>
      <button type="submit" class="add-word">Add Word</button>
      <button type="cancel" class="cancel">
            <router-link :to="{name: 'Home'}" class="cancel-link">
                Cancel </router-link></button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      word: "",
      definition: "",
      question: "",
      category: '' 
    }
  },
  created () {
    this.$emit('ready')
  },
  methods: {
    saveDiscussion () {
      const discussion = {
        word: this.word,
        definition: this.definition,
        question: this.question,
        category: this.category,
        type: "word",
        language: "english"
      }
      this.$store.dispatch('discussions/createDiscussion', { word: discussion.word, definition: discussion.definition, question: discussion.question, category: discussion.category, type: discussion.type, language: discussion.language} )
      this.word = ""
      this.definition = ""
      this.question = ""
      this.category = ""
      this.$router.push('/')
    },
    cancel () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

.new-discussion {
  width: 100%;
  height: 100vh;
}

form {
    width: 70%;
    margin: auto;
    margin-top: 5%;
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
  font-size: 2em;
  width: 80%;
  border: none;
  border-radius: 5px;
  background-color: #9bc2ca;
  color: #031e27;
}

textarea {
  font-size: 2em;
  width: 80%;
  border: none;
  border-radius: 5px;
  background-color: #9bc2ca;
  color: #031e27;
}

.category {
  font-size: 1em;
  width: 50%;
}

.add-word {
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