import {isMobile} from "../../utils/screenDimension";
import TeenPattiDesktop from "./desktop";
import TeenPattiMobile from "./mobile";

const CasinoWarComponentList = () => {
  return isMobile ? (
    <TeenPattiMobile />
  ) : (
    <TeenPattiDesktop  />
  );
};

export default CasinoWarComponentList;
