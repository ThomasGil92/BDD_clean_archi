import { addToCart } from "../../application/store/cart.slice"; // Corrected import path
import { configureStore } from "@reduxjs/toolkit"; // Add this line
import cartsReducer from "../../application/store/cart.slice"; // Add this line
import { describe, expect, it } from "vitest";

describe("cart", () => {
  it("should add an item to the cart", async () => {
    const store = configureStore({ reducer: { cart: cartsReducer } }); // Create a new store instance here
    const cart = store.getState().cart.cart;
    await store.dispatch(addToCart({ id: "1", name: "test", price: 10, stock: 1 }));
    const newCart = store.getState().cart.cart;
    expect(newCart.items.length).toBeGreaterThan(cart.items.length);
  });
});
  // Add more tests as needed