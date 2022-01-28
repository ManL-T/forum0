<template>
  <div class="home">
    <div class="add-button"><router-link :to="{name: 'DiscussionNew'}">
        <h1>+</h1> 
    </router-link></div>
    <div v-if="feeds" class="feeds">
      <div class="discussions" v-for="feed in feeds.sort((a, b) => b.timestamp - a.timestamp)" :key="feed.id">
        <feed-card :feed="feed"/>
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
  async created () {
    await this.$store.dispatch('feeds/fetchFeeds')
    this.$emit('ready')
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 5.5fr;
}

h1 {
   /* background-color: aquamarine; */
   color: #13bbe0;
   padding: 0.3em;
   margin-left: 0.2em;
   margin-top: 0.3em;
   border-radius: 10px;
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