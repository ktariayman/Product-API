<template>
     <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3 sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link active-class= "active" class="nav-link " to="/">
              Dashboard
            </router-link>
          </li>
          <li class="nav-item" v-if="role==='Admin'">
            <router-link active-class= "active"   class="nav-link "  to="/users">
              Users
            </router-link>
          </li>
        </ul>

       
      </div>
    </nav>
</template>

<script>
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
        role.value = data.role.name
        console.log('role',role.value)
    })
    return {
        role,
      }
    }
}

</script>