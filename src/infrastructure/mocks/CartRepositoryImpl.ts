import store from "@/application/store/store";
import { Cart } from "@/domain/entities/Cart";
import { Product } from "@/domain/entities/Product";
import { CartRepository } from "@/domain/repositories/CartRepository";

export const cartMockRepository: CartRepository = {
  getCart: async (): Promise<Cart> => {
    return store.getState().cart.cart;
  },
  addToCart: async (product: Product): Promise<Cart> => {
    const cart=store.getState().cart.cart
    const newCartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    const newCart = {
      items: [...cart.items, newCartItem],
      totalPrice: newCartItem.price * newCartItem.quantity,
    };
    return newCart;
  },
  resetCart: async (): Promise<Cart> => {
    return { items: [], totalPrice: 0 };
  },
};
