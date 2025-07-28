import jwt from "jsonwebtoken"

// Middleware to authenticate logged-in mentor
const authMentor = async(req, res, next) => {


    try {
        const {mtoken} = req.headers; //mtoken here is case sensitive. so mToken will not work as node js backend converts everything to lowercase.
        if(!mtoken){
        //console.log("Headers Not Received:", req.headers);
        return res.json({success: false, message: "Not Authorised: Login Again"});
        }

        //console.log("Headers Received:", req.headers);

        //Decode Token
        const token_decode = jwt.verify(mtoken, process.env.JWT_SECRET);
        req.mentor = {
            id: token_decode.id,
            email: token_decode.email,
            role: token_decode.role
        };
        //Earlier I was using: req.body.mentorId = token_decode.id;
        //This is dangerous because: req.body is meant to carry user input, not internal server-verified data.
        //A user could send a fake mentorId in the request body and override it before middleware is even run.
        next();
    } catch (error) {
        console.error("authUser error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
}

export default authMentor;




//For Understanding
/* eg: In Controller
const changeAvailability = async (req, res) => {
  console.log(req.body.mentorId);  // ← This came from the user
  //This could be manipulated
}

Middleware: authMentor

const token_decode = jwt.verify(mToken, process.env.JWT_SECRET);
req.mentor = {
  id: token_decode.id,
  email: token_decode.email,
  role: token_decode.role
};
Controller:

const changeAvailability = async (req, res) => {
  console.log(req.mentor.id);  // ← This came from your server's decoded token
  // 🔐 Safe and trusted


Why req.mentor is Secure?
It is created only inside your middleware after verifying the JWT token with your secret key.

If the token is tampered with, jwt.verify() will throw an error and the request will be rejected. */


