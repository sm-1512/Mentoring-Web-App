import mentorModel from "../models/mentorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sessionModel from "../models/sessionModel.js";
import blogModel from "../models/blogModel.js"
import { v2 as cloudinary } from "cloudinary";

//API to change availability
const changeAvailablity = async(req, res) => {
    try {
        const {mentorId} = req.body;
        const mentorData = await mentorModel.findById(mentorId);
        await mentorModel.findByIdAndUpdate(mentorId, {available : !mentorData.available});
        res.json({success: true, message: 'Availability changed'});
    } catch (error) {
        console.error("Error in changing availability", error);
        return res.json({ success: false, message: "Server error: " + error.message });
    }
}

//API to get list of all mentors for frontend
const mentorList = async(req, res) => {
    try {
        const mentors = await mentorModel.find({}).select(['-password', '-email']);

        res.json({success: true, mentors});
    } catch (error) {
        console.error("Error in getting mentor list", error);
        return res.json({ success: false, message: "Server error: " + error.message });
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
        console.error("Mentor Login Error:", error);
        return res.json({ success: false, message: "Server error: " + error.message });
    }
};

// API to get mentor sessiosn for mentor panel
const sessionsMentor = async(req, res) => {
    try {
        const mentorId = req.mentor.id;
        const sessions = await sessionModel.find({mentorId});
        res.json({success:true, sessions});
    } catch (error) {
        console.error("Error in getting mentor session", error);
        return res.json({ success: false, message: "Server error: " + error.message });
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
        console.error("Error in cancelling session", error);
        return res.json({ success: false, message: "Server error: " + error.message });
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
        console.error("Error in marking session complete", error);
        return res.json({ success: false, message: "Server error: " + error.message });
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
            if(item.payment && !item.isCompleted){
                earnings -= item.amount;
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
        console.error("Error in getting dashboard data", error);
        return res.json({ success: false, message: "Server error: " + error.message });
    }
}

//API to get mentor profile for mentor icon
const mentorProfile = async(req, res) => {
    
    try {
        const mentorId = req.mentor.id;
        const profileData = await mentorModel.findById(mentorId).select("-password");
        res.json({success:true, profileData});
        
    } catch (error) {
        console.error("Error in getting mentor profile", error);
        return res.json({ success: false, message: "Server error: " + error.message });
    }
}

//API to update mentor profile data
const updateMentorProfile = async(req, res) => {
    try {
        const mentorId = req.mentor.id;
        const {name, currentCompany, fees, available, about} = req.body;
        await mentorModel.findByIdAndUpdate(mentorId, {name, currentCompany, fees, available, about});
        res.json({ success: true, message: 'Profile Updated' })
    } catch (error) {
        console.error("Error in updating mentor profile:", error);
        return res.json({ success: false, message: "Server error: " + error.message });
    }
    

}

//API to upload blogs
const uploadBlogs = async (req, res) => {
    try {
        const mentorId = req.mentor?.id;
        const { title, body } = req.body;
        const imageFile = req.file;

        // Basic validations
        if (!mentorId) {
            return res.json({ success: false, message: "Unauthorized: Mentor ID not found." });
        }

        if (!title || !body) {
            return res.json({ success: false, message: "Missing title or body." });
        }

        if (!imageFile) {
            return res.json({ success: false, message: "Cover image is required." });
        }

        // Upload to Cloudinary
        let imageUrl;
        try {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
                folder: "blogs/covers",
            });
            imageUrl = imageUpload.secure_url;
        } catch (uploadErr) {
            console.error("Cloudinary Upload Failed:", uploadErr);
            return res.status(500).json({ success: false, message: "Image upload failed." });
        }

        // Create new blog
        const newBlog = new blogModel({
            title,
            body,
            coverImage: imageUrl,
            createdBy: mentorId, 
        });

        await newBlog.save();

        return res.json({ success: true, message: "Blog added successfully." });

    } catch (error) {
        console.error("Blog Upload Error:", error);
        return res.json({ success: false, message: "Server error: " + error.message });
    }
};

//API to view mentor blogs when they log in
const getMentorBlogs = async (req, res) => {
    try {
        const mentorId = req.mentor.id;
        const blogs = await blogModel.find({createdBy: mentorId}).populate("createdBy", "-password");
        return res.json({success:true, blogs});
    } catch (error) {
        console.error("Blog Retrieval Error:", error);
        return res.json({ success: false, message: "Server error: " + error.message });
    }
}

//API to get individual blog
const getSingleBlog = async (req, res) => {
  try {
    const mentorId = req.mentor.id;
    const blog = await blogModel.findById(req.params.id);

    //Making sure that blog is written by the mentor
    if(blog.createdBy.toString() !== mentorId) {
        return res.json({success: false, message:"Unauthorised"});
    }

    if(!blog) {
        return res.json({success: false, message:"Blog Not Found"});
    } else {
      return res.json({success: true, blog});
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

//API to edit blogs
const updateBlog = async(req, res) => {
    try {
        const mentorId = req.mentor.id;
        const blog = await blogModel.findById(req.params.id);
        if(!blog) {
            return res.json({success: false, message:"Blog Not Found"});
        }

        //Making sure that blog is written by the mentor
        if(blog.createdBy.toString() !== mentorId) {
            return res.json({success: false, message:"Unauthorised"});
        }

        const {title, body, coverImage} = req.body;

        if(!title || !body || !coverImage) return res.json({success:false, message:"All fields are required"})
        blog.title = title;
        blog.body = body;
        blog.coverImage = coverImage;

        await blog.save();
        return res.json({success: true, message: "Blog updated", blog});

    } catch (error) {
        console.error("Blog Update Error:", error);
        return res.json({ success: false, message: "Server error: " + error.message });
    }
}

//API to delete blogs
const deleteBlog = async(req, res) => {
    try {
        const mentorId = req.mentor.id;
        const blog = await blogModel.findById(req.params.id);

        if(!blog) {
            return res.json({success: false, message:"Blog Not Found"});
        }

        //Making sure that blog is written by the mentor
        if(blog.createdBy.toString() !== mentorId) {
            return res.json({success: false, message:"Unauthorised"});
        }

        await blog.deleteOne();
        res.json({ success: true, message: "Blog deleted successfully" });

    } catch (error) {
        console.error("Blog Delete Error:", error);
        return res.json({ success: false, message: "Server error: " + error.message });
    }
}

export {
    changeAvailablity, 
    mentorList, 
    loginMentor, 
    sessionsMentor, 
    sessionCancel, 
    sessionComplete, 
    mentorDashboard, 
    mentorProfile, 
    updateMentorProfile,
    uploadBlogs,
    getMentorBlogs,
    updateBlog,
    deleteBlog, 
    getSingleBlog,
}
