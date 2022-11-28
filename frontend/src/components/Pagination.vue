<template>
    <nav>
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="javascript:void(0)" @click="prev">Previous</a>
            </li>
            <li class="page-item">
                <a class="page-link"  href="javascript:void(0)" @click="next">Next</a>
            </li>
        </ul>            
    </nav>
</template>

<script lang='ts'>
/* eslint-disable */
import {watch,ref, SetupContext} from 'vue' 

export default {
    name :"Pagination",
    emit:['page-changed'],
    props:{
        lastPage:Number
    },
    setup(props:{lastPage:number}, context:SetupContext){
        const page = ref(1)
        watch(page, ()=> {
            context.emit('page-changed',page.value)
        })
        const next = async () => {
            if(page.value< props.lastPage){
            page.value++;
        }
    }
    const prev = async() => {
        if(page.value > 0){   
            page.value--;
        }} 
    
        
    return {
        prev,
        next
    }
    }
  
}
</script>

<style>
</style>