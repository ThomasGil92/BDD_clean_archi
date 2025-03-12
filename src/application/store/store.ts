import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart.slice";
import productReducer from "./product.slice";
import {
  useDispatch,
  TypedUseSelectorHook,
  useSelector,
  useStore,
} from "react-redux";

export function makeStore() {
  return configureStore({
    reducer: { product: productReducer,cart: cartReducer },
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<RootState>();
export default store;
