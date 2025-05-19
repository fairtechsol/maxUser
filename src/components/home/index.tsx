import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
// import {isMobile} from "../../utils/screenDimension";
import Loader from "../commonComponent/loader";
import DesktopMatchList from "./matchList/desktop";
import SportsFilters from "./sportsFilters";
import { useEffect, useState } from "react";

const MatchList = ({ setMatchType, matchType }: any) => {
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
    <>
      {/* {loading && <Loader />} */}
      {isMobile ? (
        <SportsFilters setMatchType={setMatchType} matchType={matchType} />
      ) : (
        <DesktopMatchList setMatchType={setMatchType} matchType={matchType} />
      )}
    </>
  );
};

export default MatchList;
