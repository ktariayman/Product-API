import { Request, Response } from "express";
import { RegisterValidation } from "../validation/registerValidation";

export const Register = (req:Request, res:Response) => {
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
    res.send(req.body);
}