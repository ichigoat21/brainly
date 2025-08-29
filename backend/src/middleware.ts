import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./config";
import { CustomRequest } from "./interface";


export const userMiddleware = (req : CustomRequest, res : Response, next : NextFunction) => {
       const header = req.headers["authorization"];
       try {
        const decoded = jwt.verify(header as string,JWT_SECRET_KEY) as {id : string};
        req.userId = decoded.id;
           next();
       } catch {
        res.status(403).json({
            "message" : "you are not logged in"
        })
       }

}