import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";

const MobileSessionOddEven = ({ title, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();

  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    value: any,
    item: any,
    tno: any,
    teamName?: any
  ) => {
    if (data?.status != "OPEN" || status != "live") {
      return false;
    }
    let team = {
      betOnTeam: betTeam,
      rate: odds,
      type: type,
      stake: 0,
      teamA: detail?.teamA,
      teamB: detail?.teamB,
      teamC: detail?.teamC,
      betId: item?.id,
      name: item?.RunnerName,
      eventType: detail?.matchType,
      matchId: detail?.id,
      percent: value,
      matchBetType: "session",
      betPlaceIndex: tno,
      mid: data?.mid?.toString(),
      teamName:  teamName ,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
 
  return (
    <>
      <div className="sessionNormalContainer">
        <div className="sessionNormalTitle">
          <span className="sessionNormalTitleTxt">{title}</span>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            {data?.section?.map((item: any, index: any) => {
              return (
                <div className="sessionOddEvenRateContainer" key={index}>
                  <div className="sessionRateName">
                    <span className="f-size16">{item?.RunnerName}</span>
                  </div>
                  <div className="sessionRateBoxContainer">
                    {(item?.activeStatus != "live" ||
                      item?.GameStatus != "") && (
                      <div className="suspended-overlayRates">
                        <span
                          className={`${
                            !isMobile ? "f-size18" : "f-size16"
                          } suspendedTxtMatchOdd`}
                        >
                          {item?.GameStatus ?? "SUSPENDED"}
                        </span>
                      </div>
                    )}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRight: "1px solid #c7c8ca",
                      }}
                    >
                      <div
                        className={`sessionRateBox back1Background`}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handlePlaceBet(
                            item?.ex?.availableToLay?.[0]?.price,
                            "Back",
                            "Back",
                            item?.activeStatus,
                            item?.ex?.availableToLay?.[0]?.price,
                            item,
                            item?.ex?.availableToLay?.[0]?.tno,
                            "odd"
                          )
                        }
                      >
                        <span
                          className={`${
                            !isMobile ? "f-size18" : "f-size12"
                          } sessionRate1Box`}
                        >
                          {item?.ex?.availableToLay?.[0]?.price ?? "-"}
                        </span>
                        <span
                          className={`${
                            !isMobile ? "f-size16" : "f-size12"
                          } sessionRate2Box`}
                        >
                          {item?.ex?.availableToLay?.[0]?.size}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        className="sessionRateBox back1Background"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handlePlaceBet(
                            item?.ex?.availableToBack?.[0]?.price,
                            "Back",
                            "Back",
                            item?.activeStatus,
                            item?.ex?.availableToBack?.[0]?.price,
                            item,
                            item?.ex?.availableToBack?.[0]?.tno,
                            "even"
                          )
                        }
                      >
                        <span
                          className={`${
                            !isMobile ? "f-size18" : "f-size12"
                          } sessionRate1Box`}
                        >
                          {item?.ex?.availableToBack?.[0]?.price ?? "-"}
                        </span>
                        <span
                          className={`${
                            !isMobile ? "f-size16" : "f-size12"
                          } sessionRate2Box`}
                        >
                          {item?.ex?.availableToBack?.[0]?.size}
                        </span>
                      </div>
                    </div>
                   
                  </div>
                </div>
              );
            })}
          </div>

         
        </div>
      </div>
    </>
  );
};
export default MobileSessionOddEven;
