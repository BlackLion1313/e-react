import express from "express";
import cors from "cors";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import passport from "passport";
import passportStrategy from "./config/passportConfig.js";
import cloudinaryConfig from "./config/cloudinary.js";
import usersRoutes from "./routes/usersRoutes.js";
import exercisesRoutes from './routes/exercisesRoutes.js'


// respond with "hello world" when a GET request is made to the homepage
app.get('/test', function (req, res) {
  res.send('hello world');
});

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(cors());
  cloudinaryConfig();
  passportStrategy(passport);
};

const startServer = () => {
  const port = process.env.PORT || 5005;

  app.listen(port, () => {
    console.log("Server is running in port ", port);
  });
};

const connectMongoDB = async () => {
  mongoose.connect(process.env.DB)
  startServer();
  console.log("Mongo DB is running");
};

const loadRoutes = () => {
  app.use("/api/users", usersRoutes);
  app.use("/api/exercises", exercisesRoutes)

};

//IIFE
(async function controller() {
  await connectMongoDB();
  addMiddlewares();
  loadRoutes();
  // startServer();
})();