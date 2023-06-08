import express from "express";
import { getAllMuseums } from "../controller/museumsController.js";
const router = express.Router();

router.get("/all", getAllMuseums);

export default router;