<template>
    <main class="form-signin w-100 m-auto">
        <form @submit.prevent="submit">
            <h1 class="h3 mb-3 fw-normal">Please register</h1>
            <input v-model="firstName" class="form-control"  placeholder="firstName" required>
            <input v-model="lastName" class="form-control"  placeholder="lastName" required>
            <input v-model="email" type="email" class="form-control"  placeholder="name@example.com" required>
            <input v-model="password" type="password" class="form-control"  placeholder="Password" required>
            <input v-model="passwordConfirm" type="password" class="form-control"  placeholder="PasswordConfirm" required>
            <button class="w-100 btn btn-lg btn-primary" type="submit">submit</button>
        </form>
        <router-link to="/login">login</router-link>

    </main>
</template>

<script lang="ts">
/* eslint-disable */ 
import {onMounted, ref} from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
export default {
    name :"Register",
    setup(){
      const firstName = ref('')
      const lastName = ref('')
      const email = ref('')
      const password = ref('')
      const passwordConfirm = ref('')
      const router = useRouter()
      const submit = async () => {
        await axios.post('register',{
          first_name : firstName.value,
          last_name:lastName.value,
          email:email.value,
          password:password.value,
          password_confirm:passwordConfirm.value,
        })

        await router.push("/login")

        
      }

      onMounted( async()=> {
        try {
          const {data} =await axios.get('user')
          await router.push('/')

        } catch (error) {
          // await router.push('/login')
        }
      })
      return {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        submit
      }
    },
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>