import express,{Request,Response} from 'express';

const app = express();
const port = 8000;

app.get("/", (req:Request, res:Response) => {
  res.send('Application is running.');
});

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});