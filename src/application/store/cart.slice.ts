import { Cart, CartItem } from "@/domain/entities/Cart";
import { Product } from "@/domain/entities/Product";
import { cartUseCases } from "@/domain/usecases/CartUseCase";
import { cartMockRepository } from "@/infrastructure/mocks/CartRepositoryMockImpl";
import { cartRepository } from "@/infrastructure/repositories/CartRepositoryImpl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ErrorPayload {
  message: string;
}

// Définition du store initiale
const initialState = {
  cart: { items: [] as CartItem[], totalPrice: 0 },
  loading: false,
  error: null as ErrorPayload | null,
};

// On passe en paramètre le repository qu'on veut utiliser pour traiter ou récupérer notre donnée
const useCases = cartUseCases(
  process.env.NODE_ENV === "test" ? cartMockRepository : cartRepository,
);

// Thunk redux dans lequel on va faire appele au repository pour récupérer les données ou les modifier

export const getCart = createAsyncThunk<
  Cart,
  undefined,
  { rejectValue: ErrorPayload }
>("cart/getCart", async (_, { rejectWithValue }) => {
  try {
    const result = await useCases.getCart();

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({
        message: error.message,
      });
    } else {
      return rejectWithValue({
        message: "Failed to get cart",
      });
    }
  }
});
export const addToCart = createAsyncThunk<
  CartItem,
  Product,
  { rejectValue: ErrorPayload }
>("cart/addToCart", async (product, { rejectWithValue }) => {
  try {
    const result = await useCases.addToCart(product);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({
        message: error.message,
      });
    } else {
      return rejectWithValue({
        message: "Failed to get cart",
      });
    }
  }
});
export const clearCart = createAsyncThunk<
  Cart,
  undefined,
  { rejectValue: ErrorPayload }
>("cart/resetCart", async (_, { rejectWithValue }) => {
  try {
    const emptyCart=await useCases.resetCart();

    return emptyCart;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({
        message: error.message,
      });
    } else {
      return rejectWithValue({
        message: "Failed to reset cart",
      });
    }
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        const existingProduct = state.cart.items.find(
          (item) => item.productId === action.payload.productId,
        );

        if (existingProduct) {
          existingProduct.quantity += action.payload.quantity;

          state.cart.totalPrice += action.payload.price;
        } else {
          state.cart.items.push(action.payload);
          state.cart.totalPrice += action.payload.price;
        }

        state.loading = false;
        state.error = null;
      })

      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;

        state.cart = action.payload;
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null; // Réinitialisation de l'erreur à chaque nouvelle requête
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
          state.error = null; // Réinitialisation de l'erreur en cas de succès
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: ReturnType<typeof clearCart.rejected>) => {
          const errorMessage = action.payload?.message;
          state.loading = false;
          state.error = { message: errorMessage! }; // Stockage du message d'erreur
        },
      );
  },
});
export default cartSlice.reducer;
export type CartState = ReturnType<typeof cartSlice.reducer>;
