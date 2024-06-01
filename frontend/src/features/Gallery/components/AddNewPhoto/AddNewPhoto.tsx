import React, {ChangeEvent, FormEvent, useState} from "react";
import {Button, Grid, IconButton, Snackbar, TextField} from "@mui/material";
import FileInput from "../../../../UI/components/FileInput/FileInput.tsx";
import CloseIcon from "@mui/icons-material/Close";
import {useAppDispatch} from "../../../../app/hooks.ts";
import {FormState} from "../../../../type";
import {postPhotoCard} from "../../galleryThunks.ts";
import {useNavigate} from "react-router-dom";

const defaultState: FormState = {
  title: "",
  image: null,
};

const AddNewPhoto: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = useState<FormState>(defaultState);

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setFormState(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setOpen(true);
    await dispatch(postPhotoCard(formState));
    setFormState(defaultState);
    navigate("/MyGallery");
  };


  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}/>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small"/>
      </IconButton>
    </React.Fragment>
  );
  return (
    <Grid
      container
      justifyContent={"center"}
      gap={3}
      bgcolor={"white"}
      padding={5}
      borderRadius={4}
      mt={5}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="New photo added"
        action={action}
      />

      <form onSubmit={onSubmit}>
        <Grid
          item
          sx={{
            width: 700,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <FileInput
            name={"image"}
            onChange={onChangeFileInput}
          />

          <TextField
            id="input-with-sx"
            name={"title"}
            label="Title"
            required

            value={formState.title}
            onChange={onChangeForm}
          />

          <Button
            variant="contained"
            aria-label="Basic button group"
            type={"submit"}
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: "auto"
            }}
          >
            Send
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default AddNewPhoto;