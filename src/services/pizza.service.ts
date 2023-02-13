import { Inject } from "typescript-ioc";
import { PizzaApi } from "./pizza.api";
import { IPizzaType, PizzaType } from "../models";
import { LoggerApi } from "../logger";
import mongoose, { Types } from "mongoose";

export class PizzaService implements PizzaApi {
  @Inject
  private readonly _logger: LoggerApi;

  get logger(): LoggerApi {
    return this._logger.child("PizzaService");
  }

  async listPizzaTypes(): Promise<IPizzaType[]> {
    this.logger.info("Listing pizza types");

    return await PizzaType.find().exec();
  }

  async getPizza(name: string): Promise<IPizzaType | undefined> {
    this.logger.info("Getting pizza: " + name);

    return await PizzaType.findOne({ name }).exec();
  }

  async getPizzaById(id: Types.ObjectId): Promise<IPizzaType | undefined> {
    this.logger.info("Getting pizza by id: " + id);

    return await PizzaType.findById(id).exec();
  }
}
