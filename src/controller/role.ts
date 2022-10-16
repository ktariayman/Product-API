import { Request, Response } from "express";
import { getManager, Repository } from "typeorm";
import { Role } from "../entity/role";

export const getAllRoles = async (req:Request, res:Response) => {
    const repository = getManager().getRepository(Role)
    const roles = await repository.find()
    res.send(roles)
}   

export const getRole = async (req:Request, res:Response) => {
    const repository = getManager().getRepository(Role)
    const role = await repository.findOne({ 
        relations: ['permissions'],
        where: {id: parseInt(req.params.id, 10)}
    });
    res.send(role)

}    

export const createRole = async (req:Request, res:Response) => {
    const {name , permissions} = req.body
    const repository = getManager().getRepository(Role)
    const role = await repository.save({
        name , 
        permissions:permissions.map((id:any) => ({id}))
    })
    res.send(role)
}    

export const updateRole = async (req:Request, res:Response) => {
    const {name , permissions} = req.body
    const repository = getManager().getRepository(Role)
    const roleExist = await repository.findOne(
        { 
            relations: ['permissions'],
            where: {id: parseInt(req.params.id, 10)}}
    );
    if(!roleExist){
        return res.status(404).send({
            message:`no role with this is ${req.params.id}`,
        })
    }
    const role = await repository.save({
        id: parseInt(req.params.id),
        name , 
        permissions:permissions.map((id:any) => ({id}))
    })    
    res.send(role)
}    

export const deleteRole = async (req:Request, res:Response) => {
    const {name , permissions} = req.body
    const repository = getManager().getRepository(Role)
    const role = await repository.findOne({where: 
        {id: parseInt(req.params.id, 10)}});
    if(!role){
        return res.status(404).send({
            message:`no role with this is ${req.params.id}`,
        })
    }
    await repository.delete(req.params.id)
    res.send(null)
}
