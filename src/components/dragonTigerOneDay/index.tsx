import {isMobile} from "../../utils/screenDimension";
import DragonTigerDesktop from "./desktop";
import DragonTigerMobile from "./mobile";

const DragonTigerOneDayComponentList = () => {
  return isMobile ? (
    <DragonTigerMobile/>
  ) : (
    <DragonTigerDesktop />
  );
};

export default DragonTigerOneDayComponentList;
