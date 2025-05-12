import { isMobile } from "../../utils/screenDimension";
import AmarAkbarAnthonyDesktop from "./desktop";
import AmarAkbarAnthonyMobile from "./mobile";

const AmarAkbarAnthonyComponentList = () => {
  return isMobile ? <AmarAkbarAnthonyMobile /> : <AmarAkbarAnthonyDesktop />;
};

export default AmarAkbarAnthonyComponentList;
