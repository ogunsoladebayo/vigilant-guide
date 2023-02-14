import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from "type-graphql";

import { Recipe } from "./recipe.schema";
import { Types } from "mongoose";
import { IsDate } from "class-validator";

@ObjectType()
export class PizzaType {
  @Field((type) => String)
  id: Types.ObjectId;

  @Field()
  name: string;

  @Field((type) => Int)
  price: number;

  @Field((type) => [Recipe])
  recipe: Recipe[];
}

@ObjectType()
export class Ingredient {
  @Field((type) => String)
  id: Types.ObjectId;

  @Field()
  name: string;

  @Field((type) => Int)
  cost: number;

  @Field()
  unit: string;
}
@InputType()
class DateRange {
  @Field(() => Date, { nullable: true })
  @IsDate()
  start_date: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  end_date: Date;
}

enum Pizza {
  PEPPERONI = "Pepperoni",
  BRANCO = "Branco",
  ALL_DRESSED = "All Dressed",
}

registerEnumType(Pizza, {
  name: "Pizza",
  description: "Pizza types",
});

@InputType()
export class FilterInput {
  @Field(() => DateRange, { nullable: true })
  period?: DateRange;

  @Field((type) => [Pizza], { nullable: true })
  pizza_types?: Pizza[];
}

@ObjectType()
export class SalesReport {
  @Field((type) => String)
  pizza_type: string;
  @Field()
  units_sold: number;

  @Field()
  ingredients_quantity: number;

  @Field()
  cost: number;

  @Field()
  sales: number;
  @Field()
  profit: number;
}
