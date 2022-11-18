<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <router-link to='/' class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Projet SOA</router-link>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search">
        <div class="navbar-nav">
            <div class="d-flex nav-item text-nowrap">
                <router-link to="/profile" class="nav-link px-3" href="#">{{name}}</router-link>
                <router-link to ="/login" class="nav-link px-3" href="#" @click="logout">Sign out </router-link>
            </div>
        </div>
    </header>
</template>

<script  lang="ts">
/* eslint-disable */ 
import axios from "axios"
import {onMounted} from "vue"
import {ref} from "vue"
export default {
    name:"Nav",
setup(){
    const name = ref('')
      onMounted( async()=> {
        const {data} =await axios.get('user')
        name.value = data.first_name +' ' +data.last_name
    })
    const logout = async ()=> {
       await axios.post('logout')
      }
      return {
        name,
        logout
      }
    }
}

</script>