<template>
    <form @submit.prevent="submit">
        <div class="mb-3">
            <label >Name</label>
            <div>
                <input v-model="formData.name" type="text" class="form-control">
            </div>
        </div>
        <div class="mb-3">
            <label class="col-sm-2 col-form-label">Permissions</label>
            <div class="col-sm-10">
                <div class="form-check form-check-inline col-3" v-for="permission in permissionList" :key="permission.id">
                    <input class="form-check-input" type="checkbox" 
                        :value="permission.id"
                        :checked="checked(permission.id)"
                        @change="select(permission.id , $event.target.checked)"
                        >
                    <label >{{permission.name}}</label>

                </div>
            </div>
        </div>
        <button class="btn btn-outline-secondary">Save</button>
    </form>
</template>

<script lang="ts">
/* eslint-disable */ 
import axios from 'axios';
import {onMounted, reactive,ref} from 'vue'
import { useRouter,useRoute } from 'vue-router';
import {Permission} from '@/models/Permission'
export default {
name :"RoleEditor",
setup(){
    const permissionList = ref([])
    const formData = reactive({
        name:'',
        permissions:[]
    })
    const router = useRouter()
    const {params} = useRoute()

    onMounted(async ()=> {
        const {data} =await axios.get('permissions')
        permissionList.value= data

        const response = await axios.get(`roles/${params.id}`)
        formData.name = response.data.name
        formData.permissions = response.data.permissions.map((p:Permission) =>p.id)
        console.log(formData.permissions)
    });
    const select = (id:number , checked:boolean) => {
        if(checked){
        formData.permissions= [...formData.permissions ,id]
        return
        }
        formData.permissions= formData.permissions.filter(p => p!== id)
    }

    const checked = (id:number ) => {
        console.log("checked")
        return formData.permissions.some(p => p === id)
    }
    

    const submit = async(id:number , checked:boolean) => {
        console.log(`roles/${params.id}`)
        await axios.put(`roles/${params.id}`)
        await router.push('/roles')
    }

    return { 
        formData,
        select,
        submit,
        checked,
        permissionList,
    }
}
}
</script>
