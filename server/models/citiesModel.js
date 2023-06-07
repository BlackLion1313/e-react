import mongoose from "mongoose";

// const { Schema } = mongoose;

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  countryCode: {
    type: String,
    required: true,
    unique: false,
  },
  likes: {
    type: Number,
    required: false,
    unique: false,
  },
});

const citiesModel = mongoose.model("city", citySchema);

export default citiesModel;