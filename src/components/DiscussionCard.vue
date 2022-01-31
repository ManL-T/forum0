<template>
  <div class="discussion-card">
    <router-link
        v-if="discussion.userId === authUser?.id"
        :to="{name: 'DiscussionEdit', params: {id: this.discussion.id}}"
        class="edit">
        <p>Edit</p>
    </router-link>
    <div v-if="discussion.definition" class="definitions-list">
        <p>Definition/s:</p>
        <p>{{ discussion.definition }}</p>
    </div>
    <div v-if="discussion.question" class="questions-list">
        <p>Question:</p>
        <p>{{ discussion.question }}</p>
    </div>
    <div v-if="discussionAuthor" class="author">
        <h5>Added by: {{ discussionAuthor.username }}</h5>
    </div>
    <br>
    <br>
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
.discussion-card {
    margin: none;
    padding: 0.5em;
    padding-left: 1em;
}

p {
    font-size: 1em;
}

.edit {
    float: right;
    color: rgb(27, 79, 224);
    font-size: 0.8em;
    margin: none;
    padding: none;
}

.author {
    float: right;
    margin: none;
    padding: none;
}


</style>