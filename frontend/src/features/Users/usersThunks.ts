import {createAsyncThunk} from "@reduxjs/toolkit";
import {isAxiosError} from "axios";
import axiosApi from "../../axiosApi";
import {GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User, ValidationError} from "../../type";
import {RootState} from "../../app/store";
import {unsetUser} from "./usersSlice.ts";

export const registration = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  "users/registration",
  async (registerMutation, {rejectWithValue}) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];
      keys.forEach(key => {
        const value = registerMutation[key];
        if (value !== null) formData.append(key, value);
      });
      const {data: response} = await axiosApi.post<RegisterResponse>("/users", formData);

      return response.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 422) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>(
  "users/login",
  async (loginMutation, {rejectWithValue}) => {
    try {
      const {data: response} = await axiosApi.post<RegisterResponse>("/users/sessions", loginMutation);
      return response.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const googleLogin = createAsyncThunk<User, string, { rejectValue: GlobalError }>(
  "users/googleLogin",
  async (credential, {rejectWithValue}) => {
    try {
      const {data} = await axiosApi.post<RegisterResponse>("/users/google", {credential});
      return data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  "users/logout",
  async (_, {dispatch}) => {
    await axiosApi.delete("/users/sessions",);
    dispatch(unsetUser());
  },
);