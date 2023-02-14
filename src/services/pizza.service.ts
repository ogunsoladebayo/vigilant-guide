import { Inject } from "typescript-ioc";
import { PizzaApi } from "./pizza.api";
import { IPizzaType, Order, PizzaType } from "../models";
import { LoggerApi } from "../logger";
import { Types } from "mongoose";
import { FilterInput, SalesReport } from "../schemas";
import dayjs from "dayjs";

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

  async salesReport(filter: FilterInput): Promise<SalesReport[]> {
    this.logger.info("Getting sales report");

    const pizzaTypes = filter.pizza_types
      ? await PizzaType.find({ name: { $in: filter.pizza_types } })
      : await PizzaType.find().exec();

    const pipeline = [
      {
        $match: {
          date: {
            $gte: dayjs(filter.period.start_date).toDate(),
            $lte: dayjs(filter.period.end_date).toDate(),
          },
        },
      },
      {
        $unwind: "$orders",
      },
      {
        $match: {
          "orders.pizza_type": {
            $in: pizzaTypes.map((p) => p._id),
          },
        },
      },
      {
        $lookup: {
          from: "pizzatypes",
          localField: "orders.pizza_type",
          foreignField: "_id",
          as: "orders.pizza_type",
        },
      },
      {
        $unwind: "$orders.pizza_type",
      },
      {
        $group: {
          _id: "$orders.pizza_type.name",
          sold: {
            $sum: "$orders.quantity",
          },
          recipe: {
            $first: "$orders.pizza_type.recipe",
          },
          pizza: {
            $first: "$orders.pizza_type",
          },
        },
      },
      {
        $unwind: "$recipe",
      },
      {
        $lookup: {
          from: "ingredients",
          localField: "recipe.ingredient",
          foreignField: "_id",
          as: "recipe.ingredient",
        },
      },
      {
        $unwind: "$recipe.ingredient",
      },
      {
        $group: {
          _id: {
            pizza: "$_id",
            ingredient: "$recipe.ingredient.name",
          },
          quantity_of_ingredients: {
            $sum: "$recipe.quantity",
          },
          sold: {
            $first: "$sold",
          },
          pizza: {
            $first: "$pizza",
          },
          ingredient: {
            $first: "$recipe.ingredient",
          },
        },
      },
      {
        $project: {
          total_quantity_of_ingredients: {
            $multiply: ["$quantity_of_ingredients", "$sold"],
          },
          sold: 1,
          ingredient: {
            cost: 1,
          },
          total_sales: {
            $multiply: ["$sold", "$pizza.price"],
          },
        },
      },
      {
        $project: {
          total_quantity_of_ingredients: 1,
          sold: 1,
          total_cost_of_ingredients: {
            $multiply: ["$total_quantity_of_ingredients", "$ingredient.cost"],
          },
          total_sales: 1,
        },
      },
      {
        $project: {
          total_quantity_of_ingredients: 1,
          sold: 1,
          total_cost_of_ingredients: 1,
          total_sales: 1,
          profit: {
            $subtract: ["$total_sales", "$total_cost_of_ingredients"],
          },
        },
      },
      {
        $group: {
          _id: "$_id.pizza",
          pizza_type: {
            $first: "$_id.pizza",
          },
          units_sold: {
            $first: "$sold",
          },
          ingredients_quantity: {
            $sum: "$total_quantity_of_ingredients",
          },
          cost: {
            $sum: "$total_cost_of_ingredients",
          },
          sales: {
            $sum: "$total_sales",
          },
          profit: {
            $sum: "$profit",
          },
        },
      },
    ];
    return await Order.aggregate<SalesReport>(pipeline).exec();
  }
}
