<template>
     <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3 sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link active-class= "active" class="nav-link " to="/">
              Dashboard
            </router-link>
          </li>
          <li class="nav-item" >
            <!-- v-if="role==='Admin'" -->
            <router-link active-class= "active"   class="nav-link "  to="/users">
              Users
            </router-link>
          </li>
          <li class="nav-item" >
            <!-- v-if="role==='Admin'" -->
            <router-link active-class= "active"   class="nav-link "  to="/roles">
              Roles
            </router-link>
          </li>

          <li class="nav-item" >
            <!-- v-if="role==='Admin'" -->
            <router-link active-class= "active"   class="nav-link "  to="/products">
              products
            </router-link>
          </li>

          
          <li class="nav-item" >
            <!-- v-if="role==='Admin'" -->
            <router-link active-class= "active"   class="nav-link "  to="/orders">
              orders
            </router-link>
          </li>
        </ul>

       
      </div>
    </nav>
</template>

<script lang='ts'>
/* eslint-disable */ 
import axios from "axios"
import {onMounted} from "vue"
import {ref} from "vue"

export default {
    name:"Menu",
    setup(){
      const role = ref('')
      onMounted( async()=> {
        const {data} =await axios.get('user')
        console.log('data.role',data.role.name)
        if(data.role.name>0) {
          role.value = data.role.name
        }else{
          role.value ='User'
        }
        console.log('data', data)
        console.log('role',role.value)
    })
    return {
        role,
      }
    }
}

</script>