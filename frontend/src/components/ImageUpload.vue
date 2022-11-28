<template>
    <label class="btn btn-primary">
        Upload <input type='file' accept="image/*" hidden @change="upload($event.target.files)"/>
    </label>
</template>

<script lang='ts'>
import axios from 'axios';
import { SetupContext } from 'vue';
/* eslint-disable */ 
export default {
    name :"ImageUpload",
    emits:['uploaded'],
    setup (props:any,context: SetupContext){
        const upload =async (files: FileList | null) => {
            if(files ===null)return ;
            const file= files.item(0);

            const formData = new FormData()
            formData.append('image',file)
            const {data} = await axios.post('upload', formData)
            context.emit('uploaded' , data.url)
        }
        return{
            upload
        }
    }   
}
</script>

<style>
</style>