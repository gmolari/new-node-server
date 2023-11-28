import express from "express";
import { create, login } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post('/create', create)
userRouter.post('/login', login)

export default userRouter