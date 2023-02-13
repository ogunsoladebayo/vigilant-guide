import mongoose, { Schema } from "mongoose";
import { BaseInterface } from "./base.interface";

export interface IIngredient extends BaseInterface {
  name: string;
  unit: string;
  cost: number;
}

const IngredientSchema = new Schema<IIngredient>({
  name: { type: String, required: true },
  unit: { type: String, required: true },
  cost: { type: Number, required: true },
});

export const Ingredient = mongoose.model<IIngredient>(
  "Ingredient",
  IngredientSchema
);
