<template>
<div class="scoop-card">
    {{ scoop.text }}
    <br><br>
    {{ user?.username }}
    <h5 v-if="scoop.userId === authUser?.id">
        <router-link
        :to="{name: 'ScoopEdit', params: {id: this.scoop.id}}"
        class="btn-green btn-small"
        tag="button"
        >
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
        user () {
            return findById(this.$store.state.users.items, this.scoop.userId)
        }
    }
}
</script>
