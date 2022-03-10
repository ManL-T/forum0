<template>
  <div class="not-found">
    <h1>Not Found</h1>
    <div class="card">
      <router-link :to="{name: 'Home'}">
      <h2>We can't find the page you are looking for</h2>
      <!-- <p>Take me back home</p> -->
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  created () {
    this.$emit('ready')  
  }
}
</script>

<style scoped>


.not-found {
  width: 90%;
  margin: auto;
  margin-top:1em;
}

h1 {
  color: white;
  font-size: 3em;
}

.card {
  background-color: beige;
  width: 90%;
  margin: auto;
  margin-left: 1em;
  padding: 1em;
  border-radius: 1em;
}

h2 {
  color: rgb(31, 26, 26);
  font-size: 2em;
}


</style>
