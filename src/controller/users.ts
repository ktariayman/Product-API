import { Request, Response } from "express";
import {getManager} from "typeorm"
import { User } from "../entity/user";
import bcryptjs from "bcryptjs";

export const getAllUsers = async (req:Request, res:Response) => {
    const repository = getManager().getRepository(User)
    const users = await repository.find({
        relations :["role"]
    })
    const usersWithourPassword = users.map(u => {
        const {password , ...data} = u
        return data
    })
    res.send(usersWithourPassword)
}
export const createUser = async (req:Request, res:Response) => {
    const {role_id , ...body} = req.body 

    const hashedpassword = await bcryptjs.hash("1234" , 10)

    const repository = getManager().getRepository(User)
    const userExist =  await repository.findOne(
        {where:
            { email: req.body.email }
        }
    )
    if(userExist){
        return res.status(404).send({
            message:"user already exists",
        })
    }
    const user = await repository.save({
        ...body,
        password:hashedpassword,
        role: {
            id:role_id,
        }
    })
    const {password , ...userWithoutPassword} = user
    res.send(userWithoutPassword)
}

export const getUser = async (req:Request, res:Response) => {
    const repository = getManager().getRepository(User)
    const user = await repository.findOne({ 
        relations: ['role'],
        where: {id: parseInt(req.params.id, 10)}});
    if(!user){

        return res.status(404).send({
            message:`no user with this is ${req.params.id}`,
        })
    }   
    const {password , ...userWithoutPassword} = user
    res.send(userWithoutPassword)
}


export const updateUser = async (req:Request, res:Response) => {
    const {role_id , ...body} = req.body 
    const repository = getManager().getRepository(User)
    const user = await repository.findOne(
        { 
            relations: ['role'],
            where: {id: parseInt(req.params.id, 10)}}
    );
    if(!user){
        return res.status(404).send({
            message:`no user with this is ${req.params.id}`,
        })
    }
    await repository.update(req.params.id,{
        ...body,
        role:{
            id: role_id,
        }
    })
    const updatedUser =  await repository.findOne(
        { 
            relations: {
            role    :true ,
        },
            where: {id: parseInt(req.params.id, 10)}}
    );
    if(!updatedUser){
        return res.status(404).send({
            message:`no user has been updated with this is ${req.params.id}`,
        })
    }
    const {password , ...userWithoutPassword} = updatedUser

    res.send(userWithoutPassword)
}







export const deleteUser = async (req:Request, res:Response) => {
    const repository = getManager().getRepository(User)
    const user = await repository.findOne({where: {id: parseInt(req.params.id, 10)}});
    if(!user){
        return res.status(404).send({
            message:`no user with this is ${req.params.id}`,
        })
    }
    await repository.delete(req.params.id)
    res.send(null)
}