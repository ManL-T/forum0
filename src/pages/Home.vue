<template>
  <div class="home">
    <div class="menu-left">
      <MenuLeft />
    </div>
    <div v-if="feeds" class="feeds">
      <div class="discussions" v-for="feed in feeds.sort((a, b) => b.timestamp - a.timestamp)" :key="feed.id">
        <feed-card class="feed" :feed="feed"/>
      </div>
    </div>
    <div class="menu-right">
     <MenuRight/>
    </div>
  </div>
</template>

<script>
import FeedCard from '@/components/FeedCard'
import MenuLeft from '@/components/MenuLeft'
import MenuRight from '@/components/MenuRight'

export default {
  components: { FeedCard, MenuLeft, MenuRight },
  computed: {
    feeds () {
      return this.$store.state.feeds.items
    }
  },
  async created() {
    console.log('created on Home')
    // fetch feeds
    const feeds = await this.$store.dispatch('feeds/fetchFeeds')
    console.log('feeds from homepage: ', feeds)
    // fetch relevant users only
    let scoopersIds = []
    await feeds.map(feed => {
      if(feed.latestScoop) {
        scoopersIds.push(feed.latestScoop.userId)
      } 
    })
    console.log('scoopersIds, ', scoopersIds)
    let questionsIds = await feeds.map(feed => feed.discussion.userId)
    console.log('questionsIds from homepage: ', questionsIds)
    let allUsersIds = scoopersIds.concat(questionsIds)
    console.log('allUsersIds from homepage: ', allUsersIds)
    const users = await this.$store.dispatch('fetchUsers', { ids: allUsersIds })
    console.log('all users 1wayOrOther involved in feeds: ', users)
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

h4 {
  margin: 0em;
  padding: 0em;
  background-color: #1E4147;
  /* border:burlywood solid; */
  font-size: 1em;
}

.home {
  margin: 0;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  /* border:rgb(222, 135, 142) solid; */
}

.menu-left {
  margin: 0;
  padding: 0;
  /* border:rgb(135, 209, 222) solid; */
}



.menu-right {
  margin: 0;
  padding: 0;
}


.feeds, .discussions {
  margin: 0;
  border: 0;
  padding: 0;
}

</style>