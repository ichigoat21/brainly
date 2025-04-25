"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    yield server_1.default.userModel.create({
        username: username,
        password: password
    });
    res.json({
        message: "you are signed in"
    });
}));
app.get("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield server_1.default.userModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_PASS);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            "message": "incorrect credenti"
        });
    }
}));
app.post("/api/v1/contents", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const title = req.body.title;
    const content = yield server_1.default.contentModel.create({
        link: link,
        title: title,
        userId: req.userId,
        tags: []
    });
    res.json({
        "message": "content added"
    });
}));
app.get("/api/v1/contents", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield server_1.default.contentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.post("/api/v1/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield server_1.default.contentModel.deleteMany({
        contentId,
        userId: req.userId
    });
}));
app.post("/api/v1/share", (req, res) => {
    res.json({
        message: "share endpoint"
    });
});
app.listen(3000, () => { console.log("server started"); });
