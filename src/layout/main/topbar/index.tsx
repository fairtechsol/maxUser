import isMobile from "../../../utils/screenDimension";
import DesktopTopBar from "./desktop";
import MobileTopBar from "./mobile";
import "./style.scss";

const TopBar = () => {
  return (
    <div className="text-uppercase">
      {isMobile ? <MobileTopBar /> : <DesktopTopBar />}
    </div>
  );
};

export default TopBar;
