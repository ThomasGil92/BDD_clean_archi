import { Cart } from "../entities/Cart";
import { Product } from "../entities/Product";
import { CartRepository } from "../repositories/CartRepository";

export const cartUseCases = (cartRepository: CartRepository) => ({
  getCart: async (): Promise<Cart> => {
    return cartRepository.getCart();
  },
  addToCart: async (product: Product): Promise<Cart> => {
    return cartRepository.addToCart(product);
  },
  resetCart: async (): Promise<Cart> => {
    return cartRepository.resetCart();
  },
});
