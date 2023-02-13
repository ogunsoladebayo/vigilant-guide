import { ContainerConfiguration, Scope } from "typescript-ioc";
import { PizzaApi } from "./pizza.api";
import { PizzaService } from "./pizza.service";

const config: ContainerConfiguration[] = [
  {
    bind: PizzaApi,
    to: PizzaService,
    scope: Scope.Singleton,
  },
];

export default config;
