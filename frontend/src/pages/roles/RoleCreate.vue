<template>
    <form action=""  @submit.prevent="submit">
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
                    <input class="form-check-input" type="checkbox" :value="permission.id" @change="select(permission.id , $event.target.checked)">
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
import { useRouter } from 'vue-router';
export default {
name :"RoleCreate",
setup(){
    const permissionList = ref([])
    const formData = reactive({
        name:'',
        permissions:[] as number[]
    })
    const router = useRouter()

    onMounted(async ()=> {
        const {data} =await axios.get('permissions')
        permissionList.value= data
    });
    const select = (id:number , checked:boolean) => {
        if(checked){
        formData.permissions= [...formData.permissions ,id]
        return
       }
       formData.permissions= formData.permissions.filter(p => p!== id)
    }

    const submit = async(id:number , checked:boolean) => {
        await axios.post('roles', formData)
        await router.push('/roles')
    }

    return { 
        formData,
        select,
        submit,
        permissionList
    }
}
}
</script>
