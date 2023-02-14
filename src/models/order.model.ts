import mongoose, { Schema, Types } from "mongoose";
import { BaseInterface } from "./base.interface";

export interface IOrder extends BaseInterface {
  date: Date;
  orders: {
    pizza_type: Types.ObjectId;
    quantity: number;
  }[];
}

const OrderSchema = new Schema<IOrder>({
  date: { type: Date, required: true },
  orders: [
    {
      pizza_type: { type: Types.ObjectId, ref: "PizzaType" },
      quantity: { type: Number, required: true },
    },
  ],
});

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
