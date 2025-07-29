import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import mentorModel from "../models/mentorModel.js";
import sessionModel from "../models/sessionModel.js";
import razorpay from "razorpay";

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
    const userId = req.user.id; //This id comes from the middleware
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log("Get Profile error", error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; //Id should come from middleware
    const { name, gender, branch, phone } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !branch || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    const updateData = { name, gender, branch, phone };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, updateData);

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log("Update Profile error", error);
    res.json({ success: false, message: error.message });
  }
};

// API to book Session
const bookSession = async (req, res) => {
  try {
    const userId = req.user.id; //Id should come from authUser middleware

    const { slotDate, slotTime, mentorId } = req.body;
    const mentorData = await mentorModel.findById(mentorId).select("-password");

    if (!mentorData.available) {
      return res.json({ success: false, message: "Mentor Not Available" });
    }

    let slots_booked = mentorData.slots_booked;
    //Checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not Available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    const sessionData = {
      userId,
      mentorId,
      userData,
      mentorData,
      amount: mentorData.fees, //This connects the amount of session to fees of mentor
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newSession = new sessionModel(sessionData);
    await newSession.save();

    // save new slots data in docData
    await mentorModel.findByIdAndUpdate(mentorId, { slots_booked });
    res.json({ success: true, message: "Session Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get all session to show on the frontend page
const listSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessions = await sessionModel.find({ userId });
    res.json({ success: true, sessions });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const cancelSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sessionId } = req.body;
    const sessionData = await sessionModel.findById(sessionId);

    //Verify session user
    if (sessionData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

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

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//API to make payment of session using razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const sessionData = await sessionModel.findById(sessionId);
    if (!sessionData || sessionData.cancelled) {
      return res.json({
        success: false,
        message: "Session cancelled or not found",
      });
    }

    //Creating options for razorpay payements
    const options = {
      amount: sessionData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: sessionId,
    };

    // Creating an order using razorpay
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    //console.log(orderInfo);
    
    //This status is coming from RazorPay's API response when we fetch an order.
    //In receipt we had passed the order id and so we are using that to mark payment status true
    if (orderInfo.status === "paid") {
      await sessionModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookSession,
  listSession,
  cancelSession,
  paymentRazorpay,
  verifyRazorpay,
};
