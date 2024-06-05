import isMobile from "../../utils/screenDimension";
import DragonTigerDesktop from "./desktop";
import DragonTigerMobile from "./mobile";

const DragonTigerComponentList = ({ matchType }: any) => {
  return isMobile ? (
    <DragonTigerMobile matchType={matchType} />
  ) : (
    <DragonTigerDesktop matchType={matchType} />
  );
};

export default DragonTigerComponentList;
