import isMobile from "../../utils/screenDimension";
import HorseRacingListTabsDesktop from "./desktop";
import HorseRacingListTabsMobile from "./mobile";

const HorseRacingComponentList = () => {
  return isMobile ? (
    <HorseRacingListTabsMobile />
  ) : (
    <HorseRacingListTabsDesktop />
  );
};

export default HorseRacingComponentList;
