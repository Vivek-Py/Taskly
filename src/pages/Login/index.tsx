import React from "react";
import Button from "@components/atom/Button";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    await login();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button id="login" onClick={handleLogin} label="Login" />
    </div>
  );
};

export default Login;
