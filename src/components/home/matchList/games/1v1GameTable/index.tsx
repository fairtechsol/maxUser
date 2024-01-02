import isMobile from "../../../../../utils/screenDimension";
import DesktopOneVOneGameTable from "./desktop";
import MobileOneVOneGame from "./mobile";
import "./style.scss";

const OneVOneGameTable = () => {
  return (
    <div className="matchListTable">
      {isMobile ? <MobileOneVOneGame /> : <DesktopOneVOneGameTable />}
    </div>
  );
};

export default OneVOneGameTable;
