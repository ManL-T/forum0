<template>
  <div v-if="scoop" class="editing">
      <h5>Editing your scoop</h5>
    <ScoopEditor :text="scoop.text" :sources="scoop.sources" @save="save" @cancel="cancel"/>
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
    async save ({ text, sources }) {
      await this.$store.dispatch('scoops/updateScoop', {
        id: this.id,
        text,
        sources
      })
      this.$router.push({ name: 'DiscussionPage', params: { id: this.scoop.discussionId } })
    },
    cancel () {
      this.$router.push({ name: 'DiscussionPage', params: { id: this.scoop.discussionId } })
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