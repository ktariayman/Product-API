import { Request , response, Response } from "express";
import { User } from "../entity/user";

export const permissionMiddleware = ( access: string ) => {
    return async (req: Request, res: Response , next :Function) => {
        const user: User = req['user']
        const permissions = user.role.permissions;
        if(req.method === 'GET'){
            if(!permissions.some(perm => (perm.name ===`view_${access}` ||(perm.name === `edit_${access}`)))){
                return res.send({
                    message:'unauthorized',
                })
        }
        }else{
            if(!permissions.some(perm => (perm.name === `edit_${access}`))){
                return res.send({
                    message:'unauthorized',
                })  
            }
        }
    next();

    }}