import { createSlice } from "@reduxjs/toolkit";
import { ResponseGetUsers } from "../../interface/users/usersInterface";
interface IUsersState {
  lstUsers: ResponseGetUsers[];
  user: ResponseGetUsers | null;
  modalMap: boolean;
}
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    lstUsers: [],
    user: null,
    modalMap: false,
  } as IUsersState,
  reducers: {
    onLoadLstUsers: (state, { payload }) => {
      state.lstUsers = payload;
    },
    onAddUser: (state, { payload }) => {
      state.lstUsers = [...state.lstUsers, payload];
    },
    onDeleteUser: (state, { payload }) => {
      state.lstUsers = state.lstUsers.filter((user) => +user.id !== +payload);
    },
    onEditUser: (state, { payload }) => {
      state.lstUsers = state.lstUsers.map((user) => {
        if (user.id === payload.id) {
          return payload;
        }
        return user;
      });
    },
    onSelectUser: (state, { payload }) => {
      state.user = payload;
    },
    onChangeModalMap: (state, { payload }) => {
      state.modalMap = payload;
    },
  },
});

export const {
  onLoadLstUsers,
  onAddUser,
  onDeleteUser,
  onEditUser,
  onSelectUser,
  onChangeModalMap,
} = usersSlice.actions;
