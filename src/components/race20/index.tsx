import {isMobile} from "../../utils/screenDimension";
import Race20Desktop from "./desktop";
import Race20Mobile from "./mobile";


const Race20ComponentList = () => {
  return isMobile ? (
    <Race20Mobile  />
  ) : (  
    <Race20Desktop  />
  );
};

export default Race20ComponentList;
