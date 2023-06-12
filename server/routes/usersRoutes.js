import express from "express";
import { imageUpload, register } from "../controller/usersController.js";
import multerUpload from "../middleware/multer.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("image"), imageUpload);
router.post("/register", register);

export default router;
