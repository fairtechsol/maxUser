import { useEffect, useState } from "react";
// import {isMobile} from "../../../utils/screenDimension";
import DesktopTopBar from "./desktop";
import MobileTopBar from "./mobile";
import "./style.scss";

const TopBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1199);
    };

    // Add event listener to update isMobile on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="text-uppercase ">
      {isMobile ? <MobileTopBar /> : <DesktopTopBar />}
    </div>
  );
};

export default TopBar;
