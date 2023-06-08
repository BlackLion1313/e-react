import mongoose from "mongoose";

// const { Schema } = mongoose;

//Определяется схема citySchema с помощью конструктора mongoose.Schema(). Схема содержит определение полей и их типов для модели города. У каждого поля есть указанные атрибуты, такие как type (тип данных), required (обязательное поле) и unique (уникальное значение). Поле museums является массивом и содержит ссылки на документы из коллекции "museum" по их идентификаторам (mongoose.Schema.Types.ObjectId).
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
  museums: [{ type: mongoose.Schema.Types.ObjectId, ref: "museum" }],
});

//С помощью метода mongoose.model() создается модель citiesModel на основе схемы citySchema. Модель связывается с коллекцией "city" в базе данных.
const citiesModel = mongoose.model("city", citySchema);

export default citiesModel;