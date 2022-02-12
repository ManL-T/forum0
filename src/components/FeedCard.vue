<template>
   <div v-if="feed" class="feed">
        <router-link :to="{name: 'DiscussionPage', params: {id: feed.discussion.id}}">
       <header>
        <h2>{{ feed.discussion.word}}</h2> 
       </header>
        <div v-if="feed.latestScoop" class="has-scoop">
            <p>{{ feed.latestScoop.text}}</p> 
            <!-- <h4 v-if="scoopAuthor">By: {{ scoopAuthor.username }}</h4> -->
        </div>
        <div v-else class="no-scoops">
            <!-- <h3 v-if="discussionAuthor">By: {{ discussionAuthor.username }}</h3>  -->
            <p v-if="feed">{{ feed.discussion.question }}</p>
        </div>
        </router-link>
    </div>
</template>

<script>
// import { findById } from '@/helpers'

export default {
    props: {
        feed: {
            required: true,
            type: Object
        }
    },
    // computed: {
    //     discussionAuthor () {
    //         return findById(this.$store.state.users.items, this.feed.discussion.userId)
    //     },
    //     scoopAuthor () {
    //         return findById(this.$store.state.users.items, this.feed.latestScoop.userId)
    //     }
    // }
}
</script>

<style scoped>


p {
    color: #042820;
    font-size: 1em;
    margin-left: 40px;
    margin-right: 30px;
}

h2 {
  color: #58f0cd;
  font-size: 2em;
  border-radius: 1em 0 0 0 ;
  padding: 0;
  margin: 0;
}

header {
    /* width:100%; */
    margin: 50%;
    /* padding: auto; */
    align-content: center;
    align-items: center;
    text-align: center;
}


/* .feed {
  background-color: rgb(123, 226, 240);
  color: #58f0cd;
  padding: 0em;
  margin: 0;
  top: 0;
  padding-bottom: 10px;
  margin: 0px 5px 10px 5px;
  border-radius: 3em 0 1em 1em ;
  border:#f058dc solid 1px;
} */

header {
    margin: 0;
    padding: 0;
    padding: 1.5em;
    margin: 0px 5px 0px 5px;
    background-color: #05323b;
    border-radius: 1em 0 0 0 ;
    border:#0f0f0a solid 1px;
}

/* router-link {
    margin: 0;
    padding: 0;
    border:#21df1a solid 1px;
} */

.has-scoop {
  background-color: rgb(123, 226, 240);
  color: #58f0cd;
  padding: 0em;
  margin: 0;
  top: 0;
  padding-bottom: 10px;
  margin: 0px 5px 10px 5px;
  border-radius: 0em 0 1em 1em ;
  border:#0f080e solid 1px;
}

.no-scoops {

  background-color: rgb(123, 226, 240);
  color: #58f0cd;
  padding: 0em;
  margin: 0;
  top: 0;
  padding-bottom: 10px;
  margin: 0px 5px 10px 5px;
  border-radius: 0em 0 1em 1em ;
  border:#050405 solid 1px;
  text-align: center;

}

</style>