import { useEffect, useState } from "react";
// import {isMobile} from "../../../../../utils/screenDimension";
import DesktopOneVOneGameTable from "./desktop";
import MobileOneVOneGame from "./mobile";
import "./style.scss";

const OneVOneGameTable = ({ id }: any) => {
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
    <div className="matchListTable">
      {isMobile ? (
        <MobileOneVOneGame mTypeid={id} />
      ) : (
        <DesktopOneVOneGameTable mTypeid={id} />
      )}
    </div>
  );
};

export default OneVOneGameTable;
