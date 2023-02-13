export function parseCsvString(value: string, defaultValue?: string): string[] {
  if (value) {
    return value.split(",").map((v) => v.trim());
  }

  return defaultValue ? [defaultValue] : [];
}

export function pizzaPriceToJson(csv: string): {
  pizza: Array<{ name: string; price: number }>;
} {
  const lines = csv.split("\n");
  const header = lines[0].split(",");
  const data = lines.slice(1).map((line) => {
    const columns = line.split(",");
    return {
      name: columns[1],
      price: parseFloat(columns[2].slice(1)),
    };
  });

  return { pizza: data };
}
