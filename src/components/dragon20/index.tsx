import isMobile from "../../utils/screenDimension";
import DragonTigerDesktop from "./desktop";
import DragonTigerMobile from "./mobile";

const DragonTigerComponentList = ({ matchType }: any) => {
  return isMobile ? (
    <DragonTigerMobile />
  ) : (
    <DragonTigerDesktop />
  );
};

export default DragonTigerComponentList;
