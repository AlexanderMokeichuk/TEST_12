import React, {ChangeEvent, useEffect, useState} from "react";
import {Avatar, Box, Button, Container, Grid, Link, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {RegisterMutation} from "../../type";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {registration} from "./usersThunks.ts";
import {selectRegisterError, unsetError} from "./usersSlice.ts";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileInput from "../../UI/components/FileInput/FileInput";
import InputLabel from "@mui/material/InputLabel";


const initialState: RegisterMutation = {
  email: "",
  password: "",
  avatar: null,
  displayName: "",
};

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>(initialState);

  useEffect(() => {
    dispatch(unsetError());
  }, [dispatch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(registration(state)).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "white",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                name="email"
                type={"email"}
                required
                autoComplete="new-email"
                value={state.email}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError("email"))}
                helperText={getFieldError("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                required
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError("password"))}
                helperText={getFieldError("password")}
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                name="displayName"
                label="Name"
                required
                autoComplete="new-displayName"
                value={state.displayName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError("displayName"))}
                helperText={getFieldError("displayName")}
              />
            </Grid>

            <Grid
              item xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2
              }}
            >
              <InputLabel htmlFor="avatar_image">Avatar</InputLabel>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon/>}
              >
                <FileInput
                  name={"image"}
                  onChange={onChangeFileInput}
                />
              </Button>
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Register;