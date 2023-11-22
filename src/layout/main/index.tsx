// import { GiHamburgerMenu } from 'react-icons/gi';
import { Outlet } from "react-router-dom";
import "../layout.scss";
import Header from "./header";
import Sidebar from "./sidebar";
import TopBar from "./topbar";
function MainLayout() {
  return (
    <>
      <Header />
      <TopBar />
      <div className={`sidebar sidebarActive`}>
        <Sidebar />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
