"use client";
import { addToCart } from "@/application/store/cart.slice";
import { useAppDispatch, useAppSelector } from "@/application/store/store";

import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const data=useAppSelector(state => state.cart.cart);
  useEffect(() => {
    dispatch(addToCart({ id: "1", name: "test", price: 10, stock: 1 }));
  }, []);
  return <div>Hello <div>{data && JSON.stringify(data)}</div></div>;
}
