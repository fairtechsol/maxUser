import isMobile from "../../../../../utils/screenDimension";
import DesktopOneVOneGameTable from "./desktop";
import MobileOneVOneGame from "./mobile";
import "./style.scss";

const OneVOneGameTable = ({id}: any) => {
  return (
    <div className="matchListTable">
      {isMobile ? <MobileOneVOneGame /> : <DesktopOneVOneGameTable mTypeid={id} />}
    </div>
  );
};

export default OneVOneGameTable;
