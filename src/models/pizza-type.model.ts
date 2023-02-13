import mongoose, { Schema, Types } from "mongoose";
import { BaseInterface } from "./base.interface";

export interface IPizzaType extends BaseInterface {
  name: string;
  price: number;
  recipe: {
    ingredient: Types.ObjectId;
    quantity: number;
  }[];
}

const PizzaTypeSchema = new Schema<IPizzaType>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  recipe: [
    {
      ingredient: { type: Types.ObjectId, ref: "Ingredient" },
      quantity: { type: Number, required: true },
    },
  ],
});

export const PizzaType = mongoose.model<IPizzaType>(
  "PizzaType",
  PizzaTypeSchema
);
