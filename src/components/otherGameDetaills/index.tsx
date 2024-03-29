import isMobile from "../../utils/screenDimension";
import FootballDesktopGameDetail from "./desktop";
import FootballMobileGameDetail from "./mobile";

const FootballGameDetails = () => {


  return isMobile ? <FootballMobileGameDetail /> : <FootballDesktopGameDetail />;
};

export default FootballGameDetails;
