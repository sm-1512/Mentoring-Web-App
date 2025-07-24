import jwt from "jsonwebtoken";

//This is where I do admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({ success: false, message: "Not Authorised: Try Again" });
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL || decoded.role !== "admin") {
      return res.json({ success: false, message: "Not Authorised: Try Again" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export default authAdmin;