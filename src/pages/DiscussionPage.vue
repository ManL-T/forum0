<template>
  <div class="discussion-page">
    <MenuLeft/>
    <div class="container">
      <header class="title">
        <h1>{{ discussion.word }}</h1>
      </header>
      <div v-if="discussion" class= "discussion-card">
        <DiscussionCard :discussion="discussion" :discussionAuthor="discussionAuthor"/>
      </div>
      <div v-else class="no-discussions">Error, this discussion does not exist anymore</div>
      <div class="scoops-count">
        <span>{{ pertinentScoops?.length || '0'}}</span>
         {{ pertinentScoops?.length === 1 ? 'scoop' : 'scoops'}}
      </div>
      <div v-if="pertinentScoops" class="the-scoops">
        <div v-for="scoop in pertinentScoops" :key="scoop.id" class="scoops-list">
          <ScoopCard :scoop="scoop" :scoopsAuthors="scoopsAuthors"/>
        </div>
      </div>
      <div v-if="pertinentScoops.length == 0" class="no-scoops">
        <h3 style="text-align: center">No Scoops yet!</h3>
        <h5 style="text-align: center">Can you tell us something about the history or origins of this word?</h5>
      </div>   
      <button class="add-scoop">
        <router-link :to="{name: 'ScoopNew', params: {id: this.id}}">
        <h4>Add your Scoop</h4>  
        </router-link>
      </button>
    </div>
    <MenuRight/>
</div>
</template>

<script>
import DiscussionCard from '@/components/DiscussionCard'
import ScoopCard from '@/components/ScoopCard'
import MenuLeft from '@/components/MenuLeft'
import MenuRight from '@/components/MenuRight'
import { findById } from '@/helpers'
// import { mapActions } from 'vuex'
export default {
  components: { DiscussionCard, ScoopCard, MenuLeft, MenuRight },
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

h1 {
  font-size:3em;
  color: #58f0cd;
  margin: 0;
  padding: 0;
  padding-top: 0.5em;
  padding-bottom: 0.3em;
}

h4 {
  font-size: 1em;
  font-weight: bold;
  color: #d9eef2;
}

h3 {
  color: #0c5c4a
}

h5 {
  color: #0c5c4a;
  font-size: 1em;
}

.discussion-page {
  display: grid;
  grid-template-columns: 0.5fr 5fr 0.5fr;
  width: 100%;
}

.container {
  width: 97%;
  margin: 5px;
  padding: 15px;
}

header {
  margin: none;
  padding: none;
  border: none;
  text-align: center;
}

.discussion-card {
  background-color: #7dbfcc;
  color: #122631;
  margin: none;
  padding: 20px;
  /* padding: 0.5em; */
  border-radius: 8px 8px 0px 0px;
}

.scoops-count {
  color: rgb(167, 195, 197);
  margin-top: 10px;
}

.the-scoops {
  margin: 0;
  padding: 0;
}

.scoops-list {
  background-color: #DEF9F9;
  margin: 0;
  margin-top: 5px;
  padding: 20px;
  /* border-radius: 1em; */
}

.no-scoops {
  background-color: #DEF9F9;
  margin: 0;
  padding: 0;
  margin-top: 5px;
  padding: 20px;
}

.add-scoop {
  background-color: #0c5c4a;
  color: #d9eef2;
  width: 100%;
  border: none;
  margin: 0;
  padding: 0;
}
</style>