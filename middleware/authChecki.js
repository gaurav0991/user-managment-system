import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "./error.js";

const check = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      next(new AppError("Not Authorized", 401));
    }
  }
  if (!token) {
    return next(new AppError("Not Authorized", 401));
  }
};
export default check;
