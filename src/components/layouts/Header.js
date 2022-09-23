import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logout } from "../../auth";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Todo App</Typography>
        <Button color="inherit" onClick={logout}>
          ログアウト
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
