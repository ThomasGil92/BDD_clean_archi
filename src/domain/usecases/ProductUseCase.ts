import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";

export const productUseCases = (productRepository: ProductRepository) => ({
  getProducts: async (): Promise<Product[]> => {
    return productRepository.getProducts();
  },
});
