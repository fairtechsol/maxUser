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


// {
//   "id": "baccarat",
//   "name": "Baccarat",
//   "link": "/card3-list/baccarat",
//   "type": "desktop"
// },
// {
//   "id": "32cards",
//   "name": "32 Cards",
//   "link": "/card3-list/cards32",
//   "type": "desktop"
// },
// {
//   "id": "teenPatti",
//   "name": "Teen Patti",
//   "link": "/card3-list/teenPatti",
//   "type": "desktop"
// },
// {
//   "id": "poker",
//   "name": "Poker",
//   "link": "/card3-list/poker",
//   "type": "desktop"
// },
// {
//   "id": "lucky7",
//   "name": "Lucky 7",
//   "link": "/card3-list/lucky7",
//   "type": "desktop"
// }