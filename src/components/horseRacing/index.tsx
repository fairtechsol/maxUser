import {isMobile} from "../../utils/screenDimension";
import HorseRacingListTabsDesktop from "./desktop";
import HorseRacingListTabsMobile from "./mobile";

const HorseRacingComponentList = ({ matchType }: any) => {
  return isMobile ? (
    <HorseRacingListTabsMobile matchType={matchType} />
  ) : (
    <HorseRacingListTabsDesktop matchType={matchType} />
  );
};

export default HorseRacingComponentList;
