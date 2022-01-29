<template>
  <div class="discussion-page">
    <header>
      <div class="back-home">
        <router-link :to="{name: 'Home'}">
          <svg class="svg-icon" viewBox="0 0 20 20">
          <path fill="none" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path></svg>
        </router-link>
      </div>
      <div class="word-title">
        {{ discussion.word }}
      </div>
    </header>

    <div class="container">
      <div v-if="discussion" class= "discussion">
        <DiscussionCard :discussion="discussion"/>
      </div>
      <div v-else class="no-discussions">Error, this discussion does not exist anymore</div>
      <div v-if="pertinentScoops" class="the-scoops">
        <div v-for="scoop in pertinentScoops" :key="scoop.id" class="scoops-list">
          <ScoopCard :scoop="scoop"/>
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
    }
  }
  // methods: {
  //   ...mapActions('users', ['fetchUsers'])
  // }
}
</script>

<style scoped>

.discussion-page {
  width: 100%;
}

header {
  display: grid;
  grid-template-columns: 0.2fr 5.8fr;
}

.back-home {
  left: 0;
  margin: none;
  padding: none;
}

.word-title {
   left: 0;
   margin: none;
   padding: 0.5em;
 }

.svg-icon {
  width: 1.5em;
  height: 1.5em;
  padding: none;
  margin: none;
  margin-left: 0.2em;
  margin-top: 0.3em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #13bbe0;
}

.svg-icon circle {
  stroke: #13bbe0;
  stroke-width: 1;
}

.container {
  width: 100%;
}

.discussion {
  background-color: rgb(20, 115, 128);
  color: white;
  margin: 0.2em;
  padding: 1em;
  border-radius: 1em;
}

.scoops-list {
  background-color: rgb(123, 226, 240);
  margin: 0.2em;
  padding: 1em;
  border-radius: 1em;
}
</style>