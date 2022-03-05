<template>
  <div class="discussion-edit">
    <div v-if="discussion" class="editing">
      <h5>Editing the discussion "{{ discussion.word }}"</h5>
      <DiscussionEditor :word="discussion.word"  :definition="discussion.definition" :question="discussion.question" :category="discussion.category" 
          @save="save" @cancel="cancel"/>
      </div>
  </div>
</template>

<script>
import DiscussionEditor from '@/components/DiscussionEditor'
import { findById } from '@/helpers'

export default {
  components: { DiscussionEditor },
  props: {
    id: { 
      type: String, 
      required: true 
    }
  },
  async created () {
    // fetch the discussion
    await this.$store.dispatch('discussions/fetchDiscussion', { id: this.id })
    this.$emit('ready')
  },
  computed: {
    discussions () {
      return this.$store.state.discussions.items
    },
    discussion () {
      return findById(this.discussions, this.id)
    }
  },
  methods: {
    async save ({ word, definition, question, category }) {
      await this.$store.dispatch('discussions/updateDiscussion', {
        id: this.id,
        word,
        definition,
        question,
        category
      })
      this.$router.push({ name: 'DiscussionPage', params: { id: this.id } })
    },
    cancel () {
      this.$router.push({ name: 'DiscussionPage', params: { id: this.id } })
    }
  }
}
</script>

<style scoped>

.editing {
  width: 100%;
  height: 100vh;
}

h5 {
  font-size: 1em;
  color:aquamarine;
  margin: 0;
  padding: 0;
  margin-left: 30%;
  margin-top: 2%;
}
  
</style>
