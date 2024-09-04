import {isMobile} from "../../utils/screenDimension";
import CricketMatch20Desktop from "./desktop";
import CricketMatch20Mobile from "./mobile";

const CricketMatch20ComponentList = () => {
  return isMobile ? <CricketMatch20Mobile /> : <CricketMatch20Desktop />;
};

export default CricketMatch20ComponentList;
