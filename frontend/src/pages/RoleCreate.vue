<template>
    <form action="" @submit.prevent="submit">
        <div class="mb-3">
            <label >Name</label>
            <div>
                <input v-model="form.name" type="text" class="form-control">
            </div>
        </div>
        <div class="mb-3">
            <label class="col-sm-2 col-form-label">Permissions</label>
            <div>
                <div>
                    <label >Name</label>
                    <input v-model="form.name" type="text" class="form-control">

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

    onMounted(async ()=> {
        const {data} =await axios.get('roles')
      roles.value= data
    });
    const submit = async () => {
        await axios.post('users',form)
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
