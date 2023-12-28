import isMobile from "../../utils/screenDimension";
import DesktopMatchList from "./matchList/desktop";
import SportsFilters from "./sportsFilters";

const MatchList = () => {
  return <>{isMobile ? <SportsFilters /> : <DesktopMatchList />}</>;
};

export default MatchList;
