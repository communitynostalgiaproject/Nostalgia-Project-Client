import React from "react";
import { Button } from "@mui/material";

interface LoginButtonProps {
  handleLogin: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ handleLogin }) => {

  return (
    <Button
        onClick={handleLogin}
        variant="contained"
        color="primary"
        data-testid="LoginButton-Button"
    >
        Login
    </Button>
  );
};

export default LoginButton;