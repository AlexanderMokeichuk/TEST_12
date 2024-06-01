import React, {PropsWithChildren} from "react";
import {Alert, AlertTitle, Typography} from "@mui/material";

const OwnAlert: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <Alert severity="info" sx={{width: "100%", margin: "auto"}}>
      <AlertTitle>Info</AlertTitle>
      <Typography variant={"h6"}>
        {children}
      </Typography>
    </Alert>
  );
};

export default OwnAlert;