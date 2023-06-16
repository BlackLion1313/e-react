import express from "express";
import { imageUpload, login, register,  getProfile } from "../controller/usersController.js";
import multerUpload from "../middleware/multer.js";
import jwt from "../middleware/jwt.js";



const router = express.Router();


router.get("/profile", jwt, getProfile);
router.post("/imageUpload", multerUpload.single("image"), imageUpload);
router.post("/register", register);
router.post("/login", login);




export default router;
