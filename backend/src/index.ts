import express from "express";
import cors from "cors"
import userRouter from "./routes/userRouter";
import contentRouter from "./routes/ContentRouter";
const app = express();


app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRouter)
app.use('/api/v1/content', contentRouter)



app.listen(3000, () => {console.log("server started")});