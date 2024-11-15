import {isMobile} from "../../utils/screenDimension";
import BollywoodTableDesktop from "./desktop";
import BollywoodTableMobile from "./mobile";
const BollywoodTableComponentList = () => {
  return isMobile ? <BollywoodTableMobile /> : <BollywoodTableDesktop />;
};

export default BollywoodTableComponentList;
