import {createAsyncThunk} from "@reduxjs/toolkit";
import {FormState, PhotoCardApi} from "../../type";
import axiosApi from "../../axiosApi.ts";

export const postPhotoCard = createAsyncThunk<void, FormState>(
  "gallery/postPhotoCard",
  async (data) => {
    const formData = new FormData();

    const keys = Object.keys(data) as (keyof FormState)[];
    keys.forEach(key => {
      const value = data[key];
      if (value !== null) formData.append(key, value);
    });

    try {
      await axiosApi.post('/photoCards', formData);
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchGallery = createAsyncThunk<PhotoCardApi[], undefined>(
  "gallery/fetchGallery",
  async () => {
    try {
      const {data: response} = await axiosApi.get("/photoCards");
      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
);

export const fetchGalleryByQuery = createAsyncThunk<PhotoCardApi[], string>(
  "gallery/fetchGalleryByQuery",
  async (id) => {
    try {
      const {data: response} = await axiosApi.get(`/photoCards?user=${id}`);
      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
);


export const deletePhotoCards = createAsyncThunk<void, string>(
  "gallery/deletePhotoCards",
  async (id) => {
    try {
      await axiosApi.delete(`/photoCards/${id}`);
    } catch (e) {
      console.log(e);
    }
  }
);