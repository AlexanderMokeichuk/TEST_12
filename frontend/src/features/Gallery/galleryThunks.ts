import {createAsyncThunk} from "@reduxjs/toolkit";
import {PhotoCard} from "../../type";
import axiosApi from "../../axiosApi.ts";

export const fetchGallery = createAsyncThunk<PhotoCard[], undefined>(
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