import express from "express";
import { create, login, get } from "../controller/userController.js";
import { verifyToken } from "../config/jwt.js";

const userRouter = express.Router();

userRouter.post('/create', create)
userRouter.post('/login', login)
userRouter.get('/get/:id', verifyToken, get)

export default userRouter