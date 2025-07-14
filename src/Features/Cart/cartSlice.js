import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(p => p.id === item.id);
      if (existItem) {
        existItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(p => p.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    incrementQty: (state, action) => {
      const item = state.cartItems.find(p => p.id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decrementQty: (state, action) => {
      const item = state.cartItems.find(p => p.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify([]));
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart, // ✅ Export kiya
} = cartSlice.actions;

export default cartSlice.reducer;
