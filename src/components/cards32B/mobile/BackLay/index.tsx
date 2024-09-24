import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import {isMobile} from "../../../../utils/screenDimension";
import SmoothDropdownModal from "../minMaxModal";
import { IoInformationCircle } from "react-icons/io5";
import { useState,useEffect } from "react";

const BackLay = ({ matchOddsData, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
  const min = matchOddsData?.[0]?.min;
  const max = matchOddsData?.[0]?.max;
  const handleBet = (item: any, type: any) => {
    let team = {
      bettingType: type === "back" ? "BACK" : "LAY",
      matchId: data?.id,
      odd: type === "back" ? item?.b1 : item?.l1,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: item?.sid,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  const handleLock = (status: any, value: any) => {
    if (status != "ACTIVE" || value === "0.00") {
      return true;
    } else {
      return false;
    }
  };
  const renderItem = (item: any, index: number, type: any) =>
    type === "back" ? (
      <div
        className={`dtlsubTitle title-14 ${type}-BackGround ${
          handleLock(item?.gstatus, item?.b1) ? "suspended" : ""
        }`}
        onClick={() =>
          !handleLock(item?.gstatus, item?.b1) && handleBet(item, "back")
        }
      >
        {item?.b1}
      </div>
    ) : (
      <div
        className={`dtlsubTitle ${type}-BackGround ${
          handleLock(item?.gstatus, item?.l1) ? "suspended" : ""
        }`}
        onClick={() =>
          !handleLock(item?.gstatus, item?.l1) && handleBet(item, "lay")
        }
      >
        {item?.l1}
      </div>
    );

  useEffect(() => {
    if (
      matchOddsData?.[0]?.gstatus !== "ACTIVE" ||
      matchOddsData?.[0]?.b1 === "0.00"
    ) {
      dispatch(selectedBetAction(""));
    }
  }, [matchOddsData?.[0]?.gstatus, matchOddsData?.[0]?.b1]);

  return (
    <div className="w-100">
      <div
        style={{
          width: "100%",
          marginTop: "5%",
          display: "flex",
          flexDirection: "column",
          border: "0.3px solid #c7c8ca",
          marginLeft: "5px",
        }}
      >
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
          style={{ height: "30px" }}
        >
          <div className="dtlTitle">
          </div>
          <div className="dtlsubTitle back-BackGround title-12">Back</div>
          <div className="dtlsubTitle lay-BackGround title-12">Lay</div>
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
          style={{ height: "30px" }}
        >
          <div className="dtlTitle title-12">Player 8 </div>
          {renderItem(matchOddsData?.[0], 0, "back")}
          {renderItem(matchOddsData?.[0], 1, "lay")}
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
          style={{ height: "30px" }}
        >
          <div className="dtlTitle title-12"> Player 9</div>
          {renderItem(matchOddsData?.[1], 2, "back")}
          {renderItem(matchOddsData?.[1], 3, "lay")}
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
          style={{ height: "30px" }}
        >
          <div className="dtlTitle title-12"> Player 10</div>
          {renderItem(matchOddsData?.[2], 2, "back")}
          {renderItem(matchOddsData?.[2], 3, "lay")}
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
          style={{ height: "30px" }}
        >
          <div className="dtlTitle title-12"> Player 11</div>
          {renderItem(matchOddsData?.[3], 2, "back")}
          {renderItem(matchOddsData?.[3], 3, "lay")}
        </div>
      </div>
    </div>
  );
};

export default BackLay;
