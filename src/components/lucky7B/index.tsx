import {isMobile} from "../../utils/screenDimension";
import Lucky7BDesktop from "./desktop";
import Lucky7BMobile from "./mobile";


const Lucky7BComponentList = () => {
  return isMobile ? (
    <Lucky7BMobile  />
  ) : (  
    <Lucky7BDesktop  />
  );
};

export default Lucky7BComponentList;
