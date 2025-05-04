import { Router } from "express";
import { Request, Response } from "express";
import models from "../server"
import { JWT_PASS } from "../config";
import jwt from "jsonwebtoken";
const userRouter = Router()

userRouter.post("/signup", async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(models.userModel)
    await models.userModel.create({
        username : username,
        password : password
    })
     res.json({
      message: "you are signed in"
     })
})

userRouter.post("/signin", async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await models.userModel.findOne({
        username,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            id : existingUser._id
        }, JWT_PASS);
        res.json({
            token
        })
    } else {
        res.status(403).json({
            "message" : "incorrect credenti"
        })
    }
})
export default userRouter