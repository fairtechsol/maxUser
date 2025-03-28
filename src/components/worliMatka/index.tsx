import { isMobile } from "../../utils/screenDimension";
import MatkaDesktop from "./desktop";
import MatkaMobile from "./mobile";

const WorliMatkaComponentList = () => {
  return isMobile ? <MatkaMobile /> : <MatkaDesktop />;
};

export default WorliMatkaComponentList;
