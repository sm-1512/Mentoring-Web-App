import express from "express";
import { addMentor, allMentors, loginAdmin, sessionsAdmin, sessionCancel, adminDashboard  } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js"
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/mentorController.js";


const adminRouter = express.Router();

adminRouter.post('/add-mentor', authAdmin, upload.single('image') ,addMentor);
adminRouter.post('/login',loginAdmin);
adminRouter.get('/all-mentors', authAdmin, allMentors); //Get to Post
adminRouter.post('/change-availability', authAdmin, changeAvailablity);
adminRouter.get('/sessions', authAdmin, sessionsAdmin);
adminRouter.post('/cancel-session', authAdmin, sessionCancel);
adminRouter.get('/dashboard', authAdmin, adminDashboard);




export default adminRouter;