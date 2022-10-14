import { Router } from "express";
import { authenticatedUser, Login, logout, Register } from "./controller/auth";
import { authMiddleware } from "./middleware/auth";

export const routes = (router :Router) => {
    router.post('/api/register' , Register)
    router.post('/api/login' , Login)
    router.get('/api/user' , authMiddleware,authenticatedUser)
    router.post('/api/logout' ,authMiddleware, logout)
}