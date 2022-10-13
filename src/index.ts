import express, { Request , Response} from 'express';
import cors from "cors";
const app = express();
app.use(express.json())
app.use(cors)
app.listen(8000, ()=> {
    console.log('hello there and welcome , Port = 8000')
})
app.get('/', (req:Request,res:Response) =>{
    res.send("hello world")
})
