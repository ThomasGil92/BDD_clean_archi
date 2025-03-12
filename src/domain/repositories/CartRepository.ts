import { Cart, CartItem } from "../entities/Cart";
import { Product } from "../entities/Product";

export interface CartRepository {
  getCart(): Promise<Cart>;
  addToCart(product: Product): Promise<CartItem>;
  resetCart(): Promise<Cart>;
}
