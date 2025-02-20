import { Cart, CartItem } from "@/domain/entities/Cart";
import { Product } from "@/domain/entities/Product";
import { cartUseCases } from "@/domain/usecases/CartUseCase";
import { cartMockRepository } from "@/infrastructure/mocks/CartRepositoryImpl";
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
const useCases = cartUseCases(cartMockRepository);

// Thunk redux dans lequel on va faire appele au repository pour récupérer les données ou les modifier

export const getCart = createAsyncThunk<
  Cart,
  void,
  { rejectValue: ErrorPayload }
>("cart/getCart", async (_, { rejectWithValue }) => {
  try {
    return await useCases.getCart();
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
  Cart,
  Product,
  { rejectValue: ErrorPayload }
>("cart/addToCart", async (product, { rejectWithValue }) => {
  try {
    const result = await useCases.addToCart(product);
    console.log("action return", result);
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        const errorMessage = action.payload?.message;
        state.loading = false;
        state.error = { message: errorMessage! };
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        const errorMessage = action.payload?.message;
        state.loading = false;
        state.error = { message: errorMessage! };
      });
  },
});

export default cartSlice.reducer;
export type CartState = ReturnType<typeof cartSlice.reducer>;
