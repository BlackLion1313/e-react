import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import testRouter from "./routes/testRouter.js";
import citiesRouter from "./routes/citiesRouter.js";
import museumsRoutes from "./routes/museumsRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import exercisesRoutes from "./routes/exercisesRoutes.js";
import multer from "multer";
import cloudinaryConfig  from "./config/cloudinary.js";

dotenv.config();

const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(cors());
  // app.use(multer().single("image"));
  cloudinaryConfig();
};

const startServer = () => {
  const port = process.env.PORT || 5001;

  app.listen(port, () => {
    console.log("Server is running on port", port);
  });
};

const connectMongoDB = async () => {
  await mongoose.connect(process.env.DB);
  console.log("MongoDB is running");
};

const loadRoutes = () => {
  app.use("/test", testRouter);
  app.use("/api/cities", citiesRouter);
  app.use("/api/museums", museumsRoutes);
  app.use("/api/users", userRoutes);
};

(async function controller() {
  await connectMongoDB();
  addMiddlewares();
  loadRoutes();
  startServer();
})();
