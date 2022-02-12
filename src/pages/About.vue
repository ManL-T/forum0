<template>
  <div class="about-page">
    <h1>About 2ingo: A warm welcome from us</h1>
    <div class="presentation">
      <!-- <p>A warm welcome from us...</p> -->
      <p>We are a group of word lovers who would like to explore and share our passion for words. </p>
      <p>We are particularly interested in the evolution of words through the centuries, and in any fun or exciting stories that went along this journey.</p>
      <p>Passionate discussions and good referencing are encouraged and appreciated.</p>
      <p>If this is a field you are also passionate about, please accept our invitation and join the community to share your knowledge!</p>
      <p>The more we join, the more fun, so please spread the word to other word freaks :-)))</p>
      <br>
      <br>
      <p style="font-size:1em">For any technical issues, feature suggestions, or other, please email us here: <i> info @ 2ingo.com </i></p>
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

<style>

.about-page {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    padding-top: 20px;
    background-color: #a2afaf;
    color: #022b21;
    align-content: center;
}

h1 {
  padding-left: 12%;
  padding-bottom: 10px;
  font-size: 1.6em;
}
.presentation {
  padding-left: 12%;
  padding-right: 10%;
}

p {
  font-size: 1.2em;
  line-height: 1.5em;
  font-weight:500;
}

</style>