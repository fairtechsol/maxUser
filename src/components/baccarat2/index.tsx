import { isMobile } from "../../utils/screenDimension";
import Baccarat2Desktop from "./desktop";
import Baccarat2Mobile from "./mobile";

const Baccarat2ComponentList = () => {
  return isMobile ? <Baccarat2Mobile /> : <Baccarat2Desktop />;
};

export default Baccarat2ComponentList;
