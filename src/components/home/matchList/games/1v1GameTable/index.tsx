import { useEffect, useState } from "react";
import DesktopOneVOneGameTable from "./desktop";
import MobileOneVOneGame from "./mobile";
import "./style.scss";

const OneVOneGameTable = ({ id }: any) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1199);
    };

    window.addEventListener("resize", handleResize);

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
