import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  modal: boolean;
};
export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    modal: false,
  } as UiState,
  reducers: {
    onChangeDialog: (state, { payload }) => {
      state.modal = payload;
    },
  },
});

export const { onChangeDialog } = uiSlice.actions;
