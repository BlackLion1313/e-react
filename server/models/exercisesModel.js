import mongoose from "mongoose";

const exercisesSchema = new mongoose.Schema({
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
  difficulty: {
    type: String,
    required: true,
    unique: false,
  },
  hints: {
    type: [String],
    required: false,
    unique: false,
  },
  solution: {
    type: String,
    required: true,
    unique: false,
  },
});

const exercisesModel = mongoose.model("exercise", exercisesSchema);
export default exercisesModel;

