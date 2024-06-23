import express,{Request,Response} from 'express';
const router = express.Router();

//create user
router.post("/users", (req:Request, res:Response) => {
  res.send("User Created.");
});

//export
export default router;