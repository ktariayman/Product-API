import express, { Request , Response} from 'express';
import cors from "cors";
import { routes } from './routes';
const app = express();
app.use(express.json())
app.use(cors({
    origin :["http://localhost:3000"]
}))
routes(app)
app.listen(8000, ()=> {
    console.log('hello there and welcome , Port = 8000')
})
