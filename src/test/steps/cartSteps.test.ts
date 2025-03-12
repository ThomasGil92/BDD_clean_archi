import { addToCart, clearCart } from "@/application/store/cart.slice";
import store from "@/application/store/store";
import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";

import { expect } from "vitest";

const feature = await loadFeature("src/test/features/cart.feature");

describeFeature(feature, ({ Scenario }) => {
  const getCartState = () => store.getState().cart.cart;
  Scenario(`Add a product to the cart`, ({ Given, When, Then, And }) => {
    Given(`an empty cart`, () => {
      expect(getCartState().items.length).toBe(0);
      expect(getCartState().totalPrice).toBe(0);
    });
    When(`I add a product`, async () => {
      await store.dispatch(
        addToCart({
          id: "1",
          name: "Product 1",
          price: 10,
          stock: 2,
        }),
      );
    });
    Then(`the product should appear in the cart`, () => {
      expect(getCartState().items.length).toBe(1);
    });
    And(`the total price should be updated`, () => {
      expect(getCartState().totalPrice).toBe(10);
    });
  });
  Scenario(
    `Add multiple products to the cart`,
    ({ Given, When, Then, And }) => {
      Given(`a cart with one product`, () => {
        expect(getCartState().items.length).toBe(1);
      });
      When(`I add two new product`, async () => {
        await store.dispatch(
          addToCart({
            id: "2",
            name: "Product 2",
            price: 20,
            stock: 2,
          }),
        );
        await store.dispatch(
          addToCart({
            id: "3",
            name: "Product 3",
            price: 30,
            stock: 2,
          }),
        );
      });
      Then(`both products should appear in the cart`, () => {
        expect(getCartState().items.length).toBe(3);
      });
      And(`the total price should be updated`, () => {
        expect(getCartState().totalPrice).toBe(60);
      });
    },
  );
  Scenario(
    `Add multiple times the same product to the cart`,
    ({ Given, When, Then, And }) => {
      Given(`a cart with three product`, () => {
        expect(getCartState().items.length).toBe(3);
      });
      When(`I add the same product two times`, async () => {
        await store.dispatch(
          addToCart({
            id: "4",
            name: "Product 4",
            price: 20,
            stock: 2,
          }),
        );
        await store.dispatch(
          addToCart({
            id: "4",
            name: "Product 4",
            price: 20,
            stock: 2,
          }),
        );
      });
      Then(`the product should appear on the cart with quantity "2"`, () => {
        expect(getCartState().items.length).toBe(4);
        expect(getCartState().items[3].quantity).toBe(2)
      });
      And(`the total price should be updated`, () => {
        expect(getCartState().totalPrice).toBe(100);
      });
    },
  );
  Scenario(`Clear the cart`, ({ Given, When, Then, And }) => {
    Given(`a cart with multiple products`, () => {
      expect(getCartState().items.length).toBe(4);
    });
    When(`I clear the cart`, () => {
      store.dispatch(clearCart());
    });
    Then(`the cart should be empty`, () => {
      expect(getCartState().items.length).toBe(0);
    });
    And(`the total price should be zero`, () => {
      expect(getCartState().totalPrice).toBe(0);
    });
  });
});
