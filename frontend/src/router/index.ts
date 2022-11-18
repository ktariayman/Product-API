import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'
import Users from '@/pages/Users.vue'
import UserCreate from '@/pages/UserCreate.vue'
import UserEdit from '@/pages/UserEdit.vue'
import Register from '@/pages/Register.vue'
import Login from '@/pages/Login.vue'


import Wrapper from '@/pages/Wrapper.vue'


import Profile from '@/pages/Profile.vue'


import Roles from '@/pages/Roles.vue'
import RoleCreate from '@/pages/RoleCreate.vue'


const routes: Array<RouteRecordRaw> = [
  {path:"/register",component:Register},
  {path:"/login",component:Login},


  { path:"",
    component:Wrapper,
    children: [

      {path:"",component:Dashboard},
      {path:"/profile",component:Profile},
      {path:"/users",component:Users},
      {path:"/users/Create",component:UserCreate},
      {path:"/users/:id/edit",component:UserEdit},
      {path:"/roles",component:Roles},
      {path:"/roles/create",component:RoleCreate},
      // {path:"/roles/:id/edit",component:Roles},

    ]
  },

  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
