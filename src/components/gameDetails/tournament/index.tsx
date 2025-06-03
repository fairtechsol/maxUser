import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  calculateRequiredStack,
  dummyArray,
  formatNumber,
  manualProfitLoss,
} from "../../../helpers";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { isMobile } from "../../../utils/screenDimension";
import BetBox from "../betBox";
import "./style.scss";

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
      parentBetId: data?.parentBetId,
      eventType: data?.gtype,
      matchId: detail?.id,
      matchBetType: "tournament",
      placeIndex: index,
      mid: data?.mid?.toString(),
      selectionId: runner?.selectionId?.toString(),
      runnerId: runner?.parentRunnerId?.toString() || runner?.id?.toString(),
      runners: data,
      min: data?.minBet,
      max: data?.maxBet,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  const handleCashoutBet = () => {
    const [teamAId, teamBId] = data?.runners?.map(
      (team) => team.parentRunnerId || team.id
    );

    const profitA = Math.round(profitLossObj?.[teamAId] ?? 0);
    const profitB = Math.round(profitLossObj?.[teamBId] ?? 0);
    if (profitA === profitB) {
      showCashoutError();
      return;
    }
    // profitLossObj?.[teamAId] < profitLossObj?.[teamBId]
    const getBackAndLayRates = (team) => {
      const back1 =
        team?.ex?.availableToBack?.find((item) => item.oname === "back1")
          ?.price || 0;
      const lay1 =
        team?.ex?.availableToLay?.find((item) => item.oname === "lay1")
          ?.price || 0;

      return {
        id: team?.id,
        selectionId: team?.selectionId,
        teamName: team?.nat || team?.runnerName,
        back1,
        lay1,
        back1Price: data?.gtype === "match" ? (back1 - 1) * 100 : back1,
        lay1Price: data?.gtype === "match" ? (lay1 - 1) * 100 : lay1,
      };
    };

    // Get back1 & lay1 values for Team A & Team B
    const teamA = getBackAndLayRates(data?.runners[0]);
    const teamB = getBackAndLayRates(data?.runners[1]);

    let runner: any = {};
    let odds = 0;
    let type = "";
    let stake = 0;

    const getKeyByValue = (obj, value) =>
      Object.keys(obj).find((key) => obj[key] === value);

    if (teamA.back1Price < 100 && teamA.lay1Price < 100) {
      odds = profitA < profitB ? teamA.back1 : teamA.lay1;
      const perc =
        profitLossObj?.[teamAId] < profitLossObj?.[teamBId]
          ? teamA.back1Price
          : teamA.lay1Price;

      stake = Math.abs(
        calculateRequiredStack(
          profitLossObj?.[teamAId],
          profitLossObj?.[teamBId],
          perc
        )
      );
      runner = teamA;
      const key = getKeyByValue(teamA, odds);
      type = key === "lay1" ? "lay" : "back";
    } else {
      odds = profitA < profitB ? teamB.lay1 : teamB.back1;
      const perc =
        profitLossObj?.[teamAId] < profitLossObj?.[teamBId]
          ? teamB.lay1Price
          : teamB.back1Price;
      stake = Math.abs(
        calculateRequiredStack(
          profitLossObj?.[teamAId],
          profitLossObj?.[teamBId],
          perc
        )
      );
      runner = teamB;
      const key = getKeyByValue(teamB, odds);
      type = key === "lay1" ? "lay" : "back";
    }

    if (odds < 1 || !isFinite(stake) || stake <= 0) {
      showCashoutError();
      return;
    }

    const [teamAStatus, teamBStatus] = data?.runners?.map(
      (team) => team.status
    );
    if (teamAStatus == "SUSPENDED" || teamBStatus == "SUSPENDED") {
      showCashoutError();
      return;
    }

    let team = {
      betOnTeam: runner?.teamName,
      rate: odds,
      type: type,
      stake: stake,
      betId: data?.id,
      parentBetId: data?.parentBetId,
      eventType: data?.gtype,
      matchId: detail?.id,
      matchBetType: "tournament",
      placeIndex: 0,
      mid: data?.mid?.toString(),
      selectionId: runner?.selectionId?.toString(),
      runnerId: runner?.id?.toString(),
      runners: data,
      min: data?.minBet,
      max: data?.maxBet,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  const showCashoutError = () => {
    toast.error("You are not eligible for cashout!", {
      style: { backgroundColor: "#ffffff", color: "#000000" },
    });
  };

  const key = `${data.parentBetId || data.id}_profitLoss_${detail.id}`;
  const profitLossJson = detail?.profitLossDataMatch?.[key];

  const profitLossObj = profitLossJson ? profitLossJson : {};

  return (
    <>
      <div className="tournamentContainer">
        <div className="tournamentTitleNew">
          <span
            className={`tournamentTitleTxt ${isMobile ? "f-size13" : "f-size15"
              }`}
          >
            {title}
          </span>
          {data?.runners?.length === 2 && (
            <button
              disabled={Object.keys(profitLossObj).length <= 0 ? true : false}
              className="submit-buttonn cursor-pointer"
              onClick={handleCashoutBet}
              style={{
                backgroundColor:
                  selectedBet?.team?.stake == 0 ? "#198754" : "#086f3f",
                fontSize: isMobile ? "13px" : "14px",
                padding: "0.25rem 0.5rem",
                borderRadius: 0,
                height: "auto",
                opacity:
                  Object.keys(profitLossObj).length <= 0
                    ? 0.65
                    : data?.id == selectedBet?.data?.id
                      ? 0.85
                      : 1,
                boxShadow:
                  data?.id == selectedBet?.data?.id
                    ? "0 0 0 0.25rem rgba(60,153,110,0.5)"
                    : "none",
              }}
            >
              Cashout
            </button>
          )}
        </div>

        <div className="tournamentBackLayTab">
          <div className="tournamentMinMaxBox">
            <span className="tournamentMinMax">
              {data?.minBet === data?.maxBet
                ? `Max:${formatNumber(data?.maxBet)}`
                : `Min:${formatNumber(data?.minBet)} Max:${formatNumber(
                  data?.maxBet
                )}`}
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
            {box === 6 && <div className="tournamentEmptyBox" />}
          </div>
        </div>
        {(!data?.isActive ||
          (!["ACTIVE", "OPEN", ""].includes(data?.status) &&
            data?.gtype == "match")) && (
            <div
              className={`outer-suspended-overlayRatestournament ${box === 6 ? "rateBoxWidth" : "rateBoxWidth2"
                }`}
              style={{
                height: `${data?.runners?.length * 45}px`,
                bottom: data?.rem ? "20px" : "0px",
              }}
            >
              <span
                className={`suspendTextCmmn`}
                style={{ textTransform: "uppercase" }}
              >
                {!["ACTIVE", "OPEN", ""].includes(data?.status) &&
                  data?.gtype == "match"
                  ? data?.status
                  : ""}
              </span>
            </div>
          )}
        {data?.runners?.length > 0 &&
          data?.runners?.map((item: any, index: any) => {
            return (
              <div className="tournamentTeamTab" key={index}>
                <div
                  className="tournamentTeam"
                  style={isMobile && box === 6 ? { width: "28%" } : {}}
                >
                  <span className={`teamFont tournamentTeamTxt`}>
                    {item?.nat || item?.runnerName}
                  </span>
                  <div className="d-flex flex-row justify-content-between w-100">
                    <span
                      className={`${parseFloat(
                        profitLossObj?.[item?.parentRunnerId || item?.id]
                      ) > 0
                        ? "color-green"
                        : "color-red"
                        } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
                    >
                      {profitLossObj?.[item?.parentRunnerId || item?.id] || ""}
                    </span>
                    {(selectedBet?.team?.parentBetId
                      ? selectedBet?.team?.parentBetId === (data.parentBetId || data?.id)
                      : selectedBet?.team?.betId === (data.parentBetId || data?.id)) ? (

                      <span
                        className="title-12 f-400"
                        style={{
                          color: (() => {
                            const basePL = parseFloat(
                              profitLossObj?.[
                              item?.parentRunnerId || item?.id
                              ] || 0
                            );
                            const manualPL = manualProfitLoss(
                              selectedBet,
                              item?.nat || item?.runnerName,
                              data?.type,
                              data?.gtype
                            );
                            return basePL + manualPL > 0
                              ? "#086f3f"
                              : "#bd1828";
                          })(),
                        }}
                      >
                        {(() => {
                          const betKey = item.parentRunnerId || item.id;
                          const basePL = parseFloat(
                            profitLossObj?.[betKey] || 0
                          );
                          const manualPL = manualProfitLoss(
                            selectedBet,
                            item?.nat || item?.runnerName,
                            data?.type,
                            data?.gtype
                          );
                          const isSelected = selectedBet?.team?.parentBetId
                            ? selectedBet.team.parentBetId === (data.parentBetId || data?.id)
                            : selectedBet?.team?.betId === (data.parentBetId || data?.id);

                          if (profitLossObj?.[betKey]) {
                            return isSelected
                              ? (basePL + manualPL).toFixed(2)
                              : basePL.toFixed(2);
                          } else {
                            return manualPL === 0 ? "" : manualPL.toFixed(2);
                          }
                        })()}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div
                  className={
                    box === 6
                      ? "tournament1RateBox rateBoxWidth"
                      : "tournament2RateBox rateBoxWidth2"
                  }
                >
                  {!["ACTIVE", "OPEN", ""].includes(data?.status) &&
                    data?.gtype == "match"
                    ? ""
                    : item?.status !== "ACTIVE" &&
                    item?.status !== "OPEN" &&
                    item?.status !== "" && (
                      <div className="suspended-overlayRatestournament">
                        <span
                          className={`suspendTextCmmn`}
                          style={{ textTransform: "uppercase" }}
                        >
                          {item?.status}
                        </span>
                      </div>
                    )}
                  {box === 6 ? (
                    <>
                      {(item?.ex?.availableToBack?.length > 0
                        ? item?.ex?.availableToBack
                        : dummyArray
                      )?.map((item2: any, index: number) => {
                        return (
                          <BetBox
                            data={item2}
                            key={index}
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
                      )?.map((item2: any, index: number) => {
                        return (
                          <BetBox
                            data={item2}
                            key={index}
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
      </div >
    </>
  );
};
export default Tournament;
