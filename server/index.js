import express from "express";
import cors from "cors";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import testRouter from "./routes/testRouter.js";
import citiesRouter from "./routes/citiesRouter.js";
import museumsRoutes from "./routes/museumsRoutes.js";

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(cors());
};

const startServer = () => {
  const port = process.env.PORT || 5001;

  app.listen(port, () => {
    console.log("Server is running in port ", port);
  });
};

const connectMongoDB = async () => {
  await mongoose.connect(process.env.DB);
  console.log("Mongo DB is running");
};

const loadRoutes = () => {
  app.use("/test", testRouter);
  app.use("/api/cities", citiesRouter);
  app.use("/api/museums", museumsRoutes);
};

//IIFE
(async function controller() {
  await connectMongoDB();
  addMiddlewares();
  loadRoutes();
  startServer();
})();