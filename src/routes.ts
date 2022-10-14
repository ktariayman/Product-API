import { Router } from "express";
import { authenticatedUser, Login, Register } from "./controller/auth";

export const routes = (router :Router) => {
    router.post('/api/register' , Register)
    router.post('/api/login' , Login)
    router.get('/api/user' , authenticatedUser)
}