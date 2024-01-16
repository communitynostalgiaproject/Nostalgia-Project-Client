import React from "react";
import { getApiBase } from "../../api/helpers";
import { Button } from "@mui/material";

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = `${getApiBase()}/auth/google`;
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