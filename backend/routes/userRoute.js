import express from "express";
import { bookSession, getProfile, loginUser, registerUser, updateProfile, listSession, cancelSession, paymentRazorpay, verifyRazorpay, blogsList, getSingleBlog } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/book-session', authUser, bookSession);
userRouter.get('/sessions', authUser, listSession);
userRouter.post('/cancel-session', authUser, cancelSession);
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
userRouter.post('/verifyRazorpay', authUser, verifyRazorpay)
userRouter.get('/blogs', blogsList);
userRouter.get('/blogs/:id', getSingleBlog);













export default userRouter;