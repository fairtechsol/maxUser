import { isMobile } from "../../utils/screenDimension";

import CardJDesktop from "./desktop";
import CardJMobile from "./mobile";

const CardJComponentList = () => {
  return isMobile ? <CardJMobile /> : <CardJDesktop />;
};

export default CardJComponentList;
