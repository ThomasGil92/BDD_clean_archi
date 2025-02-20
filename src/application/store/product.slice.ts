
import { Product } from "@/domain/entities/Product"
import { productMockRepository } from "@/infrastructure/mocks/ProductRepositoryImpl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import products from "@/infrastructure/mocks/fakeDb.json"
import { productUseCases } from "@/domain/usecases/ProductUseCase";

interface ErrorPayload {
  message: string;
}

// Définition du store initiale
const initialState = {
  products,
  loading: false,
  error: null as ErrorPayload | null,
};

// On passe en paramètre le repository qu'on veut utiliser pour traiter ou récupérer notre donnée
const useCases = productUseCases(productMockRepository);

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
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        const errorMessage = action.payload?.message;
        state.loading = false;
        state.error = { message: errorMessage! };
      })
      
  },
});

export default productSlice.reducer;
export type ProductState = ReturnType<typeof productSlice.reducer>;
