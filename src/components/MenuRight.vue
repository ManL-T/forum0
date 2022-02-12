<template>
  <div class="right-menu">
    <div class="search">search...</div>
    <div class="alphabet">
      <p class="letters" v-for="letter in letters" :key="letter">
        {{ letter }}
      </p>
    </div>
    <div class="words-list">
      <p class="words" v-for="word in words" :key="word">
        {{ word }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ],
      words: ["magazine", "magenta", "maggot", "magic", "magistrate", "magnet", "magnificent", "magpie", "maid", "mail", "majestic", "major", "maladroit", "malevolence", "malice", "mallet", "mandate", "manicure", "manure"]
    }
  }
}
</script>

<style scoped>

p {
  margin: 0em;
  padding: 0em;
  color: #58f0cd;
  font-size: 1em;
}

.letters {
  display: inline;
  overflow-wrap: anywhere;
  padding: 5px;
  /* line-height: 5px; */
}

.search {
  background-color: #071113;
  color: #58f0cd;
  border:rgb(74, 105, 110) solid 1px;
  border-radius: 2px;
  padding: 5px;
  margin: 5px;
}
.alphabet {
  background-color: #1E4147;
  margin: 2px;
  margin-top: 10px;
  padding: 0.5em;
  line-height: 50px;
}

.words-list {
  padding: 5px;
  line-height: 50px;
}

.words {
  color: #58f0cd;
}

</style>