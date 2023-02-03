import {Router} from "express";
import {blogRouter} from "./blog-router";
import {userRouter} from "./user-router";


export const router = Router();
router.use('/blogs', blogRouter);
router.use('/auth', userRouter);
