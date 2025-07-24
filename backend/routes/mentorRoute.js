import express from "express";
import { mentorList } from "../controllers/mentorController.js";

const mentorRouter = express.Router();

mentorRouter.get('/list', mentorList);

export default mentorRouter;