import Home from "./components/pages/Home";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
