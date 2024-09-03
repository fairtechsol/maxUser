import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../main/footer";

export default function AuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("jwtMaxUser")) {
      if (sessionStorage.getItem("forceChangePassword") == "true") {
        navigate("/change-password");
      } else {
        navigate("/home");
      }
    }
  }, []);
  return (
    <div className="main-container">
      <div className="content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
