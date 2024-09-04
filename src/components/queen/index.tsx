import {isMobile} from "../../utils/screenDimension";
import QueenDesktop from "./desktop";
import QueenMobile from "./mobile";


const QueenComponentList = () => {
  return isMobile ? (
    <QueenMobile  />
  ) : (  
    <QueenDesktop  />
  );
};

export default QueenComponentList;
