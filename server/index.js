import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserRouter } from './routes/user.js'
import cookieParser from "cookie-parser";
import  cors from 'cors'
dotenv.config();
const app = express();
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials:true
}))
app.use(express.json())
app.use('/auth', UserRouter)
app.use(cookieParser())


mongoose.connect("mongodb://127.0.0.1:27017/authent");

app.listen(4000, () => {
  console.log("server is coonected successfuly");
});
