import { Request, Response } from "express";
import {getManager} from "typeorm"
import { User } from "../entity/user";
import bcryptjs from "bcryptjs";

export const getAllUsers = async (req:Request, res:Response) => {
    const repository = getManager().getRepository(User)
    const users = await repository.find()
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

    const user = await repository.save({
        ...body,
        password:hashedpassword,
    })
    const {password , ...userWithoutPassword} = user
    res.send(userWithoutPassword)
}

export const getUser = async (req:Request, res:Response) => {
    const repository = getManager().getRepository(User)
    const user = await repository.findOne(    {where: {id: parseInt(req.params.id, 10)}});
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
    const user = await repository.findOne({where: {id: parseInt(req.params.id, 10)}});
    if(!user){
        return res.status(404).send({
            message:`no user with this is ${req.params.id}`,
        })
    }
    await repository.update(req.params.id,body)
    const updatedUser =  await repository.findOne({where: {id: parseInt(req.params.id, 10)}});
    res.send(updatedUser)
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