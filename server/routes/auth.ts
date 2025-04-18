import express from "express";
import {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} from "../controllers/userController";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

export default router;
