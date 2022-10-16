import { Router } from "express";
import { authenticatedUser, Login, logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth";
import { Permissions } from "./controller/permissions";
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

    router.get('/api/permissions' ,authMiddleware, getAllRoles)
    router.get('/api/permissions/:id' ,authMiddleware, getRole)
    router.post('/api/permissions' ,authMiddleware, createRole)
    router.put('/api/permissions/:id' ,authMiddleware, updateRole)
    router.delete('/api/permissions/:id' ,authMiddleware, deleteRole)

}