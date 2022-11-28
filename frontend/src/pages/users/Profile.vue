<template>
    <h2>Account information</h2>
    <form @submit.prevent="infoSubmit">
        <div class="mb-3">
            <label for="">First Name</label>
            <input v-model="infoData.first_name" class="form-control" name="first_name"/>
        </div>
        <div class="mb-3">N
            <label for="">Last name</label>
            <input  v-model="infoData.last_name" class="form-control" name="last_name"/>
        </div>
        <div class="mb-3">
            <label for="">Email</label>
            <input v-model="infoData.email" class="form-control" name="email"/>
        </div>
        <button class="btn btn-outline-secondary">Save</button>
    </form>

    <h3 class="mt-4">Change  Password</h3>
    <form @submit.prevent="passwordSubmit">
        <div class="mb-3">
            <label for="">Password</label>
            <input v-model="passwordData.password" class="form-control" name="password"/>
        </div>
        <div class="mb-3">
            <label for="">Password Confirm</label>
            <input v-model="passwordData.password_confirm" class="form-control" name="password_confirm"/>
        </div>
        <button class="btn btn-outline-secondary">Save</button>
    </form>
</template>

<script lang='ts'>
/* eslint-disable */ 
import {computed, reactive, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
export default {
    name :"Profile", 
    setup(){
        const infoData = reactive({
            first_name:'',
            last_name:'',
            email:'',
        })
        const passwordData = reactive({
            password:'',
            password_confirm:'',
    })

    const store=useStore()
    const user  = computed(()=> store.state.user)
    
    watch(user , () =>{
        infoData.first_name= user.value.first_name;
        infoData.last_name= user.value.last_name,
        infoData.email= user.value.email;
        })  

    const infoSubmit=async()=>{
        const {data} =   await axios.put('users/info',infoData)
        store.dispatch('USer/setUser',data)
    }
    const passwordSubmit=async()=>{
        await axios.put('users/password',passwordData)
    }

    return {
        infoData,
        passwordData,
        infoSubmit,
        passwordSubmit
    }
    }
}
</script>

<style>
</style>