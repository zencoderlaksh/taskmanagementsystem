import React from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import AppRoutes from "./routes/AppRoutes";
import { logout } from "./redux/authSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <header className="p-4 flex justify-end">
        <Button onClick={toggleColorMode} className="me-2">
          {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      <AppRoutes />
    </div>
  );
};

export default App;
