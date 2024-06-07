import isMobile from "../../utils/screenDimension";
import Cards32Desktop from "./desktop";
import Cards32Mobile from "./mobile";


const Cards32ComponentList = () => {
  return isMobile ? (
    <Cards32Mobile  />
  ) : (  
    <Cards32Desktop  />
  );
};

export default Cards32ComponentList;