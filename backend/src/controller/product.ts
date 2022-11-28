import { Request, Response } from "express";
import {getManager} from "typeorm"
import { Product } from "../entity/product";

export const getAllProducts= async (req:Request, res:Response) => {
    const take = 6;
    const page = parseInt(req.query.page as string ||'1')
    const repository = getManager().getRepository(Product)
    const [data , total] = await repository.findAndCount({
        take,
        skip:(page-1) *take,
    })
    res.send({
        data,
        meta:{
            total,
            page,
            last_page: Math.ceil(total/take),
        }
    })
}
export const createProduct = async (req:Request, res:Response) => {

    const repository = getManager().getRepository(Product)
    const product = await repository.save(req.body)
    res.send(product)
}

export const getProduct = async (req:Request, res:Response) => {
    const repository = getManager().getRepository(Product)
    const product = await repository.findOne({ 
        where: {id: parseInt(req.params.id, 10)}});
    if(!product){

        return res.status(404).send({
            message:`no product with this is ${req.params.id}`,
        })
    }   
    res.send(product)
}


export const updateProduct = async (req:Request, res:Response) => {
    const repository = getManager().getRepository(Product)
    const product = await repository.findOne(
        { 
            where: {id: parseInt(req.params.id, 10)}}
    );
    if(!product){
        return res.status(404).send({
            message:`no product with this is ${req.params.id}`,
        })
    }
    await repository.update(req.params.id,req.body)
    const updatedProduct =  await repository.findOne({
        where: {id: parseInt(req.params.id, 10)}
    });
    if(!updatedProduct){
        return res.status(404).send({
            message:`no product has been updated with this is ${req.params.id}`,
        })
    }

    res.send(updatedProduct)
}

export const deleteProduct = async (req:Request, res:Response) => {
    const repository = getManager().getRepository(Product)
    const product = await repository.findOne({where: {id: parseInt(req.params.id, 10)}});
    if(!product){
        return res.status(404).send({
            message:`no user with this is ${req.params.id}`,
        })
    }
    await repository.delete(req.params.id)
    res.send(null)
}