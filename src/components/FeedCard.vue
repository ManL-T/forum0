<template>
   <li v-if="feed" class="feed">
        <router-link :to="{name: 'DiscussionPage', params: {id: feed.discussion.id}}">
        <h2>{{ feed.discussion.word}}</h2> 
        <div v-if="feed.latestScoop" class="has-scoop">
            <h3>{{ feed.latestScoop.text}}</h3> 
        </div>
        <div v-else class="no-scoops">
            <h3>No scoops yet, add one yourself</h3> 
        </div>
        </router-link>
    </li>
</template>

<script>
export default {
    props: {
        feed: {
            required: true,
            type: Object
        }
    }
}
</script>