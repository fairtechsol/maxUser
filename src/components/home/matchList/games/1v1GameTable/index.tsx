
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMatchList } from "../../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../../store/store";
import isMobile from "../../../../../utils/screenDimension";
import DesktopOneVOneGameTable from "./desktop";
import MobileOneVOneGame from "./mobile";
import "./style.scss";

const OneVOneGameTable = () => {

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatchList());
  }, []);

  return (
    <div className="matchListTable">
      {isMobile ? (
        <MobileOneVOneGame />
      ) : (
        <DesktopOneVOneGameTable />
      )}
    </div>
  );
};

export default OneVOneGameTable;
