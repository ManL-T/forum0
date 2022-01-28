<template>
  <div class="dicussion-card">
        <div class="discussion-header">
            <h5 v-if="discussion.userId === authUser?.id">
                <router-link
                :to="{name: 'DiscussionEdit', params: {id: this.discussion.id}}"
                class="btn-green btn-small"
                tag="button"
                >
                Edit Discussion
                </router-link>
            </h5>
            <h1>{{ discussion.word }}</h1> 
            <div v-if="discussion.definition" class="definitions-list">
                <p>Definition/s:</p>
                <p>{{ discussion.definition }}</p>
            </div>
            <div v-if="discussion.question" class="questions-list">
                <p>Question:</p>
                <p>{{ discussion.question }}</p>
            </div>
            <div class="author">
                <h5>{{ discussion.author?.username }}</h5>
                <!-- pending using the discussion getter to get the author
                and I guess pass the discussion id instead of the whole discussion as a prop? -->
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
        }
    },
    computed: {
        ...mapGetters( 'auth', [ 'authUser' ] ),
    }
}
</script>