import {isMobile} from "../../utils/screenDimension";
import DragonTigerDesktop from "./desktop";
import DragonTigerMobile from "./mobile";

const DragonTigerSecondComponentList = () => {
  return isMobile ? (
    <DragonTigerMobile/>
  ) : (
    <DragonTigerDesktop />
  );
};

export default DragonTigerSecondComponentList;
