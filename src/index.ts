import express, { Request, Response } from "express";
import models from "./server"
import jwt from "jsonwebtoken";
import { JWT_PASS } from "./config";
import { CustomRequest } from "./interface";
const app = express();

app.use(express.json());


app.post("/api/v1/signup", async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    await models.userModel.create({
        username : username,
        password : password
    })
     res.json({
      message: "you are signed in"
     })
})

app.get("/api/v1/signin", async (req: Request, res: Response) => {
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

app.post("/api/v1/contents", async (req: CustomRequest, res: Response) => {
    const link = req.body.link;
    const title = req.body.title;

    const content = await models.contentModel.create({
        link : link,
        title : title,
        userId : req.userId,
        tags : []
    })
    res.json({
        "message" : "content added"
    })
})
app.get("/api/v1/contents", async (req:  CustomRequest, res: Response) => {
    const userId = req.userId;
    const content = await models.contentModel.find({
        userId : userId
    }).populate("userId", "username");
    res.json({
        content
    });
})


app.post("/api/v1/delete", async (req: CustomRequest, res: Response) => {
    const contentId = req.body.contentId;

    await models.contentModel.deleteMany({
        contentId,
        userId : req.userId
    })
})

app.post("/api/v1/share", (req: Request, res: Response) => {
    res.json({
     message: "share endpoint"
    })
})

app.listen(3000, () => {console.log("server started")});