import {isMobile} from "../../utils/screenDimension";
import Poker20Desktop from "./desktop";
import Poker20Mobile from "./mobile";


const Poker20ComponentList = () => {
  return isMobile ? (
    <Poker20Mobile  />
  ) : (  
    <Poker20Desktop  />
  );
};

export default Poker20ComponentList;