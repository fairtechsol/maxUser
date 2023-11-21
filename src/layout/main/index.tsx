// import { GiHamburgerMenu } from 'react-icons/gi';
import { Outlet } from "react-router-dom";
import "../layout.scss";
import TopBar from "./header";
function MainLayout() {
  return (
    <>
      <TopBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
