import {isMobile} from "../../utils/screenDimension";
import Poker1DayDesktop from "./desktop";
import Poker1DayMobile from "./mobile";

const Poker1DayComponentList = () => {
  return isMobile ? (
    <Poker1DayMobile />
  ) : (
    <Poker1DayDesktop  />
  );
};

export default Poker1DayComponentList;
