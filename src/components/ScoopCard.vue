<template>
<div class="scoop-card">
    <p>{{ scoop.text }}</p>
    <h5>Added by:{{ author?.username }}</h5>
    <h5 v-if="scoop.userId === authUser?.id">
        <router-link
        :to="{name: 'ScoopEdit', params: {id: this.scoop.id}}">
        Edit Scoop
        </router-link>
    </h5>
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
