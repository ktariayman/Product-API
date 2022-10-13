import express, { Request , Response} from 'express';
import cors from "cors";
import { routes } from './routes';
import { createConnection } from "typeorm"

createConnection()
    .then((Connection) => {
        const app = express();
        app.use(express.json())
        app.use(cors({
            credentials :true, // for exemple front end can get the cookies
            origin :["http://localhost:3000"]
        }))
        routes(app)
        app.listen(8000, ()=> {
            console.log('hello there and welcome , Port = 8000')
        })    })
    .catch((error) => console.log(error))

