export function ingredientCostToJson(csv: string): {
  ingredients: Array<{ name: string; cost: number; unit: string }>;
} {
  const lines = csv.trimEnd().split("\r\n");
  const data = lines.slice(1).map((line) => {
    const [name, cost, unit] = line.split(",").map((v) => v.trim());
    return {
      name,
      cost: parseFloat(cost.split("$")[1]),
      unit,
    };
  });

  return { ingredients: data };
}

export function pizzaPriceToJson(csv: string): {
  pizza: Array<{ name: string; price: number }>;
} {
  const lines = csv.trimEnd().split("\r\n");
  const header = lines[0].split(",");
  const data = lines[1]
    .slice(6)
    .split(",")
    .map((line, index) => {
      return {
        name: header[index + 1],
        price: parseFloat(line.split("$")[1]),
      };
    });

  return { pizza: data };
}
