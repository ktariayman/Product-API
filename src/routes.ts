import { Router } from "express";
import { authenticatedUser, Login, logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth";
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
}