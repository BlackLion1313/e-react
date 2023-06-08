import museumsModel from "../models/museumsModel.js";

// Получение всех музеев
const getAllMuseums = async (req, res) => {
  try {
    // Получение всех музеев из museumsModel
    const allMuseums = await museumsModel.find({});

    // Заполнение поля "city" каждого музея выбранными полями ("name" и "likes")
    // Это позволяет получить информацию о связанном городе при запросе музеев
    const populatedMuseums = await museumsModel.populate(allMuseums, { path: "city", select: ["name", "likes"] });

    // Возвращение JSON-ответа со заполненными музеями и количеством музеев
    res.status(200).json({
      allMuseums: populatedMuseums,
      number: populatedMuseums.length,
    });
  } catch (error) {
    // Если при выполнении запроса к базе данных или заполнении произошла ошибка, обработка ошибки
    console.log("error", error);
    res.status(500).json({
      msg: "что-то пошло не так при получении всех музеев",
    });
  }
};

export { getAllMuseums };
