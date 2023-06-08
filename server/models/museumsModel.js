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
//Этот код определяет схему (schema) для коллекции "museums" в базе данных. Схема описывает структуру документов в коллекции. В данном случае, схема содержит поля name, type, price, location и cit
const museumsModel = mongoose.model("museum", museumsSchema);
export default museumsModel;