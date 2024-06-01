import React, {useEffect, useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {LoginMutation} from "../../type";
import {Alert, Avatar, Box, Button, Container, Grid, Link, TextField, Typography} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLoginError, unsetError} from "./usersSlice.ts";
import {googleLogin, login} from "./usersThunks.ts";
import {GoogleLogin} from "@react-oauth/google";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const navigate = useNavigate();
  const [state, setState] = useState<LoginMutation>({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(unsetError());
  }, [dispatch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate("/");
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate("/");
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
          <LockOpenIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && (
          <Alert severity={"error"} sx={{mt: 5, width: "100%"}}>{error.error}</Alert>
        )}
        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                name="email"
                autoComplete="new-email"
                value={state.email}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Box sx={{
              pt: 2,
              m: "auto",
            }}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    void googleLoginHandler(credentialResponse.credential);
                  }
                }}
                onError={() => console.log('Login error.')}
              />
            </Box>

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
              <Link component={RouterLink} to="/register" variant="body2">
                Or register?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;