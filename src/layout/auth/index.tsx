import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("userToken")) {
      if (sessionStorage.getItem("forceChangePassword") == "true") {
        navigate("/change-password");
      } else {
        navigate("/home");
      }
    }
  }, []);
  return <Outlet />;
}
