import { Ingredient, Order, PizzaType } from "../models";
import * as fs from "fs";
import recipe from "./data/recipe.json";
import orders from "./data/orders.json";
import { ingredientCostToJson, pizzaPriceToJson } from "./string-util";
import { Inject } from "typescript-ioc";
import { LoggerApi } from "../logger";
import dayjs from "dayjs";
import * as path from "path";

export class Seed {
  @Inject
  logger: LoggerApi;

  async seedPizzaTypes() {
    try {
      const pizzaTypes = await PizzaType.find({});
      if (pizzaTypes.length === 0) {
        const csv = fs.readFileSync(
          path.join(__dirname, "data/price-per-pizza.csv"),
          "utf8"
        );
        const data = pizzaPriceToJson(csv);
        await PizzaType.insertMany(data.pizza);
        this.logger.info("Pizza types seeded");
      } else {
        this.logger.info("Pizza types already seeded");
      }
    } catch (error) {
      this.logger.error("Error seeding pizza types", error);
    }
  }

  async seedIngredients() {
    try {
      const ingredients = await Ingredient.find({});
      if (ingredients.length === 0) {
        const csv = fs.readFileSync(
          path.join(__dirname, "data/ingredient-costs.csv"),
          "utf8"
        );
        const data = ingredientCostToJson(csv);
        await Ingredient.insertMany(data.ingredients);
        this.logger.info("Ingredients seeded");
      } else {
        this.logger.info("Ingredients already seeded");
      }
    } catch (error) {
      this.logger.error("Error seeding ingredients", error);
    }
  }

  async seedRecipes() {
    try {
      const pizzaTypes = await PizzaType.countDocuments({});
      if (pizzaTypes !== 0) {
        for (let i = 0; i < recipe.length; i++) {
          const pizza = recipe[i];
          const recipeArr = [];

          for (let j = 0; j < pizza.recipe.length; j++) {
            const ingredient = pizza.recipe[j];
            const ing = await Ingredient.findOne({
              name: ingredient.ingredient,
            }).exec();

            recipeArr.push({
              ingredient: ing._id.toString(),
              quantity: ingredient.quantity,
            });
          }

          await PizzaType.findOneAndUpdate(
            { name: pizza.name },
            { recipe: recipeArr }
          ).exec();
        }

        this.logger.info("Recipes seeded");
      } else {
        this.logger.info("Recipes already seeded");
      }
    } catch (error) {
      this.logger.error("Error seeding recipes", error);
    }
  }

  async seedOrders() {
    try {
      if ((await Order.countDocuments({}).exec()) === 0) {
        //   get the id of the pizza types from the first order
        const pizzaTypes = orders[0].orders.map((p) => p.pizza_type);
        const pizzaTypeIds = await PizzaType.find({
          name: { $in: pizzaTypes },
        }).exec();
        const pizzaTypeMap = {};
        pizzaTypeIds.forEach((p) => {
          pizzaTypeMap[p.name] = p._id;
        });
        const ordersToInsert = orders.map((o) => {
          return {
            date: dayjs(o.date, "D-MMM-YY").toISOString(),
            orders: o.orders.map((p) => ({
              pizza_type: pizzaTypeMap[p.pizza_type],
              quantity: p.quantity,
            })),
          };
        });
        await Order.insertMany(ordersToInsert);
        this.logger.info("Orders seeded");
      } else {
        this.logger.info("Orders already seeded");
      }
    } catch (error) {
      this.logger.error("Error seeding orders", error);
    }
  }
}
