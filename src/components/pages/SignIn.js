import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { login } from "../../auth";

const SignIn = () => {
  return (
    <Box>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Button variant="outlined" onClick={login}>
          グーグルでログイン
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
