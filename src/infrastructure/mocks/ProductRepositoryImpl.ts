
import { Product } from "@/domain/entities/Product";
import { ProductRepository } from "@/domain/repositories/ProductRepository";
import fakeDb from "./fakeProducts.json"

export const productMockRepository: ProductRepository = {
  getProducts: async (): Promise<Product[]> => {
    return fakeDb;
  },
  
};
