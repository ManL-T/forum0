<template>
<div class="scoop-card">
    <h5 v-if="scoop.userId === authUser?.id" class="edit-button">
        <router-link
        :to="{name: 'ScoopEdit', params: {id: this.scoop.id}}"
        class="edit">
        Edit
        </router-link>
    </h5>
    <br>
    <p>{{ scoop.text }}</p>
    <div class="author">
        <h5>Added by: {{ author?.username }}</h5>
    </div>
    <br><br>
</div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import { findById } from '@/helpers'

export default {
    props: {
        scoop: {
            required: true,
            type: Object
        }
    },
    computed: {
        ...mapGetters( 'auth', [ 'authUser' ] ),
        author () {
            return findById(this.$store.state.users.items, this.scoop.userId)
        }
    }
}
</script>

<style scoped>

p {
    font-size: 1em;
    line-height: 1.5em;
    white-space: pre-wrap;
    padding: 0;
    margin: 0;
}

.scoop-card {
    margin: 0;
    padding: 0;
}

.author {
    float: left;
    margin: none;
    padding: none;
}

.edit-button {
    display:inline;
    float: right;
    margin: 1em;
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

</style>
