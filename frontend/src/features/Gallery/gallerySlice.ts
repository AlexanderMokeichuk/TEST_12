import {PhotoCardApi} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchGallery, fetchGalleryByQuery} from "./galleryThunks.ts";

interface GallerySlice {
  photoCards: PhotoCardApi[],
  galleryLauding: boolean;
}

const InitialState: GallerySlice = {
  photoCards: [],
  galleryLauding: false,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState: InitialState,
  reducers: {
    resetState: (state) => {
      state.photoCards = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGallery.pending, (state) => {
      state.galleryLauding = true;
    }).addCase(fetchGallery.fulfilled, (state, {payload: photoCards}: PayloadAction<PhotoCardApi[]>) => {
      state.photoCards = photoCards;
      state.galleryLauding = false;
    }).addCase(fetchGallery.rejected, (state) => {
      state.galleryLauding = false;
    });

    builder.addCase(fetchGalleryByQuery.pending, (state) => {
      state.galleryLauding = true;
    }).addCase(fetchGalleryByQuery.fulfilled, (state, {payload: photoCards}: PayloadAction<PhotoCardApi[]>) => {
      state.photoCards = photoCards;
      state.galleryLauding = false;
    }).addCase(fetchGalleryByQuery.rejected, (state) => {
      state.galleryLauding = false;
    });
  },
});
export const { resetState } = gallerySlice.actions;

export const galleryReducer = gallerySlice.reducer;

export const selectPhotoCard = (state: RootState) => state.gallery.photoCards;
export const selectGalleryLauding = (state: RootState) => state.gallery.galleryLauding;
