import React from "react";
import {Alert, AlertTitle, Container, Grid, Typography} from "@mui/material";

const NotFound: React.FC = () => {
  return (
    <Container>
      <Grid container justifyContent={"center"} paddingTop={2}>
        <Alert severity="info" sx={{width: "100%"}}>
          <AlertTitle>Info</AlertTitle>
          <Typography variant={"h3"}>
            Not Found!!
          </Typography>
        </Alert>
      </Grid>
    </Container>
  );
};

export default NotFound;