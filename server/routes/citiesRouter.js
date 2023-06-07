import express from "express";
import citiesModel from "../models/citiesModel.js";
const router = express.Router();

router.get("/all", async (request, response) => {
  //   console.log("this is a getAll cities request");
  const allCities = await citiesModel.find({});
  response.status(200).json({
    allCities,
    number: allCities.length,
    message: "this is the list of cities",
  });

  console.log("allCitie>>>>>>", allCities);
});

export default router;