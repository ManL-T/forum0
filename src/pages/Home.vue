<template>
  <div class="home">
    <div class="menu-left">
      <MenuLeft :currentCategory="currentCategory" @filterFeeds="currentCategory = $event"/>
    </div>
    <div v-if="feeds" class="feeds">
      <h4>Feeds / English / Words / {{ currentCategory }}</h4>
      <div v-if="filteredFeeds.length === 0" class="empty-category">
          <h4>No discussions for this category</h4>
        </div>
      <div class="discussions" v-for="feed in filteredFeeds.sort((a, b) => b.timestamp - a.timestamp)" :key="feed.id">
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
  data() {
    return {
      currentCategory: "all"
    }
  },
  computed: {
    feeds () {
      return this.$store.state.feeds.items
    },
    filteredFeeds() {
      if (this.currentCategory === 'all') {
        return this.feeds
      }
      if (this.currentCategory === 'generic') {
        return this.feeds.filter(feed => feed.discussion.category === 'generic')
      }
      if (this.currentCategory === 'academic') {
        return this.feeds.filter(feed => feed.discussion.category === 'academic')
      }
      if (this.currentCategory === 'location') {
        return this.feeds.filter(feed => feed.discussion.category === 'location')
      }
      if (this.currentCategory === 'person') {
        return this.feeds.filter(feed => feed.discussion.category === 'person')
      } else {
        return this.feeds
      }
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
  margin: 0.5em;
  padding: 0.3em;
  padding-left: 10px;
  background-color: #1E4147;
  color: #58f0cd;
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