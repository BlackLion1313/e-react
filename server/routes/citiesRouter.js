// import express from "express";
// import citiesModel from "../models/citiesModel.js";
// import museumsModel from "../models/museumsModel.js";
// import {
//   getAllCities,
//   getCitiesByCountryCode,
// } from "../controller/citiesController.js";
// const router = express.Router();

// router.get("/all", getAllCities);
// router.get("/:countryCode", getCitiesByCountryCode);
// //Эти строки определяют маршруты для обработки HTTP GET-запросов.

// //all - GET-запрос на этот маршрут вызовет функцию getAllCities из citiesController.js.
// //:countryCode - GET-запрос на этот маршрут вызовет функцию getCitiesByCountryCode из citiesController.js. Значение параметра countryCode будет доступно в request.params.countryCode.

// export default router;