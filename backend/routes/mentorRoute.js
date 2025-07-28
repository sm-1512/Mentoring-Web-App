import express from "express";
import { mentorList, loginMentor, sessionsMentor, sessionCancel, sessionComplete } from "../controllers/mentorController.js";
import authMentor from "../middlewares/authMentor.js";
const mentorRouter = express.Router();

mentorRouter.get('/list', mentorList);
mentorRouter.post('/login', loginMentor);
mentorRouter.get('/sessions', authMentor, sessionsMentor);
mentorRouter.post('/cancel-session', authMentor, sessionCancel);
mentorRouter.post('/complete-session', authMentor, sessionComplete);

export default mentorRouter;