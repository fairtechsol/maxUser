import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import { isMobile } from "../../../../utils/screenDimension";
import "../../desktop/style.scss";

const BackLay = ({ matchOddsData, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet = (item: any, type: any) => {
    let team = {
      bettingType: type === "back" ? "BACK" : "LAY",
      matchId: data?.id,
      odd: type === "back" ? item?.b1 : item?.l1,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nation,
      name: item?.nation,
      bettingName: "Match odds",
      selectionId: item?.sid,
      min:parseFloat(item?.min),
      max:parseFloat(item?.max)
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
        className={`dtlsubTitle ${type}-BackGround ${
          handleLock(item?.gstatus, item?.b1) ? "lock-32" : ""
        } `}
        onClick={() =>
          !handleLock(item?.gstatus, item?.b1) && handleBet(item, "back")
        }
      >
        {item?.b1}
      </div>
    ) : (
      <div
        className={`dtlsubTitle ${type}-BackGround ${
          handleLock(item?.gstatus, item?.l1) ? "lock-32" : ""
        } `}
        onClick={() =>
          !handleLock(item?.gstatus, item?.l1) && handleBet(item, "lay")
        }
      >
        {item?.l1}
      </div>
    );

    useEffect(() => {
      if (matchOddsData?.[0]?.gstatus !== "ACTIVE" || matchOddsData?.[0]?.b1 === "0.00") {
        dispatch(selectedBetAction(""));
      } 
      
    }, [matchOddsData?.[0]?.gstatus,matchOddsData?.[0]?.b1]);
  
  return (
    <div className="w-100">
      <div
        style={{
          width: "100%",
          // marginTop: "3.3%",
          display: "flex",
          flexDirection: "column",
          borderLeft: "0.3px solid #c7c8ca",
          borderTop: "0.3px solid #c7c8ca",
          marginLeft: "5px",
        }}
      >
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
          style={{ height: "40px" }}
        >
          <div className="dtlTitle">
          </div>
          <div className="dtlsubTitle back-BackGround ">Back</div>
          <div className="dtlsubTitle lay-BackGround ">Lay</div>
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex"}
          // style={{ height: "30px" }}
        >
          <span className="dtlTitle lh-1">
            <div className="profitLoss-Text">
              <span className="">Player 8</span>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      ? JSON.parse(
                          data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                        )["player8"] > 0
                        ? "color-green"
                        : JSON.parse(
                            data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                          )["player8"] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    ? JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )["player8"]
                    : <br></br>
                  : 0}
              </span>
            </div>
          </span>

          {renderItem(matchOddsData?.[0], 0, "back")}
          {renderItem(matchOddsData?.[0], 1, "lay")}
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
          // style={{ height: "30px" }}
        >
          <span className="dtlTitle lh-1">
            <div className="profitLoss-Text">
              <span className="">Player 9</span>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      ? JSON.parse(
                          data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                        )["player9"] > 0
                        ? "color-green"
                        : JSON.parse(
                            data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                          )["player9"] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    ? JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )["player9"]
                    : <br></br>
                  : 0}
              </span>
            </div>
          </span>
          {renderItem(matchOddsData?.[1], 2, "back")}
          {renderItem(matchOddsData?.[1], 3, "lay")}
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
          // style={{ height: "30px" }}
        >
          <span className="dtlTitle lh-1">
            <div className="profitLoss-Text">
              <span className="">Player 10</span>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      ? JSON.parse(
                          data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                        )["player10"] > 0
                        ? "color-green"
                        : JSON.parse(
                            data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                          )["player10"] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    ? JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )["player10"]
                    : <br></br>
                  : 0}
              </span>
            </div>
          </span>
          {renderItem(matchOddsData?.[2], 2, "back")}
          {renderItem(matchOddsData?.[2], 3, "lay")}
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
          // style={{ height: "30px" }}
        >
          <span className="dtlTitle lh-1">
            <div className="profitLoss-Text">
              <span className="">Player 11</span>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      ? JSON.parse(
                          data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                        )["player11"] > 0
                        ? "color-green"
                        : JSON.parse(
                            data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                          )["player11"] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    ? JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )["player11"]
                    : <br></br>
                  : 0}
              </span>
            </div>
          </span>
          {renderItem(matchOddsData?.[3], 2, "back")}
          {renderItem(matchOddsData?.[3], 3, "lay")}
        </div>
      </div>
    </div>
  );
};

export default BackLay;
