import { Request, response, Response } from "express";
import { RegisterValidation } from "../validation/registerValidation";
import {getManager} from "typeorm"
import { User } from "../entity/user";
import bcryptjs from "bcryptjs";
import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;
import dotenv from 'dotenv';
dotenv.config()

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
    const token = sign({id : user.id} ,String(process.env.SECRET_KEY));
    res.cookie('jwt' , token , {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 
    })
    const {password , ...userWithoutPassword}= user
    res.send(userWithoutPassword )
}

export const authenticatedUser = async (req:Request, res:Response) => {
    const {password , ...user} = req['user']
    res.send(user)
}


export const logout = async (req:Request, res:Response) => {
    res.cookie('jwt', '' , {maxAge: 0})
    
        return res.send({
            message: 'success logout'
        })
    
}


export const UpdateInfo = async (req:Request, res:Response) => {
    const user= req['user']
    if(req.body.email || req.body.password || req.body.paddword_confirm) {
        return res.status(400).send({
            message : "you can't update these info(s) now , please contact admin"
        })
    }
    // const bodyData= req.body
    // const {email , ...bodyDataWithoutEmail} = bodyData
    const repository = getManager().getRepository(User)
    await repository.update(user.id , req.body)
    const data  =  await repository.findOne(
        { where:
            { id: user.id }
        })
    if(!data) {
        return res.status(404).send({
            message:"invalid credentials",
        })
    }
    const {password , ...userWithoutPassword} =data;
    res.send(userWithoutPassword)    
}
export const UpdatePassword = async (req:Request, res:Response) => {
    const user= req['user']
    if(req.body.password !== req.body.password_confirm){
        return res.status(404).send({
            message : "Password do not match",
        })
    }
    const repository = getManager().getRepository(User)
    const hashedPassword  = await bcryptjs.hash(req.body.password , 10)
    await repository.update(user.id , {
        password : hashedPassword
    })
    const {password , ...userWithoutPassword} = user;
    res.send(userWithoutPassword)
}