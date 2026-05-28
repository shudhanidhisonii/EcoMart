import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


// ================= AUTH MIDDLEWARE =================

export const isAuthenticated = async (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({
        success: false,
        message: "Token missing"
      });

    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    const user = await User.findById(decoded.id)
      .select("-password");

    if (!user) {

      return res.status(401).json({
        success: false,
        message: "User not found"
      });

    }

    req.user = user;
req.id = user._id;
    next();

  } catch (e) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });

  }

};


// ================= ADMIN MIDDLEWARE =================

export const isAdmin = (req, res, next) => {

  if (
    req.user &&
    req.user.role === "admin"
  ) {

    next();

  } else {

    return res.status(403).json({
      success: false,
      message: "Access denied: admins only"
    });

  }

};