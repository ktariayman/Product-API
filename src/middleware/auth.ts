import { Request , Response } from "express";
import { verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { User } from "../entity/user";
import jsonwebtoken from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response , next :Function) => {
   try {
    const jwt = req.cookies['jwt'];
    console.log(jwt)
    const payload: any= verify(jwt ,"secret")
    console.log(payload)
    if(!payload) {
        return res.status(401).send({message: 'unauthenticated'});
    }
    const repository = getManager().getRepository(User)
    console.log(repository)
    const user = await repository.findOne({
        where: {
          id: payload.id,
        },
      });
      console.log(user)
    if(!user){
        return res.status(401).send({message: 'user not found'});
    }
    // const {password, ...userWithoutPassword}= user
    req["user"] = user;
    next()
   } catch (error) {
        return res.status(401).send({
            message: 'user not found',
        })
   }
}