import { Inject } from "typescript-ioc";
import { Arg, Query, Resolver } from "type-graphql";

import { FilterInput, PizzaType, SalesReport } from "../schemas";
import { resolverManager } from "./_resolver-manager";
import { PizzaApi } from "../services";
import { IPizzaType } from "../models";

@Resolver((of) => SalesReport)
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

  @Query((returns) => [SalesReport], { nullable: true })
  async salesReport(
    @Arg("filter")
    filter: FilterInput
  ): Promise<SalesReport[]> {
    if (!filter.period && !filter.month)
      throw new Error("filter by either period or month filters");
    if (filter.period && filter.month)
      throw new Error("You can't use both period and month filters");
    return this.pizzaService.salesReport(filter);
  }
}

resolverManager.registerResolver(PizzaResolver);
