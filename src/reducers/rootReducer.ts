import { uiSlice } from "./ui/uiSlice";
import { usersSlice } from "./users/userslice";

export const rootReducer = {
  usersSlice: usersSlice.reducer,
  uiSlice: uiSlice.reducer,
};
