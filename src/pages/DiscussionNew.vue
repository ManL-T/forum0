<template>
  <div class="new-discussion">
    <form @submit.prevent="saveDiscussion">
      <br>
      <label for="word">Add a new word:</label><br>
      <input type="text" v-model="word">
      <br><br>
      <label for="definition">Add any pertinent definitions:</label><br>
      <textarea type="text" v-model="definition"/><br>
      <label for="question">Add a pertinent question:</label><br>
      <input type="text" v-model="question"><br>
      <button>Add Word</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      word: "",
      definition: "",
      question: ""
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
        question: this.question
      }
      this.$store.dispatch('discussions/createDiscussion', { word: discussion.word, definition: discussion.definition, question: discussion.question} )
      this.word = ""
      this.definition = ""
      this.question = ""
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>