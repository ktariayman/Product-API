import { Router } from "express";
import  express  from "express";
import { authenticatedUser, Login, logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth";
import { upload } from "./controller/image";
import { Permissions } from "./controller/permissions";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "./controller/product";
import { createRole, deleteRole, getAllRoles, getRole, updateRole } from "./controller/role";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "./controller/users";
import { authMiddleware } from "./middleware/auth";
import { exportCSV, getAllOrders } from "./controller/order";
import { permissionMiddleware } from "./middleware/permission";

export const routes = (router :Router) => {
    // auth Controller
    
    router.post('/api/register' , Register)
    router.post('/api/login' , Login)
    router.get('/api/user' , authMiddleware,authenticatedUser)
    router.post('/api/logout' ,authMiddleware, logout)
    router.put('/api/users/info' ,authMiddleware, UpdateInfo)
    router.put('/api/users/password' ,authMiddleware, UpdatePassword)

    //user Controller /// admin only
    
    router.get('/api/users' ,authMiddleware,permissionMiddleware("users"), getAllUsers)
    router.get('/api/users/:id' ,authMiddleware, permissionMiddleware("users"),getUser)
    router.post('/api/users' ,authMiddleware, permissionMiddleware("users"),createUser)
    router.put('/api/users/:id' ,authMiddleware,permissionMiddleware("users"), updateUser)
    router.delete('/api/users/:id' ,authMiddleware, permissionMiddleware("users"),deleteUser)

    router.get('/api/permissions' ,authMiddleware, Permissions)
    
    //roles Controller

    router.get('/api/roles' ,authMiddleware, getAllRoles)
    router.get('/api/roles/:id' ,authMiddleware, getRole)
    router.post('/api/roles' ,authMiddleware, createRole)
    router.put('/api/roles/:id' ,authMiddleware, permissionMiddleware("roles"),updateRole)
    router.delete('/api/roles/:id' ,authMiddleware, deleteRole)
    
    //products Controller

    router.get('/api/products' ,authMiddleware, permissionMiddleware("products"), getAllProducts)
    router.get('/api/products/:id' ,authMiddleware,permissionMiddleware("products") , getProduct)
    router.post('/api/products' ,authMiddleware, permissionMiddleware("products") ,createProduct)
    router.put('/api/products/:id' ,authMiddleware, permissionMiddleware("products") ,updateProduct)
    router.delete('/api/products/:id' ,authMiddleware, permissionMiddleware("products") ,deleteProduct)
    
    //upload Controller
    
    router.post('/api/upload' ,authMiddleware, upload)
    router.use('/api/upload' ,express.static("./uploads"))

    router.get('/api/orders' ,authMiddleware, getAllOrders)
    router.post('/api/export' ,authMiddleware, exportCSV)

}
