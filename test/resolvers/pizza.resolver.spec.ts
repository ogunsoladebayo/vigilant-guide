import { Container } from "typescript-ioc";

import { PizzaApi } from "../../src/services";
import { PizzaResolver } from "../../src/resolvers";
import { mockProjectApiProvider } from "./test-helpers";
import Mock = jest.Mock;
import { FilterInput, Month } from "../../src/schemas";

describe("pizza.resolver", () => {
  let classUnderTest: PizzaResolver;
  let projectService: PizzaApi;

  test("canary verifies test infrastructure", () => {
    expect(true).toEqual(true);
  });

  beforeEach(() => {
    Container.bind(PizzaApi).factory(mockProjectApiProvider);

    classUnderTest = Container.get(PizzaResolver);
    projectService = Container.get(PizzaApi);
  });

  describe("pizzaTypes()", () => {
    const expectedResult = [{ id: 1, name: "teste" }];
    let mock: Mock;

    beforeEach(() => {
      mock = projectService.listPizzaTypes as Mock;
      mock.mockResolvedValue(expectedResult);
    });

    test("should return value from projectService.listProjects()", async () => {
      let actual = await classUnderTest.pizzaTypes();
      console.log("ACTUAL", actual);
      expect(actual).toBe(expectedResult);
    });
  });

  describe("getPizza(name:)", () => {
    const expectedResult = { id: 1, name: "Pepperoni" };
    let mock: Mock;

    beforeEach(() => {
      mock = projectService.getPizza as Mock;
      mock.mockResolvedValue(expectedResult);
    });

    test("should return value from pizzaService.getPizza(name:)", async () => {
      const name = "Pepperoni";

      expect(await classUnderTest.pizza(name)).toBe(expectedResult);

      expect(mock.mock.calls[0][0]).toEqual(name);
    });
  });

  describe("salesReport(filter)", () => {
    const expectedResult = [{ id: 1, title: "test" }];
    let mock: Mock;

    beforeEach(() => {
      mock = projectService.salesReport as Mock;
      mock.mockResolvedValue(expectedResult);
    });

    test("should return value from pizzaService.salesReport(filter)", async () => {
      const month = Month.MARCH;
      const pizza_types = ["PEPPERONI"];

      let filter = { month, pizza_types };
      expect(await classUnderTest.salesReport(filter as FilterInput)).toBe(
        expectedResult
      );

      expect(mock.mock.calls[0][0]).toEqual(filter);
    });
  });
});
