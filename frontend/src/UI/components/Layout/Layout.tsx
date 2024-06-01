import React from "react";
import {Container, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import AppToolbar from "../AppToolbar/AppToolbar";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header style={{
        background: "#8A2BE2",
        padding: 5,
      }}>
        <Container>
          <Grid container alignItems={"center"} justifyContent={"space-between"}>
            <Link to={"/"} style={{
              textDecoration: "none",
              fontSize: 20,
              fontWeight: 600,
              color: "black"
            }}
            >
              Cocktail
            </Link>

            <AppToolbar />
          </Grid>
        </Container>
      </header>
      <Grid
        container
        minHeight={"100vh"}
        direction={"column"}
        sx={{background: "black"}}
      >
        <Container>
          {children}
        </Container>
      </Grid>
    </>
  );
};

export default Layout;