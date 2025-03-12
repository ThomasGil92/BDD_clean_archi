import fs from "fs/promises";

import path from "path";

const filePath = path.join(
  process.cwd(),
  "src/infrastructure/mocks/fakeProducts.json",
);

export async function GET() {
  try {
    const products = await fs.readFile(filePath, "utf8");
    const productItems = JSON.parse(products);
    return Response.json(productItems);
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        "Une erreur est survenue lors de la récupération des produits.",
        { status: 400 },
      );
    }
  }
}
