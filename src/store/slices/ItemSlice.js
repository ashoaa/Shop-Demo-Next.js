import { createSlice } from "@reduxjs/toolkit";
const initialItemState = {
  count: 0,
};

export const itemSlice = createSlice({
  name: "item",
  initialState: initialItemState,
  reducers: {
    setInitialCount: (state) => {
      if (localStorage.getItem("count")) {
        state.count = parseInt(localStorage.getItem("count"));
      } else {
        state.count = 0;
      }
    },
    addItem: (state) => {
      state.count++;
    },
    removeItem: (state) => {
      if (state.count > 0) {
        state.count--;
      }
    },
  },
});

export const itemActions = itemSlice.actions;
