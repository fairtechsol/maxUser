import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import React from "react";

const CardBox = ({ odds, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.b1,
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
  const renderItem = (item: any, index: number) => (
    <div
      className={`dtlsubTitle back-BackGround ${
        handleLock(item?.gstatus, item?.b1) ? "suspended" : ""
      }`}
      onClick={() => !handleLock(item?.gstatus, item?.b1) && handleBet(item)}
    >
      <span style={{ fontFamily: "auto", fontSize: "30px" }}>
        {index + 1 === 10 ? "0" : index + 1}
      </span>
    </div>
  );
  return (
    <div className="w-100">
      <div
        style={{
          width: "100%",
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          border: "0.3px solid #c7c8ca",
          marginLeft: "5px",
        }}
      >
        <div className="w-100 d-sm-flex flex-row" style={{ height: "30px" }}>
          <div className="cardNumberTitle">
            {" "}
            <div style={{ width: "47%", textAlign: "start" }}></div>
            <div style={{ width: "53%", textAlign: "start" }}>11.2</div>
          </div>
        </div>
        <div className="w-100 d-sm-flex flex-row" style={{ height: "auto" }}>
          {odds?.slice(0, 5)?.map((item: any, index: number) => {
            return (
              <React.Fragment key={index}>
                {renderItem(item, index)}
              </React.Fragment>
            );
          })}
        </div>
        <div className="w-100 d-sm-flex flex-row" style={{ height: "auto" }}>
          {odds?.slice(5, 10)?.map((item: any, index: number) => {
            return (
              <React.Fragment key={index}>
                {renderItem(item, index + 5)}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardBox;
