import isMobile from "../../utils/screenDimension";
import Cricket5Desktop from "./desktop";
import Cricket5Mobile from "./mobile";


const Cricket5ComponentList = () => {
  return isMobile ? (
    <Cricket5Mobile  />
  ) : (  
    <Cricket5Desktop  />
  );
};

export default Cricket5ComponentList;
