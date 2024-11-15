import {isMobile} from "../../utils/screenDimension";
import TeenPattiDesktop from "./desktop";
import TeenPattiMobile from "./mobile";

const TeentPattiComponentList = () => {
  return isMobile ? (
    <TeenPattiMobile />
  ) : (
    <TeenPattiDesktop  />
  );
};

export default TeentPattiComponentList;
