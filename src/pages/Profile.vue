<template>
<div class="profile-page">
  <h5>Profile page</h5>
    <div class="profile-card">
      <ProfileCard v-if="!edit" :user="user" />
      <ProfileCardEditor v-else :user="user" />
    </div>  
</div>
</template>

<script>
import ProfileCard from '@/components/ProfileCard'
import ProfileCardEditor from '@/components/ProfileCardEditor'
import { mapGetters } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'


export default {
  components: { ProfileCard, ProfileCardEditor },
  mixins: [asyncDataStatus],
  props: {
    edit: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters('auth', { user: 'authUser' })
  },
  created () {
    this.$emit('ready')
  },
  // async created () {
  //   await this.fetchUsers()
  //   this.asyncDataStatus_fetched()
  // }
}
</script>

<style scoped>

.profile-page {
  color: rgb(51, 41, 41);
  font-size: 2em;
  height: 100vh;
  text-align: left;
  margin: none;
  margin-left: 2em;
  padding: none;
}

h5 {
  margin: none;
  padding: none;
}

profile-card {
  margin: none;
  padding: none;
}
  

</style>
