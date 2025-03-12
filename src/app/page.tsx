"use client";

/* import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cart } from "@/domain/entities/Cart";
import { Product } from "@/domain/entities/Product";

export default function Home() {
  const [cart, setCart] = useState<Cart>({ items: [], totalPrice: 0 });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [cartRes, productsRes] = await Promise.all([
          fetch("/api/cart"),
          fetch("/api/products"),
        ]);

        if (!cartRes.ok || !productsRes.ok) {
          throw new Error("Erreur lors du chargement des données.");
        }

        const [cartData, productsData] = await Promise.all([
          cartRes.json(),
          productsRes.json(),
        ]);

        setCart(cartData);
        setProducts(productsData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addProduct = async (productItem: Product) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productItem),
      });
      const newProduct = await response.json();
      setCart((oldCart) => {
        const existingProduct = oldCart.items.find(
          (item) => item.productId === newProduct.id,
        );

        let updatedItems;
        if (existingProduct) {
          updatedItems = oldCart.items.map((item) =>
            item.productId === newProduct.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  price: item.price + newProduct.price,
                }
              : item,
          );
        } else {
          updatedItems = [
            ...oldCart.items,
            {
              name: newProduct.name,
              quantity: 1,
              price: newProduct.price,
              productId: newProduct.id,
            },
          ];
        }

        return {
          ...oldCart,
          items: updatedItems,
          totalPrice: oldCart.totalPrice + newProduct.price,
        };
      });
    } catch (error) {
      setError(() => error.message);
    }

    setCart((oldCart) => {
      if (!oldCart) return oldCart;

      // Vérifier si le produit existe déjà
      const existingProduct = oldCart.items.find(
        (item) => item.productId === productItem.id,
      );

      let updatedItems;
      if (existingProduct) {
        updatedItems = oldCart.items.map((item) =>
          item.productId === productItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                price: item.price + productItem.price,
              }
            : item,
        );
      } else {
        updatedItems = [
          ...oldCart.items,
          {
            name: productItem.name,
            quantity: 1,
            price: productItem.price,
            productId: productItem.id,
          },
        ];
      }

      return {
        ...oldCart,
        items: updatedItems,
        totalPrice: oldCart.totalPrice + productItem.price,
      };
    });
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className='container mx-auto py-5'>
      <Card className='p-3 mb-9 text-center'>
        <h2 className='text-6xl font-extrabold'>Cart</h2>
        <ul className='p-3 border border-white w-4/12 mx-auto my-4'>
          {cart.items.length > 0 ? (
            cart.items.map((item, id) => (
              <li key={item.name + id}>
                {item.name} - {item.quantity} x {item.price}$ ={" "}
                {item.quantity * item.price}$
              </li>
            ))
          ) : (
            <p>No products in the cart</p>
          )}
        </ul>
        <p className='text-3xl underline underline-offset-4 font-bold'>
          Total: {cart.totalPrice}€
        </p>
      </Card>
      <Card className='p-3 mb-9 text-center'>
        <h2 className='text-6xl mb-9 font-extrabold'>Products</h2>
        <ul className='grid grid-cols-4 gap-3'>
          {products.map((item, id) => (
            <li
              key={item.name + id}
              className='rounded-sm text-center mb-2 p-2 bg-slate-700 items-center'
            >
              <p>
                {item.name} : {item.price}€
              </p>
              {
                <Button
                  type='button'
                  variant={"default"}
                  onClick={(e) => {
                    e.preventDefault();
                    addProduct(item);
                  }}
                >
                  Add to cart
                </Button>
              }
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
} */

import { getCart } from "@/application/store/cart.slice";
import { getProducts } from "@/application/store/product.slice";
import { useAppDispatch, useAppSelector } from "@/application/store/store";
import CartItemsList from "@/presentation/components/CartItemsList";
import ProductItemsList from "@/presentation/components/ProductItemsList";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const products = useAppSelector((state) => state.product.products);

  useEffect(() => {
   
      dispatch(getCart());
      dispatch(getProducts());
    
  }, []);

  return (
    <div className='container mx-auto py-5'>
      <CartItemsList cart={cart} />
      <ProductItemsList products={products} />
    </div>
  );
}
