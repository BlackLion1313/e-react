import mongoose from "mongoose";

const museumsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "city" }, // REF corresponds to the name of the MongoDB collection with the documents which info we want to see inside this field
});

const museumsModel = mongoose.model("museum", museumsSchema);
export default museumsModel;