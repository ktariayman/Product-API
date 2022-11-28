<template>

    <div class="pt-3 pb-2 mb-3 border-bottom">
        <router-link to='/products/create' class="btn btn-sm btn-outline-secondary">Add</router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">description</th>
            <th scope="col">image</th>
            <th scope="col">price</th>
          </tr>
          
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
          
            <td >**</td>
            <td >{{product.id}}</td>
            <td >{{product.title}}</td>
            <td >{{product.description}}</td>
            <td ><img width="100" :src="product.image"/></td>
            <td >{{product.price}}</td>
            <td>
              <div class="btn-group mr-2">
                <router-link :to="`/products/${product.id}/edit`" class="btn btn-sm btn-outline-secondary" > Edit</router-link>
                <a href='javascript:void(0)' class="btn btn-sm btn-outline-secondary" @click="del(product.id)"> Delete</a>
              </div>
            </td>
        
          </tr>

        </tbody>
      </table>
    </div>

    <Pagination :last-page='lastPage' @page-changed='load($event)'/>

    
</template>

<script lang="ts">
/* eslint-disable */ 
import {onMounted,ref} from 'vue'
import axios from "axios"
import Pagination from '@/components/Pagination.vue'
export default {
  name:"Products",
  components:{Pagination},
  setup(){
    const products = ref([])
    const lastPage = ref(0)
    const load = async(page=1)=> {
        const {data} =await axios.get(`products?page=${page}`)
        products.value= data.data
        lastPage.value= data.meta.last_page;
    }
    onMounted(load)

    const del = async(id:number) => {
        if(confirm('Are you sure?')){
            await axios.delete(`products/${id}`)
            products.value= products.value.filter((u:any) => u.id !== id)
        }
    }
    return {
      products,
      del,
      lastPage,load
    }
  }
}

</script>

<style>
</style>