import { Router } from "express";
import multer from "multer";
import { extname } from "path";
import { authenticatedUser, Login, logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth";
import { upload } from "./controller/image";
import { Permissions } from "./controller/permissions";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "./controller/product";
import { createRole, deleteRole, getAllRoles, getRole, updateRole } from "./controller/role";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "./controller/users";
import { authMiddleware } from "./middleware/auth";

export const routes = (router :Router) => {
    router.post('/api/register' , Register)
    router.post('/api/login' , Login)
    router.get('/api/user' , authMiddleware,authenticatedUser)
    router.post('/api/logout' ,authMiddleware, logout)
    router.put('/api/users/info' ,authMiddleware, UpdateInfo)
    router.put('/api/users/password' ,authMiddleware, UpdatePassword)

    //user Controller
    router.get('/api/users' ,authMiddleware, getAllUsers)
    router.get('/api/users/:id' ,authMiddleware, getUser)
    router.post('/api/users' ,authMiddleware, createUser)
    router.put('/api/users/:id' ,authMiddleware, updateUser)
    router.delete('/api/users/:id' ,authMiddleware, deleteUser)

    router.get('/api/permissions' ,authMiddleware, Permissions)

    router.get('/api/roles' ,authMiddleware, getAllRoles)
    router.get('/api/roles/:id' ,authMiddleware, getRole)
    router.post('/api/roles' ,authMiddleware, createRole)
    router.put('/api/roles/:id' ,authMiddleware, updateRole)
    router.delete('/api/roles/:id' ,authMiddleware, deleteRole)

    router.get('/api/products' ,authMiddleware, getAllProducts)
    router.get('/api/roles/:id' ,authMiddleware, getProduct)
    router.post('/api/roles' ,authMiddleware, createProduct)
    router.put('/api/roles/:id' ,authMiddleware, updateProduct)
    router.delete('/api/roles/:id' ,authMiddleware, deleteProduct)

    router.post('/api/upload' ,authMiddleware, upload)

}