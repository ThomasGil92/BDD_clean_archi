import { getProducts } from "@/application/store/product.slice";
import store from "@/application/store/store";
import { describe, expect, it } from "vitest";

describe("cart", () => {
  it("should add an item to the cart", async () => {
    // const cart = store.getState().product.products;
    await store.dispatch(getProducts());
    const newCart = store.getState().product.products;
    expect(newCart.length).toBeGreaterThan(0);

    // Arrange
    // Act
    // Assert
  });
});
