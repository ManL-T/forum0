<template>
    <div class="register">
        <h1>Create an account</h1>
        <VeeForm @submit="register" class="card card-form">
            <AppFormField v-model="form.name" name="name" label="Name" rules="required" />
            <AppFormField v-model="form.username" name="username" label="Username" rules="required|unique:users,username" />
            <AppFormField v-model="form.email" name="email" label="Email" rules="required|email|unique:users,email" type="email" />
            <AppFormField v-model="form.password" name="password" label="Password" rules="required|min:8" type="password" />
            <div class="form-actions">
                <button type="submit" class="submit">Register</button>
            </div>
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
                password: ""
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
    padding: 2em;
    font-size: 1.5em;
    align-content: left; /* doing nothing */
}

.form-group {
    padding: 0.5em;
}

label {
    padding: 1em;
}

button {
    font-size: 0.5em;
}
</style>