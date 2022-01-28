<template>
  <div class="sign-in">
      <VeeForm @submit="signIn" class="card card-form">
        <h1 class="text-center">Login</h1>

        <AppFormField label="Email" name="email" type="email" v-model="form.email" rules="required|email" />
        <AppFormField label="Password" name="password" type="password" v-model="form.password" rules="required" />

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="form-actions text-right">
          <router-link :to="{name: 'Register'}">Create an account?</router-link>
        </div>
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
    padding: 2em;
    font-size: 1.5em;
    align-content: left; /* doing nothing */
}

.form-group {
    padding: 0.5em;
}

label {
    padding: 10px;
}

input {
    font-size: 1em;
}

button {
    font-size: 0.5em;
}

</style>