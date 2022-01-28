<template>
<div class="discussion-editor">
    <h1>Discussion Editor</h1>
  <form @submit.prevent="save">
    <label for="word">Add a new word:</label><br>
    <input type="text" v-model="form.word">
    <br><br>
    <label for="definitions">Add any pertinent definitions:</label><br>
    <textarea type="text" v-model="form.definition"/><br>
    <label for="questions">A pertinent question:</label><br>
    <textarea type="text" v-model="form.question"/><br>
    <button @click.prevent="$emit('cancel')" class="cancel">Cancel</button>
    <button class="save" type="submit">Save</button>
    </form>
</div>
</template>

<script>
export default {
  props: {
    word: { type: String, default: '' },
    definition: { type: String, default: '' },
    question: { type: String, default: '' }
    },
  data () {
    return {
      form: {
        word: this.word,
        definition: this.definition,
        question: this.question
      }
    }
  },
  methods: {
    save () {
      this.$emit('save', { ...this.form })
    }
  }
}
</script>