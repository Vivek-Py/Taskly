import React from "react";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
