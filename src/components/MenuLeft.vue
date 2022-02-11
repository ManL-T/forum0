<template>
  <div class="left-menu">
    <div class="language-filter">English</div>
    <div class="categories-words">
      <h2>Words</h2>
      <div class="category">All</div>
      <hr class="separation-line">
      <div class="category">Generic</div>
      <hr class="separation-line">
      <div class="category">Academic</div>
      <hr class="separation-line">
      <div class="category">Locations</div>
      <hr class="separation-line">
      <div class="category">Persons</div>
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

}
</script>

<style scoped>

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
  border:rgb(135, 209, 222) solid 1px;
  border-radius: 2px;
  margin: 5px;
  padding: 0.5em;
  align-content: center;
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