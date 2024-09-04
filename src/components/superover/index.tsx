import {isMobile} from "../../utils/screenDimension";
import SuperoverDesktop from "./desktop";
import SuperoverMobile from "./mobile";

const SuperoverComponentList = () => {
  return isMobile ? (
    <SuperoverMobile/>
  ) : (
    <SuperoverDesktop />
  );
};

export default SuperoverComponentList;
