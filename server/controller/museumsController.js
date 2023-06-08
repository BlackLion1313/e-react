import museumsModel from "../models/museumsModel.js";

const getAllMuseums = async (req, res) => {
  try {
    const allMuseums = await museumsModel
      .find({})
      .populate({ path: "city", select: ["name", "likes"] }); //PATH name corresponds to the name of the field from our Model that is of type: mongoose.Schema.Types.ObjectId
    res.status(200).json({
      allMuseums,
      number: allMuseums.length,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "something went wrong getting all museums",
    });
  }
};

export { getAllMuseums };