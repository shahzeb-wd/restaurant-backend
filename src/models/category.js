import mongoose, { Model, mongo } from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

export const CategoryModel = mongoose.model("category", CategorySchema);
