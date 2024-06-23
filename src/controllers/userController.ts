import express,{Request,Response} from 'express';
import UserModel from "../model/UserModel";
const userRouter = express.Router();

//create user
userRouter.post("/users",async (req:Request, res:Response) => {
  const {username,email,password,phone} = req.body;
  const user = new UserModel();
  user.username = username;
  user.email = email;
  user.password = password;
  user.phone = phone;

  await user.save();

  res.send("User Created.");
});

//export
export default userRouter;