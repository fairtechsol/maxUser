import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { AppDispatch, RootState } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/constants";
import { dummyArray, formatNumber, manualProfitLoss } from "../../../helpers";
import BetBox from "../betBox";
import { useSelector } from "react-redux";

const Tournament = ({ title, box, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
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

        <div className="tournamentBackLayTab">
          <div className="tournamentMinMaxBox">
            <span className="tournamentMinMax">
              Min:{formatNumber(data?.minBet)} Max:{formatNumber(data?.maxBet)}
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
                        parseInt(profitLossObj?.[item.id]) +
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
                      {parseInt(profitLossObj?.[item.id]) +
                        manualProfitLoss(
                          selectedBet,
                          item?.nat || item?.runnerName,
                          data?.type,
                          data?.gtype
                        )}
                    </span>
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
                  </div>
                </div>
                <div
                  className={
                    box === 6
                      ? "tournament1RateBox rateBoxWidth"
                      : "tournament2RateBox rateBoxWidth2"
                  }
                >
                  {item?.status !== "ACTIVE" && item?.status !== "OPEN" && (
                    <div className="suspended-overlayRatestournament">
                      <span className={`suspendTextCmmn`}>SUSPENDED</span>
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
            <div className="remark-content">{data?.rem}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default Tournament;
