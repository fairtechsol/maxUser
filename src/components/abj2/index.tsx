import {isMobile} from "../../utils/screenDimension";
import Abj2Desktop from "./desktop";
import Abj2Mobile from "./mobile";


const Abj2ComponentList = () => {
  return isMobile ? (
    <Abj2Mobile  />
  ) : (  
    <Abj2Desktop  />
  );
};

export default Abj2ComponentList;
