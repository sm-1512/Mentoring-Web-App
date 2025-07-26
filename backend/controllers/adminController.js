import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import mentorModel from "../models/mentorModel.js";
import jwt from "jsonwebtoken";
import sessionModel from "../models/sessionModel.js";
import userModel from "../models/userModel.js";


//API for adding doctor
const addMentor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      college,
      graduationYear,
      currentCompany,
      branch,
      degree,
      fees,
      about,
    } = req.body; //We need these items from the request

    const imageFile = req.file;

    //We will send above data as a form data. We need a middleware for the image and hence we are using multer middleware for that.

    //checking for all data to add mentor
    if (
      !name ||
      !email ||
      !password ||
      !college ||
      !graduationYear ||
      !currentCompany ||
      !branch ||
      !degree ||
      !fees ||
      !about
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    //Validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please Enter Valid Email" });
    }

    //Validating Strong Password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter a Strong Password",
      });
    }

    //Hashing Mentor's Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    //Whatever data I get from response, I have saved it in mentorData and now this has to be stored in database.

    //This is how we are storing the mentor in the database.
    const newMentor = new mentorModel({
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      college,
      graduationYear,
      currentCompany,
      branch,
      degree,
      fees,
      about,
      date: Date.now(),
    });

    await newMentor.save();

    res.json({ success: true, message: "Mentor Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({ success: true, token }); //Sending success and token as a response
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get all mentors list for admin panel
const allMentors = async(req, res) => {
  try {
    const mentors = await mentorModel.find({}).select('-password');
    res.json({success:true, mentors});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

//API to get list of all sessions
const sessionsAdmin = async(req, res) => {
  try {
    const sessions = await sessionModel.find({});
    res.json({success:true, sessions});
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//API to cancel session from admin dashboard
const sessionCancel = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const sessionData = await sessionModel.findById(sessionId);

    await sessionModel.findByIdAndUpdate(sessionId, { cancelled: true });

    //Once cancelled we need to mentor slot
    const { mentorId, slotDate, slotTime } = sessionData;

    const mentorData = await mentorModel.findById(mentorId);
    let slots_booked = mentorData.slots_booked; //Accessing the array of booked slots for that date.
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    ); //Looping over each e and keeping only those that are not equal to the cancelled time.
    await mentorModel.findByIdAndUpdate(mentorId, { slots_booked });
    res.json({ success: true, message: "Session Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const mentors = await mentorModel.find({})
        const users = await userModel.find({})
        const sessions = await sessionModel.find({})

        const dashData = {
            mentors: mentors.length,
            sessions: sessions.length,
            students: users.length,
            latestSessions: sessions.reverse().slice(0,5),
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export { addMentor, loginAdmin, allMentors, sessionsAdmin, sessionCancel, adminDashboard }; 
