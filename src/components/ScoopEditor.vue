<template>
  <div class="scoop-editor">
    <form @submit.prevent="save">
        <label for="scoop-text">Scoop's text:</label><br>
        <textarea type="text" v-model="form.text"/><br>
        <button @click.prevent="$emit('cancel')" class="cancel">Cancel</button>
        <button class="save" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
    props: {
        text: { type: String, default: '' }
    },
    data () {
        return {
            form: {
                text: this.text
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
