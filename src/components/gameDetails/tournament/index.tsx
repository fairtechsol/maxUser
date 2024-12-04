import { useDispatch, useSelector } from "react-redux";
import { dummyArray, formatNumber, manualProfitLoss } from "../../../helpers";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { isMobile } from "../../../utils/screenDimension";
import BetBox from "../betBox";
import "./style.scss";
import { IoInformationCircle } from "react-icons/io5";
import {OverlayTrigger, Tooltip } from "react-bootstrap";

const Tournament = ({ title, box, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const startAtTime = new Date(detail.startAt); 
  const hideTime = new Date(startAtTime.getTime() - 30 * 60 * 1000); 
  const shouldShowInfoIcon = new Date() < hideTime;
  const tooltip = <Tooltip id="tooltip">{`Max adv exposure limit 10L.`}</Tooltip>;
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
      runners:data,
      min:data?.minBet ,
      max:data?.maxBet ,
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
          { shouldShowInfoIcon && <OverlayTrigger placement="top" overlay={tooltip}><div className="px-2"><IoInformationCircle size={20}/></div></OverlayTrigger>}
        </div>

        <div className="tournamentBackLayTab">
          <div className="tournamentMinMaxBox">
            <span className="tournamentMinMax">
            {data?.minBet===data?.maxBet? `Max:${formatNumber(data?.maxBet)}` :`Min:${formatNumber(data?.minBet)} Max:${formatNumber(data?.maxBet)}`}
            </span>
          </div>
          <div
            className={
              box === 6
                ? "tournament1BackLayBoxContainer backLayBoxWidth"
                : "tournament2BackLayBoxContainer backLayBoxWidth2"
            }
          >
            <div
              className={
                box === 6 ? "tournament1BackBoxTab" : "tournament2BackBoxTab"
              }
            >
              <span className={`f-size16 tournamentBackTxt`}>Back</span>
            </div>
            <div
              className={
                box === 6 ? "tournament1LayBoxTab" : "tournament2LayBoxTab"
              }
            >
              <span className={`f-size16 tournamentBackTxt`}>Lay</span>
            </div>
            {box === 6 && <div className="tournamentEmptyBox"></div>}
          </div>
        </div>
        {data?.runners?.length > 0 &&
          data?.runners?.map((item: any, index: any) => {
            return (
              <div className="tournamentTeamTab" key={index}>
                <div
                  className="tournamentTeam"
                  style={isMobile && box === 6 ? { width: "28%" } : {}}
                  // style={box === 6 ? { width: "28%" } : {}}
                >
                  <span className={`teamFont tournamentTeamTxt`}>
                    {item?.nat || item?.runnerName}
                  </span>
                  <div className="d-flex flex-row justify-content-between w-100">
                    <span
                      className={`${
                        parseFloat(profitLossObj?.[item.id]) +
                          manualProfitLoss(
                            selectedBet,
                            item?.nat || item?.runnerName,
                            data?.type,
                            data?.gtype
                          ) >
                        0
                          ? "color-green"
                          : "color-red"
                      } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
                    >
                     {profitLossObj?.[item.id] ? selectedBet?.team?.betId===data?.id ? parseFloat(profitLossObj?.[item.id]) +
                        manualProfitLoss(
                          selectedBet,
                          item?.nat || item?.runnerName,
                          data?.type,
                          data?.gtype
                        ):profitLossObj?.[item.id]:""}
                    </span>
                    {
                      selectedBet?.team?.betId===data?.id ? 
                      <span
                      className="title-12 f-400"
                      style={{
                        color:
                          manualProfitLoss(
                            selectedBet,
                            item?.nat || item?.runnerName,
                            data?.type,
                            data?.gtype
                          ) > 0
                            ? "#086f3f"
                            : "#bd1828",
                      }}
                    >
                      {manualProfitLoss(
                        selectedBet,
                        item?.nat || item?.runnerName,
                        data?.type,
                        data?.gtype
                      ) === 0
                        ? ""
                        : manualProfitLoss(
                            selectedBet,
                            item?.nat || item?.runnerName,
                            data?.type,
                            data?.gtype
                          )?.toFixed(2)}
                    </span>
                    : ""
                    }
                    
                  </div>
                </div>
                <div
                  className={
                    box === 6
                      ? "tournament1RateBox rateBoxWidth"
                      : "tournament2RateBox rateBoxWidth2"
                  }
                >
                  {(item?.status !== "ACTIVE" && item?.status !== "OPEN" && item?.status !== "") && (
                    <div className="suspended-overlayRatestournament">
                      <span className={`suspendTextCmmn`} style={{textTransform:"uppercase"}}>{item?.status}</span>
                    </div>
                  )}
                  {box === 6 ? (
                    <>
                      {(item?.ex?.availableToBack?.length > 0
                        ? item?.ex?.availableToBack
                        : dummyArray
                      )?.map((item2: any) => {
                        return (
                          <BetBox
                            data={item2}
                            type={"back"}
                            detail={detail}
                            runner={item}
                            handlePlaceBet={handlePlaceBet}
                          />
                        );
                      })}
                      {(item?.ex?.availableToLay?.length > 0
                        ? item?.ex?.availableToLay
                        : dummyArray
                      )?.map((item2: any) => {
                        return (
                          <BetBox
                            data={item2}
                            type={"lay"}
                            detail={detail}
                            runner={item}
                            handlePlaceBet={handlePlaceBet}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <BetBox
                        data={item?.ex?.availableToBack?.[0]}
                        type={"back"}
                        detail={detail}
                        runner={item}
                        handlePlaceBet={handlePlaceBet}
                      />

                      <BetBox
                        data={item?.ex?.availableToLay?.[0]}
                        type={"lay"}
                        detail={detail}
                        runner={item}
                        handlePlaceBet={handlePlaceBet}
                      />
                    </>
                  )}
                </div>
              </div>
            );
          })}

        {data?.rem && (
          <div className="tournamentRemarkTab">
            <div className="remark-content1">{data?.rem}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default Tournament;
