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

// API to get doctor sessiosn for mentor panel
const sessionsMentor = async(req, res) => {
    try {
        const mentorId = req.mentor.id;
        const sessions = await sessionModel.find({mentorId});
        res.json({success:true, sessions});
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to enable mentor to cancel sessions
const sessionCancel = async (req, res) => {
    try {
        const mentorId = req.mentor.id; //Coming from middleware
        const {sessionId} = req.body; //Coming from frontend
        const sessionData = await sessionModel.findById(sessionId);
        if(sessionData && sessionData.mentorId === mentorId){
            await sessionModel.findByIdAndUpdate(sessionId, {cancelled: true});
            return res.json({success:true, message:"Session Cancelled"});
        }
        res.json({success: false, message:"Cancellation Failed"});


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }  
}


//API for mentor to mark the session completed
const sessionComplete = async(req, res) => {
    try {
        const mentorId = req.mentor.id; //This is coming from middleware 
        const {sessionId} = req.body;  //This is coming from frontend
        const sessionData = await sessionModel.findById(sessionId);
        if(sessionData && sessionData.mentorId === mentorId){
            await sessionModel.findByIdAndUpdate(sessionId, {isCompleted: true});
            return res.json({success:true, message:"Session Completed"});
        } else {
            return res.json({success:false, message:"Mark Failed"});
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    
}

//API to get dashboard data for mentor
const mentorDashboard = async (req, res) => {
    try {
        const mentorId = req.mentor.id;
        const sessions = await sessionModel.find({mentorId});
        let earnings = 0;
        sessions.map((item) => {
            if(item.isCompleted || item.payment){
                earnings += item.amount;
            }
        })

        let students = [];

        sessions.map((item) => {
            if(!students.includes(item.userId)){
                students.push(item.userId);
            }
        })

        const dashData = {
            earnings,
            sessions : sessions.length,
            students : students.length,
            latestSessions: sessions.reverse().slice(0,5)
        }
        
        res.json({success: true, dashData});
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



export {changeAvailablity, mentorList, loginMentor, sessionsMentor, sessionCancel, sessionComplete, mentorDashboard}