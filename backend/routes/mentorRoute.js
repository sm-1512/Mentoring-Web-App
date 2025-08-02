import express from "express";
import { mentorList, loginMentor, sessionsMentor, sessionCancel, sessionComplete, mentorDashboard, mentorProfile, updateMentorProfile, uploadBlogs, getMentorBlogs, updateBlog, deleteBlog, getSingleBlog } from "../controllers/mentorController.js";
import authMentor from "../middlewares/authMentor.js";
import upload from "../middlewares/multer.js"
const mentorRouter = express.Router();

mentorRouter.get('/list', mentorList);
mentorRouter.post('/login', loginMentor);
mentorRouter.get('/sessions', authMentor, sessionsMentor);
mentorRouter.post('/cancel-session', authMentor, sessionCancel);
mentorRouter.post('/complete-session', authMentor, sessionComplete);
mentorRouter.get('/mentor-dashboard', authMentor, mentorDashboard);
mentorRouter.get('/profile', authMentor, mentorProfile);
mentorRouter.post('/update-profile', authMentor, updateMentorProfile);
mentorRouter.post('/add-blogs', authMentor, upload.single('coverImage') ,uploadBlogs);
mentorRouter.get('/my-blogs', authMentor, getMentorBlogs);
mentorRouter.patch('/update-blog/:id', authMentor, updateBlog);
mentorRouter.delete('/delete-blog/:id', authMentor, deleteBlog);
mentorRouter.get('/blogs/:id', authMentor, getSingleBlog);

export default mentorRouter;