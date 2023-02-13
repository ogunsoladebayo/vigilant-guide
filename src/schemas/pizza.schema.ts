import { Field, Int, ObjectType } from "type-graphql";

import { Recipe } from "./recipe.schema";
import { Types } from "mongoose";

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
