<template>
  <div class="left-menu">
    <div class="language-filter">
      <select v-model="language"> 
        <option value="person">English</option>
        <option value="location">French</option>
        <option value="academic">Spanish</option>
      </select>
    </div>
    <div class="about">
      <router-link class="about-link" :to="{name:'About'}">About 2ingo</router-link>
    </div>
    <div class="categories-words">
      <h2>Words</h2>
      <div @click="updateCategory('all')"
      class="category"
      :class="{ active: currentCategory === 'all'}"
      >All</div>
      <hr class="separation-line">
      <div @click="updateCategory('generic')"
      class="category"
      :class="{ active: currentCategory === 'generic'}"
      >Generic</div>
      <hr class="separation-line">
      <div @click="updateCategory('academic')"
      class="category"
      :class="{ active: currentCategory === 'academic'}"
      >Academic</div>
      <hr class="separation-line">
      <div @click="updateCategory('location')"
      class="category"
      :class="{ active: currentCategory === 'location'}"
      >Location</div>
      <hr class="separation-line">
      <div @click="updateCategory('person')"
      class="category"
      :class="{ active: currentCategory === 'person'}"
      >Person</div>
    </div>
    <div class="categories-expressions">
      <h2>Expressions</h2>
      <div class="category">All</div>
      <hr class="separation-line">
      <div class="category">Popular</div>
      <hr class="separation-line">
      <div class="category">Current</div>
      <hr class="separation-line">
      <div class="category">Slang</div>
    </div>
        </div>

</template>

<script>
export default {
  emits: ['categoryChange'],
  methods: {
    updateCategory(category) {
      this.$store.dispatch('feeds/updateCategory', {category})
      console.log('category before emit in menu: ', category)
      this.$emit('categoryChange', category)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

.active {
  background-color:#58f0cd;
  color:#071113;
}

h2 {
  margin: 0.5;
  padding: 0.5em;
  background-color: #1E4147;
  color: #58f0cd;
  font-size: 1em;
  font-weight: bold;
}

hr {
  color: #58f0cd;
}

.language-filter {
  background-color: #071113;
  color: #58f0cd;
  /* border:rgb(135, 209, 222) solid 1px; */
  border-radius: 2px;
  margin: 5px;
  padding: 0.5em;
  align-content: center;
}

.about {
  color: #58f0cd;
  margin: auto;
  padding-left: 10px;
  padding-top: 10px;
}

.about-link {
  color: #58f0cd;
  margin: auto;
  padding-left: 10px;
  padding-top: 10px;
}

.separation-line {
  background-color: #58f0cd;
  height: 1px;
  border: none;
}

.categories-words {
  color: #58f0cd;
  margin: auto;
  padding-left: 10px;
}

.categories-expressions {
  color: #58f0cd;
  margin: auto;
  padding-left: 10px;
}

.category {
  padding: 0.5;
}

</style>