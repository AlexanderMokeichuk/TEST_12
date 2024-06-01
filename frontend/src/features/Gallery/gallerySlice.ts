import {PhotoCard} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchGallery} from "./galleryThunks.ts";

interface GallerySlice {
  photoCards: PhotoCard[],
  galleryLauding: boolean;
}

const InitialState: GallerySlice = {
  photoCards: [],
  galleryLauding: false,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGallery.pending, (state) => {
      state.galleryLauding = true;
    }).addCase(fetchGallery.fulfilled, (state, {payload: photoCards}: PayloadAction<PhotoCard[]>) => {
      state.photoCards = photoCards;
      state.galleryLauding = false;
    }).addCase(fetchGallery.rejected, (state) => {
      state.galleryLauding = false;
    });
  },
});

export const galleryReducer = gallerySlice.reducer;

export const selectPhotoCard = (state: RootState) => state.gallery.photoCards;
export const selectGalleryLauding = (state: RootState) => state.gallery.galleryLauding;
