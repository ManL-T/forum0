<template>
<div class="profile-page">
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

/* .profile-page {
  color: rgb(51, 41, 41);
  font-size: 2em;
  height: 100vh;
  text-align: left;
  margin: none;
  margin-left: 2em;
  padding: none;
} */

.profile-page {
    width: 100%;
    height: 100vh;
}

/* .profile-card {
  background-color: #7dbfcc;
  color: #122631;
  margin: 0;
  margin-left: 30%;
  width: 50%;
  border-radius: 8px 8px 0px 0px;
} */

h5 {
  margin: none;
  padding: none;
}

profile-card {
  margin: none;
  padding: none;
}
  

</style>
