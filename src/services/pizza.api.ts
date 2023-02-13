import { IPizzaType } from "../models";
import { Types } from "mongoose";

export abstract class PizzaApi {
  abstract listPizzaTypes(): Promise<IPizzaType[]>;

  abstract getPizzaById(id: Types.ObjectId): Promise<IPizzaType | undefined>;

  abstract getPizza(name: string): Promise<IPizzaType | undefined>;
}
