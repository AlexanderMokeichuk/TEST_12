import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchGallery} from "./galleryThunks.ts";
import {selectPhotoCard} from "./gallerySlice.ts";

const Gallery: React.FC = () => {
  const dispatch = useAppDispatch();
  const photoCards = useAppSelector(selectPhotoCard);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  return (
    <div>

    </div>
  );
};

export default Gallery;