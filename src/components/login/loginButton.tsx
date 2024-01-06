import React from "react";
import { Button } from "@mui/material";

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
  };

  return (
    <div>
      <Button
          onClick={handleLogin}
          variant="contained"
          color="primary"
      >
          Login
      </Button>
    </div>
  );
};

export default LoginButton;