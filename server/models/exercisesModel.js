import mongoose from "mongoose";

const exercisesSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  exerciseId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  code: {
    type: String,
    required: true,
    unique: false,
  },
  missingWords: {
    type: [String],
    required: true,
    unique: false,
  },
  solution: {
    type: String,
    required: true,
    unique: false,
  },
  isFavorite: {
    type: Boolean,
    required: true,
    default: false, // Optional: Set a default value for isFavorite
  },
});

const exercisesModel = mongoose.model("exercise", exercisesSchema);
export default exercisesModel;
