import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import isMobile from "../../utils/screenDimension";
import Loader from "../commonComponent/loader";
import DesktopMatchList from "./matchList/desktop";
import SportsFilters from "./sportsFilters";
import { useEffect } from "react";

const MatchList = ({ setMatchType, matchType }: any) => {
  const { loading } = useSelector((state: RootState) => state.match.matchList);

  useEffect(() => {
    setMatchType("cricket");
  }, [location.pathname.split("/")[1]]);

  return (
    <>
      {loading && <Loader />}
      {isMobile ? (
        <SportsFilters setMatchType={setMatchType} type={matchType} />
      ) : (
        <DesktopMatchList setMatchType={setMatchType} matchType={matchType} />
      )}
    </>
  );
};

export default MatchList;
