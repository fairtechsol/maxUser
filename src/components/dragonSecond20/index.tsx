import isMobile from "../../utils/screenDimension";
import DragonTigerDesktop from "./desktop";
import DragonTigerMobile from "./mobile";

const DragonTigerSecondComponentList = ({ matchType }: any) => {
  return isMobile ? (
    <DragonTigerMobile matchType={matchType} />
  ) : (
    <DragonTigerDesktop />
  );
};

export default DragonTigerSecondComponentList;
