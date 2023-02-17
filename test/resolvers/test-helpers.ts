import { BuildContext, ObjectFactory } from "typescript-ioc";
import { PizzaApi } from "../../src/services";

export const mockProjectApiProvider: ObjectFactory = (
  _context?: BuildContext
) => {
  const projectApi: PizzaApi = {
    listPizzaTypes: jest.fn() as any,
    getPizzaById: jest.fn() as any,
    getPizza: jest.fn() as any,
    salesReport: jest.fn() as any,
  };

  return projectApi;
};
