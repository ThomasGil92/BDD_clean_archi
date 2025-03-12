import { Cart, CartItem } from "@/domain/entities/Cart";
import { Product } from "@/domain/entities/Product";
import { CartRepository } from "@/domain/repositories/CartRepository";

export const cartRepository: CartRepository = {
  getCart: async (): Promise<Cart> => {
    const response = await fetch("/api/cart", {
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
  addToCart: async (product: Product): Promise<CartItem> => {
   const response = await fetch("http://localhost:3000/api/cart", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(product),
   });
   if (!response.ok) {
     const errorMessage = await response.json();
     throw new Error(errorMessage.error);
   }
   const productAdded=await response.json()
   return productAdded;

   
  },
  resetCart: async (): Promise<Cart> => {
    const response = await fetch("/api/cart", {
      method: "PUT",
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
