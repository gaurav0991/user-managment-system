import AppError from "../middleware/error.js";
import User from "../models/userModel.js";
import generate from "../tokenGenerateFunc.js";
//@endpoint api/v1/auth/login
//desc auth user
//method POST
const authSign = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select("+password");
    if (user && (await user.matchPassword(password))) {
      res.json({ user, token: generate(user._id) });
    } else {
      return next(new AppError("Invalid Email or password", 404));
    }
  } catch (e) {
    return next(new AppError("Error from user", 500));
  }
};
//@endpoint api/v1/auth/profile
//desc get user profile
//method GET
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({ user });
    } else {
      return next(AppError("User not found", 401));
    }
  } catch (e) {
    return next(AppError(e.message, 500));
  }
};

//@endpoint api/v1/auth/register
//desc register user
//method POST
const registerUser = async (req, res, next) => {
  try {
    const { email, password, name, isManager } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return next(new AppError("User already exists", 409));
    }
    const data = await User.create({ email, password, name, isManager });
    return res.json({ data, token: generate(data._id) });
  } catch (error) {
    return next(new AppError("Server Error", 500));
  }
};

//@endpoint api/v1/auth/update
//desc update user
//method POST
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.email = req.body.email || user.email;
      user.name = req.body.name || user.name;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updated = await user.save();
      return res.status(201).json({ data: updated });
    } else {
      next(new AppError("User not found", 404));
    }
  } catch (error) {
    return next(new AppError(error.message, 404));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);

    return res.status(200).json({ data: user });
  } catch (error) {
    return next(new AppError(error.message, 404));
  }
};

const updateUserthroughManager = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    if (req.user.isManager) {
      if (user) {
        user.email = req.body.email || user.email;
        user.name = req.body.name || user.name;
        if (req.body.password) {
          user.password = req.body.password;
        }
        const updated = await user.save();
        return res.status(201).json({ data: updated });
      } else {
        next(new AppError("User not found", 404));
      }
    } else {
      return next(new AppError("You are not authorized to this route", 401));
    }
  } catch (error) {
    return next(new AppError(error.message, 404));
  }
};

const viewList = async (req, res, next) => {
  try {
    console.log(req.query);
    const user = req.user;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const orderBy = req.query.orderBy == "asc" ? 1 : -1;
    const sortBy = req.query.sortBy || "_id";
    if (user.isManager == true) {
      const data = await User.find()
        .limit(limit)
        .skip(page - 1)
        .sort({ [sortBy]: orderBy });
      res.status(200).json(data);
    } else {
      return next(new AppError("You are not authorized to this route", 401));
    }
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const searchUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.isManager) {
      const data = await User.find(req.query);
      return res.status(200).json({ data: data });
    } else {
      return next(new AppError("You are not authorized to this route", 401));
    }
  } catch (error) {}
};
export {
  authSign,
  getProfile,
  registerUser,
  updateUser,
  viewList,
  searchUser,
  updateUserthroughManager,
  deleteUser,
};
