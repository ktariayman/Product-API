<template>
        <form action="" @submit.prevent="submit">
            <div class="mb-3">
                <label >first_name</label>
                <input v-model="form.first_name" type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label >last_name</label>
                <input v-model="form.last_name" type="text" class="form-control"  >
            </div>
            <div class="mb-3">
                <label >Email</label>
                <input v-model="form.email" type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label >Role</label>
                <select v-model="form.role_id" type="text" class="form-control">
                    <option v-for='role of roles' :key="role.id" :value="role.id">{{role.name}}</option>
                </select>
            </div>
            <button class="btn btn-outline-secondary">Save</button>
        </form>
</template>

<script lang="ts">
/* eslint-disable */ 
import axios from 'axios';
import {onMounted, reactive,ref} from 'vue'
import { useRoute, useRouter } from 'vue-router';
export default {
    name :"UserCreate",
    setup(){
        const roles = ref([])
        const form = reactive({
            first_name:'',
            last_name:'',
            email:'',
            role_id:''
        })
        const router = useRouter()
        const route = useRoute()

        onMounted(async ()=> {
            const roleResponse =await axios.get('roles')
            roles.value= roleResponse.data
            
            const response = await axios(`users/${route.params.id}`)
            console.log("response",response)
            form.first_name = response.data.first_name
            form.last_name = response.data.last_name
            form.email = response.data.email
            form.role_id = response.data.role.id
        });
        const submit = async () => {
            await axios.put(`users/${route.params.id}`,form)
            await router.push("/users")

        }

        return { 
            form,
            submit,
            roles
        }
    }
}
</script>
