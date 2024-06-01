import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchGallery} from "./galleryThunks.ts";
import {selectGalleryLauding, selectPhotoCard} from "./gallerySlice.ts";
import {Grid} from "@mui/material";
import Spinner from "../../UI/components/Spinner/Spinner.tsx";
import PhotoCard from "./components/PhotoCard/PhotoCard.tsx";

const Gallery: React.FC = () => {
  const dispatch = useAppDispatch();
  const photoCards = useAppSelector(selectPhotoCard);
  const lauding = useAppSelector(selectGalleryLauding);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  return (
    <Grid
      container
      marginTop={5}
      justifyContent={"center"}
      flexWrap={"wrap"}
      gap={1}
      flexDirection={"row"}
    >
      {
        lauding
          ? (
            <Grid container justifyContent={"center"}>
              <Spinner/>
            </Grid>
          )
          : (
            photoCards.map((item) => {
              return <PhotoCard key={item._id} item={item} specialFeatures={false}/>;
            })
          )
      }
    </Grid>
  );
};

export default Gallery;