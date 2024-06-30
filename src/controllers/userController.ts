import express,{Request,Response} from 'express';
import UserModel from "../model/UserModel";
import bcrypt from 'bcryptjs';
import {generateJWt} from "../auth/auth";

const userRouter = express.Router();

//create user
userRouter.post("/users/register",async (req:Request, res:Response) => {
  const {username,email,password,phone} = req.body;
  const user = new UserModel();
  user.username = username;
  user.email = email;
  user.password = await bcrypt.hash(password,10);
  user.phone = phone;

  await user.save();

  res.send({
        id: user.id,
        password: user.password
  });
});

//log user
userRouter.post("/users/login",async (req:Request, res:Response) => {
  const {email,password} = req.body;
  const user = await UserModel.findOne({email:email});

  if (!user){
    return res.status(404).send({error: "User not found"});
  }

  const isPasswordValid = await bcrypt.compare(password,user.password);

  if (!isPasswordValid){
    return res.status(401).send({error: "Invalid credentials"});
  }

  const token = generateJWt({
    id:user.id.toString(),
    email: user.email
  });

  res.send({
    token
  });
});



//export
export default userRouter;