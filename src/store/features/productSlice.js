import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("productState");
    if (serializedState === null) {
      return { products: [] }; 
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return { products: [] };
  }
};


const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("productState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};


const initialState = loadState();

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      saveState(state); 
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      saveState(state); 
    },
    clearProducts: (state) => {
      state.products = [];
      saveState(state); 
    },
  },
});

export const { addProduct, removeProduct, clearProducts } = productSlice.actions;

export default productSlice;
