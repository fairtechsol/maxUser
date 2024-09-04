import {isMobile} from "../../utils/screenDimension";
import Baccarat1Desktop from "./desktop";
import Baccarat1Mobile from "./mobile";


const BaccaratComponentList = () => {
  return isMobile ? (
    <Baccarat1Mobile  />
  ) : (  
    <Baccarat1Desktop  />
  );
};

export default BaccaratComponentList;