<template>
  <div class="dicussion-card">
        <div class="discussion-header">
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
            <div class="author">
                <h5>Added by: {{ author }}</h5>
            </div>

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
        ...mapGetters( 'auth', [ 'authUser' ]),
        author () {
            return this.discussionAuthor.username
        }
    }
}
</script>

<style scoped>
.discussion-header {
    margin: none;
    padding: 0.5em;
    padding-left:1em;
    padding-right:1em;
}

.edit {
    float: right;
    color: rgb(27, 79, 224);
    font-size: 0.8em;
    margin: none;
    padding: none;
}
</style>