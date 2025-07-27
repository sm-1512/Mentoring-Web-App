import express from "express";
import { mentorList, loginMentor } from "../controllers/mentorController.js";

const mentorRouter = express.Router();

mentorRouter.get('/list', mentorList);
mentorRouter.post('/login', loginMentor);

export default mentorRouter;