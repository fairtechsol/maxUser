// import { GiHamburgerMenu } from 'react-icons/gi';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { marqueeNotification } from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import isMobile from "../../utils/screenDimension";
import "../layout.scss";
import Header from "./header";
import Sidebar from "./sidebar";
import TopBar from "./topbar";
function MainLayout() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
    dispatch(marqueeNotification());
  }, []);

  return (
    <>
      <Header />
      <TopBar />
      <div className="d-flex">
        {!isMobile && (
          <div className={`sidebar sidebarActive`}>
            <Sidebar />
          </div>
        )}
        <main className="w-100 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default MainLayout;
