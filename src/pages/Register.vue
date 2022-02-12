<template>
    <div class="register">
        <VeeForm @submit="register" class="card-form">
            <h1 class="title">Create an account</h1>

            <AppFormField v-model="form.name" name="name" label="Name" rules="required" />
            <AppFormField v-model="form.username" name="username" label="Username" rules="required|unique:users,username" />
            <AppFormField v-model="form.email" name="email" label="Email" rules="required|email|unique:users,email" type="email" />
            <AppFormField v-model="form.password" name="password" label="Password" rules="required|min:8" type="password" />
            
            <span>
                <h5>I have an account - 
                <router-link :to="{name: 'SignIn'}">Sign In</router-link>
                </h5>
            </span>
        
        <button type="submit" class="sign-up">Register</button>
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
                name: "",
                username: "",
                email: "",
                password: "",
                location: ""
            }
        }
    },
    methods: {
        async register () {
            await this.$store.dispatch('auth/registerUserWithEmailAndPassword', this.form )
            this.$router.push('/')
        }
    },
    created () {
        this.$emit('ready')
    }
}
</script>

<style scoped>
.register {
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

.sign-up {
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