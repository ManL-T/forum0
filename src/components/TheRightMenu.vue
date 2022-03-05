<template>
  <div class="right-menu">
    <div class="search">search...</div>
    <p style="font-size:0.7em">Filter alphabetically:</p>
    <div v-if="letters" class="alphabet">  
      <p @click="selectedLetter= ''" style="font-size:0.8em;content-align:center;">All words in current category</p> 
      <!-- <p>------</p> -->
      <p class="letters" v-for="letter in filteredLetters" :key="letter">
        <a class="letter-filter" @click="filterByLetter(letter)">
        {{ letter }}</a>
      </p>
    </div>
    <div v-if="!selectedLetter.length" class="words-list">
      <div class="words" v-for="item in allWords" :key="item.id">
        <a :href="$router.resolve({name: 'DiscussionPage', params: {id: item.id}}).href">
          {{ item.word }}</a>
      </div>
    </div>
    <div v-else class="words-list">
      <div class="words" v-for="item in filteredWords" :key="item.id">
        <a :href="$router.resolve({name: 'DiscussionPage', params: {id: item.id}}).href">
          {{ item.word }}</a>
      </div>
    </div>
  </div>
</template>

<script>
// need to reload DIscussionPage so that we fetch the data, else breaks
// best solution would be to load all data from App.vue and only reload
// when changing to different language
export default {
  props: {
    allWords: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ],
      selectedLetter: "",
      selectedWords: []
      }
  },
  computed: {
    filteredLetters () {
      let allFirstLetters = []
      this.allWords.forEach(item => {
        let firstLetter = item.word.slice(0,1)
        allFirstLetters.push(firstLetter.toUpperCase())
        })
      let finalSelection = []
      this.letters.forEach(letter => {
      if(allFirstLetters.includes(letter)) {
        finalSelection.push(letter)
        }
      })
      return finalSelection
    },
    filteredWords () {
      return this.selectedWords
      }
  },
  methods: {
    filterByLetter (letter) {
      this.selectedLetter = letter
      let newList = []
      this.allWords.forEach(item => {
        if(item.word[0].toUpperCase() === letter){
          newList.push(item)
        }      
      })
      this.selectedWords = newList
    }
  }
}
</script>

<style scoped>

p {
  margin: 0em;
  padding: 0.5em;
  color: #58f0cd;
  font-size: 1em;
  line-height: 1.3em;
}

.letters {
  display: inline;
  overflow-wrap: anywhere;
  padding: 5px;
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
  margin: 5px;
  margin-top: 10px;
  padding: 10px;
  line-height: 1em;
}

.words-list {
  color: #58f0cd;
  padding: 10px;
  line-height: 50px;
  line-height: 2em;
}

.words {
  color: #58f0cd;
}

a {
  color: #58f0cd;
}

</style>