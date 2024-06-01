import {createSlice} from "@reduxjs/toolkit";
import {GlobalError, User, ValidationError} from "../../type";
import {RootState} from "../../app/store";
import {googleLogin, login, registration} from "./usersThunks.ts";

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean,
  loginError: GlobalError | null,
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
    unsetError: (state) => {
      state.registerError = null;
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(registration.fulfilled, (state, {payload: user}) => {
      state.user = user;
      state.registerLoading = false;
    });
    builder.addCase(registration.rejected, (state, {payload: error}) => {
      state.registerError = error || null;
      state.registerLoading = false;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    }).addCase(login.fulfilled, (state, {payload: user}) => {
      state.user = user;
      state.loginLoading = false;
    }).addCase(login.rejected, (state, {payload: error}) => {
      state.loginError = error || null;
      state.loginLoading = false;
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    }).addCase(googleLogin.fulfilled, (state, {payload: user}) => {
      state.user = user;
      state.loginLoading = false;
    }).addCase(googleLogin.rejected, (state, {payload: error}) => {
      state.loginError = error || null;
      state.loginLoading = false;
    });
  },
});

export const { unsetUser , unsetError} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginError = (state: RootState) => state.users.loginError;
