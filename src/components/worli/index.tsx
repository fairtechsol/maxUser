import {isMobile} from "../../utils/screenDimension";
import WorliDesktop from "./desktop";
import WorliMobile from "./mobile";


const WorliComponentList = () => {
  return isMobile ? (
    <WorliMobile  />
  ) : (  
    <WorliDesktop  />
  );
};

export default WorliComponentList;
