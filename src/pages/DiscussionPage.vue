<template>
  <div class="discussion-page">
    <header>
      <!-- <div class="word-title"> -->
        <h1>{{ discussion.word }}</h1>
      <!-- </div> -->
    </header>

    <div class="container">
      <div v-if="discussion" class= "discussion">
        <DiscussionCard :discussion="discussion" :discussionAuthor="discussionAuthor"/>
      </div>
      <div v-else class="no-discussions">Error, this discussion does not exist anymore</div>
      <div v-if="pertinentScoops" class="the-scoops">
        <div v-for="scoop in pertinentScoops" :key="scoop.id" class="scoops-list">
          <ScoopCard :scoop="scoop" :scoopsAuthors="scoopsAuthors"/>
        </div>
      </div>
      <div v-if="pertinentScoops.length == 0" class="no-scoops">
        <h3>No Scoops yet!</h3>
        <h4>Do you have information about this word's origins to share?</h4>
      </div>   
      <br>
      <button>
        <router-link :to="{name: 'ScoopNew', params: {id: this.id}}">
        <h4> Add a Scoop</h4>  
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>
import DiscussionCard from '@/components/DiscussionCard'
import ScoopCard from '@/components/ScoopCard'
import { findById } from '@/helpers'
// import { mapActions } from 'vuex'
export default {
  components: { DiscussionCard, ScoopCard },
  props: {
    id : {
      required: true,
      type: String
    }
  },
  beforeCreate () {
    console.log('receiving this id as prop: ', this.id)
  },
  async created () {
    // fetch the discussion
    const discussion = await this.$store.dispatch('discussions/fetchDiscussion', { id: this.id })
    console.log('discussion as fetched in DiscussionPage: ', discussion)
    this.$emit('ready')
    // fetch scoops
    const scoops = await this.$store.dispatch('scoops/fetchScoops', { ids: discussion.scoops })
    // PENDING -- this raises exception when discussion has no scoops

    // fetch discussion author
    console.log('fetching user of id: ', this.id)
    this.$store.dispatch('fetchUser', { discussionId: this.id })

    // fetch users associated with the scoops
    let usersIds = scoops.map(scoop => scoop.userId)
    // const discussionUserId = discussion.usersIds
    // usersIds.push(discussionUserId) UNNECESSARY SINCE WE DO GET DISCUSSION AUTHOR ABOVE
    this.$store.dispatch('fetchUsers', { ids: usersIds })
  },
  computed: {
    discussions () {
      // this is probably stupid because we fetch only one discussion
      // Is this two computed process just a way to get the discussion out of the array????
      return this.$store.state.discussions.items
    },
    discussion () {
      console.log('discussions.items: ', this.discussions)
      return findById(this.discussions, this.id)
    },
    allScoops () {
      console.log('the scoops.items: ', this.$store.state.scoops)
      return this.$store.state.scoops.items
    },
    pertinentScoops () {
      return this.allScoops.filter(scoop => scoop.discussionId === this.id)
    },
    discussionAuthor () {
      return findById(this.$store.state.users.items, this.discussion.userId)
    },
    scoopsAuthors () {
      return this.$store.state.users.items
    }
  }
  // methods: {
  //   ...mapActions('users', ['fetchUsers'])
  // }
}
</script>

<style scoped>

.discussion-page {
  padding-right: 15%;
  padding-left: 15%;
}

header {
  margin: none;
  padding: none;
  border: none;
}

.word-title {
  margin: none;
  padding: none;
  border: none;
 }

h1 {
  font-size:1.5em;
  color: #58f0cd;
  margin: none;
  padding: none;
  border: none;
  padding-left: 0.5em;
}

.container {
  width: 100%;
  margin: none;
  padding: none;
  border: none;
}

.discussion {
  background-color: #7dbfcc;
  color: #042820;
  margin: none;
  padding: 0.5em;
  border-radius: 8px 8px 0px 0px;
}

.scoops-list {
  background-color: #DEF9F9;
  margin: none;
  margin-top: 5px;
  padding: 25px;
  /* border-radius: 1em; */
}
</style>