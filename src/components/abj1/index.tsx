import isMobile from "../../utils/screenDimension";
import Abj1Desktop from "./desktop";
import Abj1Mobile from "./mobile";


const Abj1ComponentList = () => {
  return isMobile ? (
    <Abj1Mobile  />
  ) : (  
    <Abj1Desktop  />
  );
};

export default Abj1ComponentList;
