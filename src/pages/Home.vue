<template>
  <div class="home">
    <div v-if="feeds" class="feeds">
      <div class="discussions" v-for="feed in feeds.sort((a, b) => b.timestamp - a.timestamp)" :key="feed.id">
        <feed-card :feed="feed" class="feed"/>
      </div>
    </div>
  </div>
</template>

<script>
import FeedCard from '@/components/FeedCard'
export default {
  components: { FeedCard },
  computed: {
    feeds () {
      return this.$store.state.feeds.items
    }
  },
  beforeCreate() {
    console.log('beforeCreate from Home')
  },
  async created () {
    await this.$store.dispatch('feeds/fetchFeeds')
    this.$emit('ready')
  },
  beforeMount() {
    console.log('beforeMount from Home')
  },
  mounted() {
    console.log('mounted from Home')
  },
  unmounted() {
    console.log('unmounted from Home')
  }
}
</script>

<style scoped>

.home {
  margin: none;
  padding: none;
}

.feeds {
  margin: 0;
  border: 0;
  padding: 0;
}

.feed {
  background-color: rgb(123, 226, 240);
  margin: 0.5em;
  padding: 1em;
  border-radius: 1em;
}

</style>