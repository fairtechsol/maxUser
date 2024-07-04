import isMobile from "../../utils/screenDimension";
import Card32BDesktop from "./desktop";
import Card32BMobile from "./mobile";

const Card32BComponentList = () => {
  return isMobile ? (
    <Card32BMobile/>
  ) : (
    <Card32BDesktop />
  );
};

export default Card32BComponentList;
