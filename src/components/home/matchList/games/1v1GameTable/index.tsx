import isMobile from "../../../../../utils/screenDimension";
import DesktopOneVOneGameTable from "./desktop";
import MobileOneVOneGame from "./mobile";
import "./style.scss";
const OneVOneGameTable = ({ data }: any) => {
  return (
    <>
      {isMobile ? (
        <MobileOneVOneGame data={data} />
      ) : (
        <DesktopOneVOneGameTable data={data} />
      )}
    </>
  );
};

export default OneVOneGameTable;
