
import { Product } from "@/domain/entities/Product";
import { ProductRepository } from "@/domain/repositories/ProductRepository";

export const productRepository: ProductRepository = {
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.error);
    }
    return response.json();
  },
  
};
