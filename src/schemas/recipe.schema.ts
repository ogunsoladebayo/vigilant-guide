import { Field, Int, ObjectType } from "type-graphql";
import { PizzaType } from "./pizza.schema";

@ObjectType()
export class Recipe {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  unit: string;

  @Field((type) => Int)
  cost: number;
}
