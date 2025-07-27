import mentorModel from "../models/mentorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sessionModel from "../models/sessionModel.js";


const changeAvailablity = async(req, res) => {
    try {
        const {mentorId} = req.body;
        const mentorData = await mentorModel.findById(mentorId);
        await mentorModel.findByIdAndUpdate(mentorId, {available : !mentorData.available});
        res.json({success: true, message: 'Availability changed'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const mentorList = async(req, res) => {
    try {
        const mentors = await mentorModel.find({}).select(['-password', '-email']);

        res.json({success: true, mentors});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//API for mentor login 
const loginMentor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        const mentor = await mentorModel.findOne({ email });

        if (!mentor) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, mentor.password);

        if (isMatch) {
            const token = jwt.sign({ id: mentor._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};




export {changeAvailablity, mentorList, loginMentor}