import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { isLap, isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { profitLossDataForMatchConstants } from "../../../utils/constants";
import { formatNumber, handleSize } from "../../../helpers";
import BetBox from "../betBox";

const MatchOdd = ({ title, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();
  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    index: any,
    runner: any
  ) => {
    if (data?.activeStatus != "live" || status != "ACTIVE") {
      return false;
    }
    if (odds === 0) {
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
      betId: data?.id,
      eventType: detail?.matchType,
      matchId: detail?.id,
      matchBetType: data?.type,
      placeIndex: index,
      mid: data?.mid?.toString(),
      selectionId: runner?.selectionId?.toString(),
    };
    console.log('team',team)
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  return (
    <>
      <div className="matchOddContainer">
        <div className="matchOddTitle">
          <span
            className={`matchOddTitleTxt ${isMobile ? "f-size13" : "f-size15"}`}
          >
            {title}
          </span>
        </div>

        <div className="matchOddBackLayTab">
          <div className="matchOddMinMaxBox">
            <span className="matchOddMinMax">
              Min:{formatNumber(data?.minBet)} Max:{formatNumber(data?.maxBet)}
            </span>
          </div>
          <div
            className="matchOddBackLayBoxContainer backLayBoxWidth"
          >
            <div className="matchOddBackBoxTab">
              <span className={`f-size16 matchOddBackTxt`}>Back</span>
            </div>
            <div className="matchOddLayBoxTab">
              <span className={`f-size16 matchOddBackTxt`}>Lay</span>
            </div>
            <div className="matchOddEmptyBox"></div>
          </div>
        </div>

        <div className="matchOddTeamTab">
          <div className="matchOddTeam">
            <span
              className={`teamFont matchOddTeamTxt`}
            >
              {detail?.teamA?.length > 20
                          ? `${detail?.teamA?.slice(
                              0,
                              25
                            )}...`
                          : detail?.teamA}
            </span>
            <span
              className={`${
                detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.A+"_"+detail?.id
                ] > 0
                  ? "color-green"
                  : detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.A+"_"+detail?.id
                    ] < 0
                  ? "color-red"
                  : ""
              } ${isMobile?"fbold title-12":"fbold title-14"}`}
            >
              {detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.A+"_"+detail?.id
              ] ? detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.A+"_"+detail?.id
              ]==="0"?"":detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.A+"_"+detail?.id
              ] : ""}
            </span>
          </div>
          <div
            className="matchOddRateBox rateBoxWidth"
          >
            {(data?.activeStatus !== "live" || data?.runners?.[0]?.status !== "ACTIVE") && (
                <div className="suspended-overlayRatesMatchOdd">
                  <span
                    className={`suspendTextCmmn`}
                  >
                    SUSPENDED
                  </span>
                </div>
              )}
              {data?.runners?.[0]?.ex?.availableToBack?.map((item:any)=>{
                return(
                  <BetBox data={item} type={"back"} detail={detail} runner={data?.runners?.[0]} handlePlaceBet={handlePlaceBet}/>
                )
              })}
               {data?.runners?.[0]?.ex?.availableToLay?.map((item:any)=>{
               return(
                <BetBox data={item} type={"lay"} detail={detail} runner={data?.runners?.[0]} handlePlaceBet={handlePlaceBet}/>
              )
              })}
          </div>
        </div>

        <div className="matchOddTeamTab">
          <div className="matchOddTeam">
            <span
              className={`teamFont matchOddTeamTxt`}
            >
              {detail?.teamB?.length > 25
                          ? `${detail?.teamB?.slice(
                              0,
                              25
                            )}...`
                          : detail?.teamB}
            </span>
            <span
              className={`${
                detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.B+"_"+detail?.id
                ] > 0
                  ? "color-green"
                  : detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.B+"_"+detail?.id
                    ] < 0
                  ? "color-red"
                  : ""
              } ${isMobile?"fbold title-12":"fbold title-14"}`}
            >
              {detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.B+"_"+detail?.id
              ] ? detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.B+"_"+detail?.id
              ]==="0"?"":detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.B+"_"+detail?.id
              ] : ""}
            </span>
          </div>
          <div
            className="matchOddRateBox rateBoxWidth"
          >
            {(data?.activeStatus !== "live" || data?.runners?.[1]?.status !== "ACTIVE") && (
                <div className="suspended-overlayRatesMatchOdd">
                  <span
                    className={`suspendTextCmmn`}
                  >
                    SUSPENDED
                  </span>
                </div>
              )}
              {data?.runners?.[1]?.ex?.availableToBack?.map((item:any)=>{
                return(
                  <BetBox data={item} type={"back"} detail={detail} runner={data?.runners?.[1]} handlePlaceBet={handlePlaceBet}/>
                )
              })}
               {data?.runners?.[1]?.ex?.availableToLay?.map((item:any)=>{
               return(
                <BetBox data={item} type={"lay"} detail={detail} runner={data?.runners?.[1]} handlePlaceBet={handlePlaceBet}/>
              )
              })}
          </div>
        </div>

        {detail?.teamC && (
          <div className="matchOddTeamTab">
            <div className="matchOddTeam">
              <span
                className={`teamFont matchOddTeamTxt`}
              >
               {detail?.teamC?.length > 25
                          ? `${detail?.teamC?.slice(
                              0,
                              25
                            )}...`
                          : detail?.teamC}
              </span>
              <span
                className={`${
                  detail?.profitLossDataMatch?.[
                    profitLossDataForMatchConstants[data?.type]?.C+"_"+detail?.id
                  ] > 0
                    ? "color-green"
                    : detail?.profitLossDataMatch?.[
                        profitLossDataForMatchConstants[data?.type]?.C+"_"+detail?.id
                      ] < 0
                    ? "color-red"
                    : ""
                } ${isMobile?"fbold title-12":"fbold title-14"}`}
              >
                {detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.C+"_"+detail?.id
              ] ? detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.C+"_"+detail?.id
              ]==="0"?"":detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.C+"_"+detail?.id
              ] : ""}
              </span>
            </div>
            <div
              className="matchOddRateBox rateBoxWidth"
            >
              {(data?.activeStatus !== "live" || data?.runners?.[2]?.status !== "ACTIVE") && (
                  <div className="suspended-overlayRatesMatchOdd">
                    <span
                      className={`suspendTextCmmn`}
                    >
                      SUSPENDED
                    </span>
                  </div>
                )}
                  {data?.runners?.[2]?.ex?.availableToBack?.map((item:any)=>{
                return(
                  <BetBox data={item} type={"back"} detail={detail} runner={data?.runners?.[2]} handlePlaceBet={handlePlaceBet}/>
                )
              })}
               {data?.runners?.[2]?.ex?.availableToLay?.map((item:any)=>{
               return(
                <BetBox data={item} type={"lay"} detail={detail} runner={data?.runners?.[2]} handlePlaceBet={handlePlaceBet}/>
              )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default MatchOdd;
