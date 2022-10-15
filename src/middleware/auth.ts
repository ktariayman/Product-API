import { Request , Response } from "express";
import { verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { User } from "../entity/user";
import jsonwebtoken from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response , next :Function) => {
   try {
    const jwt = req.cookies['jwt'];
    const payload: any= verify(jwt ,String(process.env.SECRET_KEY));
    if(!payload) {
      return res.status(401).send({message: 'unauthenticated'});
    }
    const repository = getManager().getRepository(User)
    const user = await repository.findOne({where: {id: payload.id}});
    if(!user){
      return res.status(401).send({message: 'user not found'});
    }
    req["user"] = user;
    next()
   } catch (error) {
        return res.status(401).send({
            message: 'user not found',
        })
   }
}