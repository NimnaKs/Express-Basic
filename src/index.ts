import express,{Request,Response} from 'express';
import userRouter from './controllers/userController';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from 'cors';

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors())

app.get("/", (req:Request, res:Response) => {
  res.send('Application is running.');
});

mongoose.connect('mongodb://localhost:27017/sampleDB');

app.use("/api",userRouter);

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});