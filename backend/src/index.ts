import express, { Request, Response } from "express";
import models from "./server"
import jwt from "jsonwebtoken";
import { JWT_PASS } from "./config";
import { CustomRequest } from "./interface";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors"
const app = express();


app.use(express.json());
app.use(cors());

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

app.post("/api/v1/signin", async (req: Request, res: Response) => {
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

app.post("/api/v1/contents", userMiddleware, async (req: CustomRequest, res: Response) => {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type

    const content = await models.contentModel.create({
        link : link,
        title : title,
        userId : req.userId,
        type : type,
        tags : []
    })
    res.json({
        "message" : "content added"
    })
})
app.get("/api/v1/contents", userMiddleware, async (req:  CustomRequest, res: Response) => {
    const userId = req.userId;
    const content = await models.contentModel.find({
        userId : userId
    }).populate("userId", "username");
    res.json({
        content
    });
})


app.post("/api/v1/delete", userMiddleware, async (req: CustomRequest, res: Response) => {
    const contentId = req.body.contentId;

    await models.contentModel.deleteMany({
        contentId,
        userId : req.userId
    })
})

app.get("/api/v1/share", async (req: Request, res: Response) => {
    const share = req.query.share;
    const userId = req.query.userId;
    if (share) {
      const hash = random(10);
      await models.linkModel.create({ userId, hash });
      res.json({ message: `share${hash}` });
    } else {
      await models.linkModel.deleteOne({ userId });
      res.json({ message: "unshared" });
    }
  });
  
app.get("api/v1/:sharelink", async (req: CustomRequest, res : Response)=>{
    const hash = req.params.hash
    const link = await models.linkModel.findOne({
        hash
    })
    if (!link) {
        res.status(411).json({
            "message" : "wrong link"
        })
        return;
    }
    const content = await models.contentModel.findOne({
        userId : link.userId
    })
    const user = await models.userModel.findOne({
        userId : link.userId
    })
    res.json({
        username : user?.username,
        content : content
    })
})

app.listen(3000, () => {console.log("server started")});