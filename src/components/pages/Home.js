import React, { useContext } from "react";
import Header from "../layouts/Header";
import SignIn from "./SignIn";
import TodoList from "./TodoList";
import { AuthContext } from "../../context/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@mui/material";

const Home = () => {
  const { user, loading } = useContext(AuthContext);

  // ローディング時
  if (loading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 10 }}>
        Loading...
      </Typography>
    );
  }

  // 未ログイン時
  if (!user) {
    return <SignIn />;
  }

  //  ログイン時
  return (
    <>
      <CssBaseline />
      <Header />
      <TodoList />
    </>
  );
};

export default Home;
