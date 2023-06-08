import express from "express";
import cors from "cors";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import testRouter from "./routes/testRouter.js";
import citiesRouter from "./routes/citiesRouter.js";
import museumsRoutes from "./routes/museumsRoutes.js";



//Определяется функция addMiddlewares(), которая добавляет необходимые промежуточные обработчики (middlewares) к приложению. В данном случае, используются express.json() для разбора JSON-тела запроса, express.urlencoded() для разбора данных формы и cors() для обработки CORS (Cross-Origin Resource Sharing).
const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(cors());
};

//Определяется функция startServer(), которая запускает сервер на определенном порту. Порт получается из переменной среды process.env.PORT или, если она не задана, используется порт 5001. При запуске сервера выводится сообщение в консоль с указанием порта.
const startServer = () => {
  const port = process.env.PORT || 5001;

  app.listen(port, () => {
    console.log("Server is running in port ", port);
  });
};


//Определяется асинхронная функция connectMongoDB(), которая подключается к базе данных MongoDB с использованием URL, указанного в переменной среды process.env.DB. После успешного подключения выводится сообщение в консоль.
const connectMongoDB = async () => {
  await mongoose.connect(process.env.DB);
  console.log("Mongo DB is running");
};


//Определяется функция loadRoutes(), которая загружает маршруты, связывая соответствующие пути URL с соответствующими маршрутизаторами. Например, все запросы, начинающиеся с /test, будут обрабатываться маршрутизатором testRouter.
const loadRoutes = () => {
  app.use("/test", testRouter);
  app.use("/api/cities", citiesRouter);
  app.use("/api/museums", museumsRoutes);
};

//IIFE
//Определяется самовызывающаяся асинхронная функция (Immediately Invoked Function Expression - IIFE), которая вызывает последовательно другие функции для запуска сервера и подключения к базе данных MongoDB.
(async function controller() {
  await connectMongoDB();
  addMiddlewares();
  loadRoutes();
  startServer();
})();