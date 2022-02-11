<template>
  <div class="sign-in">
      <VeeForm @submit="signIn" class="card-form">
        <h1 class="title">Sign In</h1>

        <AppFormField label="email" name="email" type="email" v-model="form.email" rules="required|email" />
        <AppFormField label="password" name="password" type="password" v-model="form.password" rules="required" />

        <span>
            <h5>I don't have an account - 
          <router-link :to="{name: 'Register'}">Sign Up</router-link>
          </h5>
        </span>
        
        <button type="submit" class="login">Log in</button>
        <button type="cancel" class="cancel">
            <router-link :to="{name: 'Home'}" class="cancel-link">
                Cancel </router-link></button>
      </VeeForm>
  </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async signIn () {
            try {
                await this.$store.dispatch('auth/signInWithEmailAndPassword', { ...this.form })
                console.log('from signIn method after dispatching the action. This is the form submitted: ', this.form)
                this.$router.push('/')
            } catch (error) {
                alert(error.message)
            }
        }
    },
    created () {
        this.$emit('ready')
    }
 
}
</script>

<style scoped>

.sign-in {
    width: 100%;
    height: 100vh;
}

.card-form {
    width: 70%;
    margin: auto;
    margin-top: 5%;
    padding: 2em;
    background-color: #DEF9F9;
    border-radius: 20px;
    align-content: center;
}

.title {
    font-size: 2em;
    color: #064637;
    font-weight: lighter;
    text-align: center;
    margin: 0;
    padding: 0.5em;
    padding-top: 0.2em;
}

span {
    color: #064637;
    text-align: center;
}

h5 {
    font-weight: lighter;
}

a {
    text-decoration: none;
    color: #064637;
    font-weight: bold;
}

.login {
  font-size: 1em;
  color: #fcfeff;
  width: 65%;
  border: none;
  background-color: #0c6953;
  border-radius: 10px;
  padding: 1em;
  margin-bottom: 10px;
  margin-left: 20%;
  font-weight: bold;
}

.cancel {
  font-size: 1em;
  color: #fcfeff;
  width: 65%;
  border: none;
  background-color: #8d7a0e;
  border-radius: 10px;
  padding: 1em;
  margin-left: 20%;
  font-weight: bold;
}

.cancel-link {
    color: #fcfeff;
}

</style>