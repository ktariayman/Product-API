<template>
    <form action="" @submit.prevent="submit">
        <div class="mb-3">
            <label >Title</label>
            <input v-model="form.title" type="text" class="form-control">
        </div>
        <div class="mb-3">
            <label >Description</label>
            <textarea v-model="form.description" type="text" class="form-control"></textarea>
        </div>
        <div class="mb-3">
            <label >Image</label>
            <div class="input-group">
                <input v-model="form.image" type="text" class="form-control">
                <ImageUpload @uploaded ="form.image=$event"/>
            </div>
        </div>
        <div class="mb-3">
            <label >Price</label>
            <input v-model="form.price" type="text" class="form-control">

        </div>
        <button class="btn btn-outline-secondary">Save</button>
    </form>
</template>

<script lang="ts">
import axios from 'axios';
import { reactive , onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ImageUpload  from '@/components/ImageUpload.vue';

/* eslint-disable */ 
export default {
name :"ProductCreate",
components:{ImageUpload},
setup(){
    const router=useRouter()
    const route=useRoute()
    const form=reactive({
        title:'',
        image:'',
        description:'',
        price:''
    })
    onMounted(async()=> {
        const productResponse = await axios.get(`products/${route.params.id}`)
        console.log("response",productResponse)
        
        form.title=productResponse.data.title
        form.image=productResponse.data.image
        form.description=productResponse.data.description
        form.price=productResponse.data.price
        
    })
    const submit = async () => {
        await axios.put(`product/${route.params.id}`,form)
        await router.push("/products")

    }
    return {
        form,
        submit
    }
}
}
</script>

<style>
</style>