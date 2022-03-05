<template>
  <div v-if="blockedRoutes.includes($route.name) == false">
    <TheNavbar class="navbar"/>
    <div class="container">
      <TheLeftMenu class="menu-left" @categoryChange="clickedCategory = category"/>
      <router-view v-show="showPage" @ready="showPage = true" :key="$route.path"/>
      <AppSpinner v-show="!showPage"/>  
      <TheRightMenu class="menu-right" :allWords="allWords"/>
    </div>
  </div>
  <div v-else>
    <TheNavbar class="navbar"/>
    <router-view v-show="showPage" @ready="showPage = true" :key="$route.path"/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import TheLeftMenu from '@/components/TheLeftMenu'
import TheRightMenu from '@/components/TheRightMenu'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { TheNavbar, AppSpinner, TheLeftMenu, TheRightMenu },
  data () {
    return {
      showPage: true,
      clickedCategory: '',
      feedDiscussions: [],
      categoryWords: []
    }
  },
  methods: {
    ...mapActions('auth', ['fetchAuthUser'])
  },
  async created () {
    await this.$store.dispatch('discussions/fetchWords')
    this.fetchAuthUser()
    console.log('AuthUser from Home page after fetching: ', this.$store.state.auth.authId)
    const feeds = await this.$store.dispatch('feeds/fetchFeeds')
    let feedDiscussions =  []
    await feeds.map(feed => feedDiscussions.push(feed.discussion))
    console.log('feedDiscussions: ', feedDiscussions)
    let filteredWords = []
    feedDiscussions.map(discussion => {
      if(discussion.category === this.$store.state.feeds.currentCategory) {
        filteredWords.push(discussion.word)
      }})
    console.log('filteredWords from created hook: ', filteredWords)
    this.feedDiscussions = feedDiscussions
    this.categoryWords = filteredWords
    // console.log('categoryWords: ', categoryWords)
    this.$router.beforeEach(() => {
      this.showPage = false
    })
  },
  computed: {
    allWords () {
      console.log('categoryWords from all words: ', this.categoryWords)
      console.log('words from App.vue: ', this.$store.state.discussions.words )
      return this.$store.state.discussions.words
    },
    // filteredDiscussions () {
    //   return this.feedDiscussions.filter(discussion => discussion.category === this.currentCategory)
    // },
    filteredWords () {
      console.log('cclikedCategory from computed: ', this.clickedCategory)
      let filteredWords = []
      this.feedDiscussions.map(discussion => {
        if(discussion.category === this.clickedCategory) {
          filteredWords.push(discussion.word)
        }})
        console.log('filtered words inside computed: ', filteredWords)
      return filteredWords
    },
    blockedRoutes () {
      return ['Register', 'SignIn', 'About', 'DiscussionNew', 'ScoopNew', 'ScoopEdit', 'Profile', 'ProfileEdit' ]
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #001a20;
  margin: 0;
  padding: 0;
  width: 100%;
  /* border:rgb(18, 224, 145) solid; */
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
}

.navbar {
  width: 100%;
}

.container {
  margin: 0;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}

.center {
  width: 100%;
}

li {
  list-style: none;
}

a:link {
  text-decoration: none;
}


</style>
