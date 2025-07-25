import jwt from "jsonwebtoken";

// Middleware to authenticate logged-in user
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided. Not Authorized." });
    }

    // Decode token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = {
      id: token_decode.id,
      email: token_decode.email,
      role: token_decode.role
    };

    next();
  } catch (error) {
    console.error("authUser error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authUser;
