import {isMobile} from "../../utils/screenDimension";
import Poker6Desktop from "./desktop";
import Poker6Mobile from "./mobile";


const PokerComponentList = () => {
  return isMobile ? (
    <Poker6Mobile  />
  ) : (  
    <Poker6Desktop  />
  );
};

export default PokerComponentList;
