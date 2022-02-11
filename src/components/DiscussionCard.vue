<template>
  <div class="discussion-card">
    <router-link
        v-if="discussion.userId === authUser?.id"
        :to="{name: 'DiscussionEdit', params: {id: this.discussion.id}}"
         class="edit-button">
        <h6 class="edit">Edit</h6>
    </router-link>
    <br>
    <div v-if="discussion.definition" class="definitions-list">
        <h5>Definition:</h5>
        <p>{{ discussion.definition }}</p>
    </div>
    <br>
    <div v-if="discussion.question" class="questions-list">
        <h5>Question:</h5>
        <p>{{ discussion.question }}</p>
    </div>
    <br>
    <div v-if="discussionAuthor" class="author">
        <h5>Added by: {{ discussionAuthor.username }}</h5>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        discussion : {
            required: true,
            type: Object
        },
        discussionAuthor : {
            required: true,
            type: Object
        }
    },
    computed: {
        ...mapGetters( 'auth', [ 'authUser' ])
    }
}
</script>

<style scoped>

h5 {
    font-weight: bold;
    padding: 0;
    margin: 0;
}

p {
    font-size: 1em;
    line-height: 1.5em;
    padding: 0;
    margin: 0;
}

.discussion-card {
    margin: 0;
    padding: 0;
}

.edit-button {
    display:inline;
    float: right;
    margin: 0;
    padding: 0;
}

.edit {
    display:inline;
    align-content: right;
    margin: 0;
    background-color: #2c98ad;
    color: #d8eaee;
    font-size: 0.8em;
    width: 5%;
    padding: 1em;
    border-radius: 5px;
}

.author {
    float: left;
    margin: none;
    padding: none;
}


</style>