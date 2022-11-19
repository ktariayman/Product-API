import { Request, Response } from "express";
import { getManager, Repository } from "typeorm";
import { Permission } from "../entity/Permission";

export const Permissions = async (req:Request, res:Response) => {
    const repository = getManager().getRepository(Permission)
    const permissions = await repository.find()
    res.send(permissions)
}    