import { Request, Response } from "express";
import { RegisterValidation } from "../validation/registerValidation";
import {getManager} from "typeorm"
import { User } from "../entity/user";
import bcryptjs from "bcryptjs";
import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;

export const Register = async (req:Request, res:Response) => {
    const body = req.body;
    const {error} = RegisterValidation.validate(body)
    if(error){
        return res.status(404).send(error.details);
    }
    if(body.password !== body.password_confirm){
        return res.status(404).send({
            message:"password does not match"
        });
    }
    const repository = getManager().getRepository(User)
    const {password , ...user} = await repository.save({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password : await bcryptjs.hash(body.password , 10)
    })
    res.send(user);
}

export const Login = async (req:Request, res:Response) => {
    const repository = getManager().getRepository(User)
    const user =  await repository.findOne(
        { where:
            { email: req.body.email }
        }
    )
    if(!user){

        return res.status(404).send({
            message:"invalid credentials",
        })
    }
    const samePassword = await bcryptjs.compare( req.body.password,user.password)
    if(!samePassword){
        return res.status(404).send({
            message:"invalid credentials",
        })
    }
    const payload = {
        id : user.id,
    }
    const token = sign(payload , "secret");
    res.cookie('jwt' , token , {
        httpOnly: true,
        maxAge: 30*24*60*60*3600 // 30days
    })
    const {password , ...userWithoutPassword}= user
    res.send("success" )
}

export const authenticatedUser = async (req:Request, res:Response) => {
    const jwt = req.cookies['jwt'];
    const payload: any= verify(jwt , "secret")
    if(!payload) {
        return res.status(401).send({message: 'unauthenticated'});
    }
    const repository = getManager().getRepository(User)
    const user = await repository.findOne(
        { where:
            payload.id
        }
    )
    if(!user){
        return res.status(401).send({message: 'user not found'});

    }
    const {password, ...userWithoutPassword}= user
    
    res.send(userWithoutPassword)
}