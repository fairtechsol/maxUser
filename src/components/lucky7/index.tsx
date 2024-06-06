import isMobile from "../../utils/screenDimension";
import Lucky7Desktop from "./desktop";
import Lucky7Mobile from "./mobile";


const Lucky7ComponentList = () => {
  return isMobile ? (
    <Lucky7Mobile  />
  ) : (  
    <Lucky7Desktop  />
  );
};

export default Lucky7ComponentList;
