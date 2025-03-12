
import { Product } from "@/domain/entities/Product"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productUseCases } from "@/domain/usecases/ProductUseCase";
import { productRepository } from "@/infrastructure/repositories/ProductRepositoryImpl";

interface ErrorPayload {
  message: string;
}

// Définition du store initiale
const initialState = {
  products:[] as Product[],
  loading: false,
  error: null as ErrorPayload | null,
};

// On passe en paramètre le repository qu'on veut utiliser pour traiter ou récupérer notre donnée
const useCases = productUseCases(productRepository);

// Thunk redux dans lequel on va faire appele au repository pour récupérer les données ou les modifier

export const getProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: ErrorPayload }
>("product/getproducts", async (_, { rejectWithValue }) => {
  try {
    return await useCases.getProducts();
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({
        message: error.message,
      });
    } else {
      return rejectWithValue({
        message: "Failed to get product",
      });
    }
  }
});


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
  },
});
export default productSlice.reducer;
export type ProductState = ReturnType<typeof productSlice.reducer>;
