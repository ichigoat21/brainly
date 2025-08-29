import { response, Router } from "express";
import { userMiddleware } from "../middleware";
import { CustomRequest } from "../interface";
import  {Response } from "express";
import  models  from "../server";
import { random } from "../utils";


const contentRouter = Router();

contentRouter.post("/add", userMiddleware, async (req: CustomRequest, res: Response) => {
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

contentRouter.get("/preview", userMiddleware, async (req:  CustomRequest, res: Response) => {
    const userId = req.userId;
    const content = await models.contentModel.find({
        userId : userId
    }).populate("userId", "username");
    res.json({
        content
    });
})
contentRouter.delete("/delete/:id", userMiddleware, async (req: CustomRequest, res: Response) => {
    const contentId = req.params.id;
    console.log(contentId)
      
    const Response = await models.contentModel.deleteOne({
        _id : contentId,
        userId : req.userId
    })
    console.log(Response)

    res.status(200).json({
        message : 'Item Deleted'
    })
})
contentRouter.post("/share", userMiddleware,  async (req : CustomRequest, res) => {
    const share = req.body.share;
    if (share) {
            const existingLink = await models.linkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            console.log(hash)
            await models.linkModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                message : "hello",
                hash : hash
            })
    } else {
        await models.linkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
});
contentRouter.get("/api/v1/:sharelink", async (req: CustomRequest, res : Response)=>{
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
export default contentRouter