import citiesModel from "../models/citiesModel.js";

const getAllCities = async (request, response) => {
  //   console.log("this is a getAll cities request");
  console.log("request >>>>", request);
  const allCities = await citiesModel
    .find({})
    .populate({ path: "museums", select: ["name", "price"] });

  response.status(200).json({
    allCities,
    number: allCities.length,
    message: "this is the list of cities",
  });

  //   console.log("allCitie>>>>>>", allCities);
};

const getCitiesByCountryCode = async (request, response) => {
  //   console.log("request >>>>", request);
  // const countryCode = request.params.countryCode
  const { countryCode } = request.params;
  const { likes } = request.query;
  console.log("likes", likes);

  if (likes) {
    try {
      const citiesWithCCodeAndLikes = await citiesModel
        .find({
          countryCode: countryCode,
          likes: { $gte: likes },
        })
        .populate({ path: "museums", select: ["name"] });
      if (citiesWithCCodeAndLikes.length === 0) {
        response.status(200).json({
          msg: "sorry, no cities with this number of likes for this country code",
        });
      } else {
        response.status(200).json({
          citiesWithCCodeAndLikes,
          number: citiesWithCCodeAndLikes.length,
        });
      }
    } catch (error) {
      console.log("error>>>>", error);

      response.status(500).json({
        msg: "something went wrong",
      });
    }
  } else {
    try {
      const requestedCities = await citiesModel
        .find({
          //   countryCode: request.params.countryCode
          countryCode: countryCode,
        })
        .populate({ path: "museums" });
      // console.log("requestedCities>>>>>>", requestedCities);

      if (requestedCities.length === 0) {
        response.status(200).json({
          msg: "sorry,there are no cities with that country code",
        });
      } else {
        response.status(200).json({
          requestedCities,
          number: requestedCities.length,
        });
      }
    } catch (error) {
      console.log("error getting cities by CCode>>>", error);
      response.status(500).json({
        message: "something went wrong",
      });
    }
  }
};

export { getAllCities, getCitiesByCountryCode };