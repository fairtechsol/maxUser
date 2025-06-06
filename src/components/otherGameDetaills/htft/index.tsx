import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../store/store";
import { isMobile } from "../../../utils/screenDimension";
import BetBox from "../../gameDetails/betBox";
import "./style.scss";
import { FaLock } from "react-icons/fa";

const HtFt = ({ title, box, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();

  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    index: any,
    runner: any
  ) => {
    if (status != "ACTIVE" && status != "OPEN") {
      return false;
    }
    if (odds === 0) {
      return false;
    }
    let team = {
      betOnTeam: runner?.nat,
      rate: odds,
      type: type,
      stake: 0,
      betId: data?.id,
      eventType: data?.gtype,
      matchId: detail?.id,
      matchBetType: "tournament",
      placeIndex: index,
      mid: data?.mid?.toString(),
      selectionId: runner?.selectionId?.toString(),
      runnerId: runner?.id?.toString(),
      runners:data
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  const key = `${data.id}_profitLoss_${detail.id}`;

  const profitLossJson = detail?.profitLossDataMatch?.[key];

  const profitLossObj = profitLossJson ? JSON.parse(profitLossJson) : {};

  return (
    <>
      <div className="tournamentContainer">
        <div className="tournamentTitle">
          <span
            className={`tournamentTitleTxt ${
              isMobile ? "f-size13" : "f-size15"
            }`}
          >
            {title}
          </span>
        </div>

      <div className="d-flex flex-row flex-wrap" style={{position:"relative"}}>
      {(data?.status !== "OPEN" && data?.status !== "ACTIVE") && (<div className="suspended-overlayRatestournament">
                      <span className={`suspendTextCmmn`}>SUSPENDED</span>
                    </div> )}
      {data?.runners?.length > 0 &&
          data?.runners?.map((item: any, index: any) => {
            return (
              <div className="htftTeamTab" key={index} style={{width:isMobile?"50%":"33.33%"}}>
                <div
                  className="htftTeam"
                  style={box === 6 ? { width: "28%" } : {}}
                >
                   {((item?.status !== "OPEN" && item?.status !== "ACTIVE") && (data?.status==="OPEN" || data?.status === "ACTIVE")) && (
                    <div className="suspended-overlayRatestournament">
                      <FaLock color="#fff" />
                    </div>
                  )}
                  <span className={`teamFont tournamentTeamTxt ms-1`}>
                    {item?.nat || item?.runnerName}
                  </span>
                  <span
                    className={` ms-1 mt-1 ${
                      profitLossObj?.[item.id] > 0
                        ? "color-green"
                        : profitLossObj?.[item.id] < 0
                        ? "color-red"
                        : ""
                    } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
                  >
                    {profitLossObj?.[item.id]}
                  </span>
                </div>
                <div
                  className={"tournament2RateBox rateBoxWidth3"}
                >
                  {/* {(item?.status !== "OPEN" && item?.status !== "ACTIVE") && (
                    <div className="suspended-overlayRatestournament">
                      <FaLock color="#fff" />
                    </div>
                  )} */}
                  <BetBox
                        data={item?.ex?.availableToBack?.[0]}
                        type={"back"}
                        detail={detail}
                        runner={item}
                        handlePlaceBet={handlePlaceBet}
                      />
                </div>
              </div>
            );
          })}
      </div>
       

        {data?.rem && (
          <div className="tournamentRemarkTab">
            <div className="remark-content">{data?.rem}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default HtFt;
