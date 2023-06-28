import express from "express";
import {
  getProfile,
  imageUpload,
  login,
  register,
} from "../controller/usersController.js";
import multerUpload from "../middleware/multer.js";
import jwtAuth from "../middleware/jwtAuth.js";
const router = express.Router();

router.post("/imageUpload", multerUpload.single("image"), imageUpload);

router.post("/register", register);
router.post("/login", login);
router.get('/test', (req, res) => {
  res.send({message: 'nanananannananana'})
})
// router.get("/profile", getProfile);
router.get("/profile", jwtAuth, getProfile);

export default router;