import isMobile from "../../utils/screenDimension";
import HorseRacingTabsDesktop from "./desktop";
import HorseRacingTabsMobile from "./mobile";


const HorseRacingComponent = () => {

      return isMobile ? (
    <HorseRacingTabsMobile />
  ) : (
    <HorseRacingTabsDesktop />
  );

};

export default HorseRacingComponent;