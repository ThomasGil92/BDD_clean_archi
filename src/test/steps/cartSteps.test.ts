import { addToCart } from "../../application/store/cart.slice";
import store from "@/application/store/store";
import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { expect } from "vitest";
//import fakeDb from "@/infrastructure/mocks/fakeDb.json";

const feature = await loadFeature("src/test/features/cart.feature");

describeFeature(feature, ({ Scenario }) => {
  const cartState = store.getState().cart.cart;
  Scenario(`Add a product to the cart`, async ({ Given, When, Then, And }) => {
    console.log("scenrario begin", store.getState());

    Given(`an empty cart`, () => {
      expect(cartState.items.length).toBe(0);
      expect(cartState.totalPrice).toBe(0);
    });
    When(`I add a product`, async () => {

     await store.dispatch(addToCart({ id: "1", name: "test", price: 3, stock: 3 }));

    });
    Then(`the product should appear in the cart`, () => {
      expect(cartState.items.length).toBe(1);
    });
    And(`the total price should be updated`, () => {});
  });
  Scenario(
    `Add multiple products to the cart`,
    ({ Given, When, Then, And }) => {
      Given(`a cart with one product`, () => {});
      When(`I add another product`, () => {});
      Then(`both products should appear in the cart`, () => {});
      And(`the total price should be updated`, () => {});
    },
  );
  Scenario(`Clear the cart`, ({ Given, When, Then, And }) => {
    Given(`a cart with multiple products`, () => {});
    When(`I clear the cart`, () => {});
    Then(`the cart should be empty`, () => {});
    And(`the total price should be zero`, () => {});
  });
});
