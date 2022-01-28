<template>
  <div class="discussion-edit">
    <div v-if="discussion" class="scoop-edit">
      <h1>Editing the discussion "{{ discussion.word }}"</h1>
      <DiscussionEditor :word="discussion.word"  :definition="discussion.definition" :question="discussion.question" 
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
    async save ({ word, definition, question }) {
      await this.$store.dispatch('discussions/updateDiscussion', {
        id: this.id,
        word,
        definition,
        question
      })
      this.$router.push({ name: 'DiscussionPage', params: { id: this.id } })
    },
    cancel () {
      this.$router.push({ name: 'DiscussionPage', params: { id: this.id } })
    }
  }
}
</script>
