
import { useEffect } from "react";
import isMobile from "../../../../../utils/screenDimension";
import DesktopOneVOneGameTable from "./desktop";
import MobileOneVOneGame from "./mobile";
import "./style.scss";
import { getMatchList } from "../../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../../store/store";
import { useDispatch } from "react-redux";

const OneVOneGameTable = ({ data }: any) => {

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatchList());
  }, []);

  return (
    <div className="matchListTable">
      {isMobile ? (
        <MobileOneVOneGame data={data} />
      ) : (
        <DesktopOneVOneGameTable />
      )}
    </div>
  );
};

export default OneVOneGameTable;
