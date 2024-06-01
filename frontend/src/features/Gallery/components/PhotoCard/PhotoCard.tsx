import React from "react";
import {Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {PhotoCardApi} from "../../../../type";
import {Link} from "react-router-dom";
import {API_URL} from "../../../../constants.ts";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import imageNotAvailable from "../../../../../public/noImage.png";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {deletePhotoCards, fetchGallery, fetchGalleryByQuery} from "../../galleryThunks.ts";
import {selectUser} from "../../../Users/usersSlice.ts";

interface Props {
  item: PhotoCardApi;
  specialFeatures: boolean,
  id?: string | undefined,
}

const PhotoCard: React.FC<Props> = ({item, specialFeatures, id}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const user = useAppSelector(selectUser);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let cardImage = imageNotAvailable;

  if (item.image !== null) {
    cardImage = API_URL + "/" + item.image;
  }

  const deletePhotoCardApi = async () => {
    if (confirm("Should I delete this cocktail?")) {
      await dispatch(deletePhotoCards(item._id));
      if (user) {
        if (specialFeatures) {
          if (!id) {
            await dispatch(fetchGalleryByQuery(user?._id));
          } else  {
            await dispatch(fetchGalleryByQuery(id));
          }
        } else {
          await dispatch(fetchGallery());
        }
      }
    }
  };

  let deleteComponent = <></>;

  if (!specialFeatures) {
    if (user?.role === "admin") {
      deleteComponent = (
        <IconButton
          type={"button"}
          onClick={deletePhotoCardApi}
          sx={{display: "flex", marginLeft: "auto"}}
        >
          <DeleteIcon/>
        </IconButton>
      );
    }
  } else if (specialFeatures && user?.role === "admin" || user?._id === item.userID._id) {
    deleteComponent = (
      <IconButton
        type={"button"}
        onClick={deletePhotoCardApi}
        sx={{display: "flex", marginLeft: "auto"}}
      >
        <DeleteIcon/>
      </IconButton>
    );
  }


  return (
    <>
      <Grid
        item
        sx={{
          background: "white",
        }}
      >
        <Card onClick={handleClickOpen} sx={{width: 250}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={cardImage}
              alt="image"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" fontSize={16} component="div">
                {item.title}
              </Typography>
              {
                specialFeatures
                  ? undefined
                  : (
                    <Typography gutterBottom variant="h6" fontSize={16} component="div">
                      By: <Link to={`/MyGallery/${item.userID._id}`}>{item.userID.displayName}</Link>
                    </Typography>)
              }
            </CardContent>
          </CardActionArea>
        </Card>
        {deleteComponent}
      </Grid>
      <React.Fragment>
        <Dialog
          maxWidth={"lg"}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              background: "#696969",
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon/>
          </IconButton>
          <Grid
            container
            width={1200}
            height={600}
            bgcolor={"#A9A9A9"}
          >
            <Box
              component="img"
              sx={{
                height: "100%",
                width: "100%",
              }}
              src={cardImage}
            />
          </Grid>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default PhotoCard;