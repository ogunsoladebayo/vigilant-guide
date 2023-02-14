import { IPizzaType } from "../models";
import { Types } from "mongoose";
import { FilterInput, SalesReport } from "../schemas";

export abstract class PizzaApi {
  abstract listPizzaTypes(): Promise<IPizzaType[]>;

  abstract getPizzaById(id: Types.ObjectId): Promise<IPizzaType | undefined>;

  abstract getPizza(name: string): Promise<IPizzaType | undefined>;

  abstract salesReport(period: FilterInput): Promise<SalesReport[]>;
}
