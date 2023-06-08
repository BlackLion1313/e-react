import citiesModel from "../models/citiesModel.js";


//Это функция-обработчик для получения всех городов. Она выполняет запрос к модели citiesModel, используя метод find({}), чтобы найти все документы в коллекции городов. Затем используется метод populate() для заполнения поля museums в каждом городе, выбирая только поля name и price из связанных документов музеев. Результат возвращается в формате JSON с HTTP-статусом 200.
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


//Это функция-обработчик для получения городов по коду страны. Она извлекает значение параметра countryCode из request.params и значение параметра likes из request.query. В зависимости от наличия параметра likes, выполняется один из двух запросов к модели citiesModel:
//Если есть параметр likes, то выполняется запрос для поиска городов с указанным countryCode и количеством лайков (likes), большим или равным заданному значению. Результат также включает заполнение поля museums с выбранными полями name из связанных документов музеев. Если результат пустой, возвращается сообщение о том, что нет городов с указанным количеством лайков для заданного кода страны.
//Если параметр likes отсутствует, то выполняется запрос для поиска городов с указанным countryCode. Результат также включает заполнение поля museums. Если результат пустой, возвращается сообщение о том, что нет городов с указанным кодом страны.

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