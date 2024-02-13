import React from "react";
import { Button } from "@mui/material";

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  return (
    <div>
      <Button
          onClick={handleLogin}
          variant="contained"
          color="primary"
          data-testid="LoginButton-Button"
      >
          Login
      </Button>
    </div>
  );
};

export default LoginButton;