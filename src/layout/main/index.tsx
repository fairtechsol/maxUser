// import { GiHamburgerMenu } from 'react-icons/gi';
import { Outlet, useNavigate } from "react-router-dom";
import isMobile from "../../utils/screenDimension";
import "../layout.scss";
import Header from "./header";
import Sidebar from "./sidebar";
import TopBar from "./topbar";
function MainLayout() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("userToken")) {
  //     navigate("/login");
  //   }
  // }, []);

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
