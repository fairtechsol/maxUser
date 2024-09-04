import {isMobile} from "../../utils/screenDimension";
import DragonTigerDesktop from "./desktop";
import DragonTigerMobile from "./mobile";

const DragonTigerLionComponentList = () => {
  return isMobile ? (
    <DragonTigerMobile/>
  ) : (
    <DragonTigerDesktop />
  );
};

export default DragonTigerLionComponentList;
