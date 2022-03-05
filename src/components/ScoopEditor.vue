<template>
  <div class="scoop-editor">
    <form @submit.prevent="save">
        <div class="form-group">
            <label for="scoop-text">Scoop's text:</label><br>
            <textarea name="scoop-text" class="scoop-text" type="text" v-model="form.text" rows="10"/><br>
            <label for="scoop-source">Scoop's source/s:</label><br>
            <textarea name="scoop-source" class="scoop-source" type="text" v-model="form.sources" rows="5"/>
        </div>
    <br>
        <button class="save" type="submit">Save</button>
        <button @click.prevent="$emit('cancel')" class="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
    props: {
        text: { type: String, default: '' },
        sources: { type: String, default: '' }
    },
    data () {
        return {
            form: {
                text: this.text,
                sources: this.sources
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

<style scoped>



.discussion-editor {
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

textarea {
  font-size: 1em;
  width: 80%;
  border: none;
  border-radius: 5px;
  background-color: #9bc2ca;
  color: #031e27;
  white-space: pre-line;
  white-space: pre-wrap;
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

.cancel-link {
    color: #fcfeff;
}

</style>
