// @ts-ignore
import {jwt} from "jsonwebtoken";
import {Request,Response,NextFunction} from "express";
import {User} from "../types/User";

const SECRET_KEY = "3t9Ekl5jyXp2RbFgQzWu8h6o0PdVaNx7ZsGcB1qMv4iYrHwD";

export const generateJWt = (user:User):string => {
    return jwt.sign({id: user.id, email: user.email}, SECRET_KEY, { expiresIn: '1h' });
}

//middleware to verify token
export const tokenValidate = (req:Request,res:Response,next:NextFunction):void =>{
    const token = req.header('Authorization')?.replace("Bearer ","");
    if (!token){
        res.status(401).send({error:"Unauthorized"});
    } else {
        // @ts-ignore
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send({error:"Unauthorized"});
            } else {
                /*req.user = decoded.user;*/
                next();
            }
        });
    }

}