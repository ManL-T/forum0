<template>
  <div class="home">
    <div v-if="feeds" class="feeds">
      <h4>Feeds / English / Words / {{ currentCategory }}</h4>
      <div v-if="filteredFeeds.length === 0" class="empty-category">
          <h4>No discussions for this category</h4>
        </div>
      <div class="discussions" v-for="feed in filteredFeeds.sort((a, b) => b.timestamp - a.timestamp)" :key="feed.id">
        <feed-card class="feed" :feed="feed"/>
      </div>
    </div>
  </div>
</template>

<script>
import FeedCard from '@/components/FeedCard'

export default {
  components: { FeedCard },
  computed: {
    currentCategory () {
      console.log('currentCategory from Home: ', this.$store.state.feeds.currentCategory)
      return this.$store.state.feeds.currentCategory
    },
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
    },
    filteredWords () {
      let wordsByCategory = []
      this.filteredFeeds.forEach(feed => {
        wordsByCategory.push(feed.discussion.word)
      })
      console.log('array of words by category: ', wordsByCategory)
      return wordsByCategory
    }
  },
  async created() {
    // console.log('created on Home')
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
    // console.log('scoopersIds, ', scoopersIds)
    let questionsIds = await feeds.map(feed => feed.discussion.userId)
    // console.log('questionsIds from homepage: ', questionsIds)
    let allUsersIds = scoopersIds.concat(questionsIds)
    // console.log('allUsersIds from homepage: ', allUsersIds)
    const users = await this.$store.dispatch('fetchUsers', { ids: allUsersIds })
    console.log('all users 1wayOrOther involved in feeds: ', users)
    await this.$store.dispatch('discussions/fetchWords')
    // this.fetchAuthUser()
    console.log('AuthUser from Home page after fetching: ', this.$store.state.auth.authId)
    this.$router.beforeEach(() => {
      this.showPage = false
    })
    this.$emit('ready')
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
  margin: 2px;
  padding: 2px;
  width: 100%;
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