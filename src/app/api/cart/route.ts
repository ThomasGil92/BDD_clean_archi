import { NextRequest } from "next/server";

import fs from "fs/promises";
import { Product } from "@/domain/entities/Product";
import { CartItem } from "@/domain/entities/Cart";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "src/infrastructure/mocks/fakeCart.json",
);

export async function GET() {
  try {
    const cartDb = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(cartDb);
    return Response.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        "Une erreur est survenue lors de la récupération des tâches.",
        { status: 400 },
      );
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const newProductData: Product = await request.json();
    if (!newProductData) {
      return new Response(null, { status: 400 });
    }
    
    const productToAdd: CartItem = {
      productId: newProductData.id,
      name: newProductData.name,
      price: newProductData.price,
      quantity: 1,
    };
    
    console.log(productToAdd);
    return Response.json(productToAdd);
  } catch (error) {
    if (error instanceof Error) {
      return new Response("An error occured while adding product to cart", {
        status: 400,
      });
    }
  }
}
export async function PUT() {
  try {
    const emptyCart = {
      items: [],
      totalPrice: 0,
    };
    await fs.writeFile(
      "src/infrastructure/mocks/fakeCart.json",
      JSON.stringify(emptyCart),
    );
    return Response.json(emptyCart);
  } catch (error) {
    if (error instanceof Error) {
      return new Response("An error occured while adding product to cart", {
        status: 400,
      });
    }
  }
}
