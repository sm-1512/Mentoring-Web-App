import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";



//API to register user
const registerUser = async (req, res) => {
  try {
    const {
      name,
      password,
      email,
      graduationYear,
      currentYear,
      branch,
      degree,
    } = req.body;

    //checking for all data to register user
    if (
      !name ||
      !password ||
      !email ||
      !graduationYear ||
      !currentYear ||
      !branch ||
      !degree
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    //checking for email validity using validator
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    //Duplicate email check
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already exists" });
    }

    //Validating password size
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password should be atleast 8 characters",
      });
    }

    //Hashing password using bcrypt
    const salt = await bcrypt.genSalt(10); //More rounds = more time
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      graduationYear,
      currentYear,
      branch,
      degree,
    });

    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.json({ success: false, message: error.message });
  }
};

//API to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found. Please sign up.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    //Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ success: true, token });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.json({ success: false, message: error.message });
  }
};

//API to get user profile data
const getProfile = async (req, res) => {
  try {
    const userId  = req.user.id;   //This id comes from the middleware
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log("Get Profile error", error)
    res.json({ success: false, message: error.message })
  }
};

// API to update user profile
const updateProfile = async(req, res) => {
  try {
    const userId = req.user.id;   //Id should come from middleware
    const {name, gender, branch, phone} = req.body;
    const imageFile = req.file;

    if (!name || !phone || !branch || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    const updateData = { name, gender, branch, phone };
    
     if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
      updateData.image = imageUpload.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, updateData);

    res.json({ success: true, message: 'Profile Updated' })
  } catch (error) {
    console.log("Update Profile error", error);
    res.json({ success: false, message: error.message });
  }
}


export { registerUser, loginUser, getProfile, updateProfile };
