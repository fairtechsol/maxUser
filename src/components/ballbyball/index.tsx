import isMobile from "../../utils/screenDimension";
import TeenPattiDesktop from "./desktop";
import TeenPattiMobile from "./mobile";

const BallbyballComponentList = () => {
  return isMobile ? (
    <TeenPattiMobile />
  ) : (
    <TeenPattiDesktop  />
  );
};

export default BallbyballComponentList;
