import express from "express";
import { imageUpload, login, register } from "../controller/usersController.js";
import multerUpload from "../middleware/multer.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("image"), imageUpload);
router.post("/register", register);
router.post("/login", login);

export default router;
