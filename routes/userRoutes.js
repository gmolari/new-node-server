import express from "express";
import { create } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post('/create', create)

export default userRouter