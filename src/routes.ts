import { Router } from "express";
import { Register } from "./controller/auth";

export const routes = (router :Router) => {
    router.post('/api/register' , Register)
}