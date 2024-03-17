import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  updateAccountDetails,
  getCurrentUser,
  getHistory,
  predictCaption,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/user").get(verifyJWT, getCurrentUser);
router.route("/update-profile").patch(verifyJWT, updateAccountDetails);
router.route("/predict").post(verifyJWT,upload.single("image"), predictCaption);
router.route("/history").get(verifyJWT, getHistory);

export default router;
