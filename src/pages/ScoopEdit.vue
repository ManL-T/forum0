<template>
  <div v-if="scoop" class="scoop-edit">
      <h1>Editing your scoop</h1>
    <ScoopEditor :text="scoop.text" @save="save" @cancel="cancel"/>
  </div>
</template>

<script>
import ScoopEditor from '@/components/ScoopEditor'
import { findById } from '@/helpers'

export default {
  components: { ScoopEditor },
  props: {
    id : {
      required: true,
      type: String
    }
  },
  async created () {
    // fetch the discussion
    const scoop = await this.$store.dispatch('scoops/fetchScoop', { id: this.id })
    this.$emit('ready')
    console.log('scoop as fetched in ScoopEdit: ', scoop)
  },
  computed: {
    scoops () {
      console.log('the scoops: ', this.$store.state.scoops.items)
      return this.$store.state.scoops.items
    },
    scoop () {
      return findById(this.scoops, this.id)
    },
    discussionId () {
      return this.scoop.discussionId
    },
    discussion () {
      return findById(this.$store.state.discussions.items, this.discussionId)
    }
  },
  methods: {
    async save ({ text }) {
      await this.$store.dispatch('scoops/updateScoop', {
        id: this.id,
        text
      })
      this.$router.push({ name: 'DiscussionPage', params: { id: this.scoop.discussionId } })
    },
    cancel () {
      this.$router.push({ name: 'DiscussionPage', params: { id: this.scoop.discussionId } })
    }
  }
}
</script>

<style>

</style>