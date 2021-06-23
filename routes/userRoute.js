import express from "express";
import check from "../middleware/authChecki.js";
import {
  authSign,
  deleteUser,
  getProfile,
  registerUser,
  searchUser,
  updateUser,
  updateUserthroughManager,
  viewList,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/login").post(authSign);
router.route("/register").post(registerUser);
router.route("/update").put(check, updateUser);
router.route("/delete").delete(check, deleteUser);
router.route("/update/:id").put(check, updateUserthroughManager);
router.route("/list").get(check, viewList);
router.route("/search").get(check, searchUser);
router.route("/profile").get(check, getProfile);

export default router;
