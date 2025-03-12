import { Cart } from "@/domain/entities/Cart";
import { Product } from "@/domain/entities/Product";
import { CartRepository } from "@/domain/repositories/CartRepository";
import { CartItem } from "@/domain/entities/Cart";
import fakeCart from "./fakeCart.json";

export const cartMockRepository: CartRepository = {
  getCart: async (): Promise<Cart> => {
    return fakeCart;
  },
  addToCart: async (product: Product): Promise<CartItem> => {
    const newCartItem: CartItem = {
      productId: product.id,
      quantity: 1,
      price: product.price,
      name: product.name,
    };
    
    
    return newCartItem;
  },
  resetCart: async (): Promise<Cart> => {
    const updatedCart = { items: [], totalPrice: 0 };
    return updatedCart;
  },
};
