import { Request, Response } from "express";
import {getManager} from "typeorm"
import { Order } from "../entity/order";

export const getAllOrders= async (req:Request, res:Response) => {
    const take = 12;
    const page = parseInt(req.query.page as string ||'1')
    const repository = getManager().getRepository(Order)
    const [data , total] = await repository.findAndCount({
        take,
        skip:(page-1) *take,
        relations : ['order_items']
    })
    res.send({
        data : data.map((order: Order) => ({
            id:order.id,
            name: order.name,
            email: order.email,
            total: order.total,
            created_at: order.created_at,
            order_items: order.order_items
        })),
        meta:{
            total,
            page,
            last_page: Math.ceil(total/take),
        }
    })
}



    