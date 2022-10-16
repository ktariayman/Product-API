import { Request, Response } from "express";
import {getManager} from "typeorm"
import { Product } from "../entity/product";

export const getAllProducts= async (req:Request, res:Response) => {
    const repository = getManager().getRepository(Product)
    const products = await repository.find()
    res.send(products)
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