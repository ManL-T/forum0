<template>
  <div v-if="discussion" class="scoop-new">
    <h1>Add a new scoop for {{ discussion.word }}</h1>
      <form @submit.prevent="addScoop">
        <label for="scoop-text">Add text for this scoop</label><br>
        <textarea name="scoop-text" type="text" v-model="text" rows="20" cols="60"/><br>
        <button>Add your scoop</button>
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
        text: ""
      }
    },
  methods: {
    addScoop () {
      const newScoop = {
        text: this.text,
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