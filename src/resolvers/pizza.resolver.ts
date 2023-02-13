import { Inject } from "typescript-ioc";
import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";

import { PizzaType, Recipe } from "../schemas";
import { resolverManager } from "./_resolver-manager";
import { PizzaApi } from "../services";
import { IPizzaType } from "../models";

@Resolver((of) => PizzaType)
export class PizzaResolver {
  @Inject
  pizzaService: PizzaApi;

  @Query((returns) => [PizzaType])
  async pizzaTypes(): Promise<IPizzaType[]> {
    return this.pizzaService.listPizzaTypes();
  }

  @Query((returns) => PizzaType, { nullable: true })
  async pizza(@Arg("name") name: string): Promise<IPizzaType | undefined> {
    return this.pizzaService.getPizza(name);
  }

  // @FieldResolver()
  // async tasks(@Root() projectData: PizzaTypeModel): Promise<IngredientModel[]> {
  //   return this.taskService.getTasksForProject(projectData.id);
  // }
}

resolverManager.registerResolver(PizzaResolver);
