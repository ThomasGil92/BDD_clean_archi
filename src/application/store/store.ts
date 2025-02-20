import {  configureStore } from "@reduxjs/toolkit";
import cartsReducer from "./cart.slice";
import productReducer  from "./product.slice";
import {
  useDispatch,
  TypedUseSelectorHook,
  useSelector,
  useStore,
} from "react-redux";

console.info("cartReducer",cartsReducer)
console.info("prodctReducer",productReducer)

export function makeStore() {
  return configureStore({
    reducer: { product: productReducer, cart: cartsReducer },
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<RootState>();
export default store