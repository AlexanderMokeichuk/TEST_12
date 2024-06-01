import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../Users/usersSlice.ts";
import {selectGalleryLauding, selectPhotoCard} from "./gallerySlice.ts";
import {fetchGalleryByQuery} from "./galleryThunks.ts";
import {Button, Grid} from "@mui/material";
import Spinner from "../../UI/components/Spinner/Spinner.tsx";
import PhotoCard from "./components/PhotoCard/PhotoCard.tsx";
import {Link, useParams} from "react-router-dom";
import OwnAlert from "../../UI/components/OwnAlert/OwnAlert.tsx";

const MyGallery: React.FC = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const photoCards = useAppSelector(selectPhotoCard);
  const lauding = useAppSelector(selectGalleryLauding);

  useEffect(() => {
    if (user) {
      if (id) {
        dispatch(fetchGalleryByQuery(id));
      } else {
        dispatch(fetchGalleryByQuery(user._id));
      }
    }
  }, [user, dispatch, id]);

  let showButton = false;
  if (!id) {
    showButton = true;
  } else if (id === user?._id) {
    showButton = true;
  }

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
          : photoCards.length
            ?
            (
              <Grid item sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
                <Button variant={"outlined"} color={"secondary"} sx={
                  showButton
                    ? {
                      marginBottom: 2,
                      marginLeft: "auto"
                    }
                    : {
                      display: "none",
                    }
                }>
                  <Link to={"/new-photo"} style={{textDecoration: "none"}}>
                    Add Photo
                  </Link>
                </Button>
                <Grid item sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                }}>
                  {
                    photoCards.map((item) => {
                      return <PhotoCard key={item._id} item={item} specialFeatures={true} id={id}/>;
                    })
                  }
                </Grid>
              </Grid>
            )
            : (
              <>
                <Button variant={"outlined"} color={"secondary"} sx={
                  showButton
                    ? undefined
                    : {
                      display: "none",
                    }
                }>
                  <Link to={"/new-photo"} style={{textDecoration: "none"}}>
                    Add Photo
                  </Link>
                </Button>
                <OwnAlert>Gallery is empty</OwnAlert>
              </>
            )
      }
    </Grid>
  );
};

export default MyGallery;