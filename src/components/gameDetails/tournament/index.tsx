import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { calculateRequiredStack, dummyArray, formatNumber, manualProfitLoss } from "../../../helpers";
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
  // const startAtTime = new Date(detail.startAt);
  // const hideTime = new Date(startAtTime.getTime() - 30 * 60 * 1000);
  // const shouldShowInfoIcon = new Date() < hideTime;
  // const tooltip = <Tooltip id="tooltip">{`Max adv exposure limit 10L.`}</Tooltip>;
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
    // alert(odds)
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
      runners: data,
      min: data?.minBet,
      max: data?.maxBet,
    };

    console.log(" team :", team)
    console.log(" data :", data)
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  const handleCashoutBet = () => {
    const [teamAId, teamBId] = data?.runners?.map(team => team.parentRunnerId || team.id);
    const profitA = Math.round(profitLossObj?.[teamAId] ?? 0);
    const profitB = Math.round(profitLossObj?.[teamBId] ?? 0);
    if (profitA === profitB) {
      toast.error("You are not eligible for cashout!", {
        style: { backgroundColor: "#ffffff", color: "#000000" },
      });
      return;
    }
    // profitLossObj?.[teamAId] < profitLossObj?.[teamBId]
    const getBackAndLayRates = (team) => {
      const back1 = team?.ex?.availableToBack?.find(item => item.oname === "back1")?.price || 0;
      const lay1 = team?.ex?.availableToLay?.find(item => item.oname === "lay1")?.price || 0;

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

    let runner = {};
    let odds = 0;
    let type = "";
    let stake = 0;

    const getKeyByValue = (obj, value) => Object.keys(obj).find(key => obj[key] === value);

    if (teamA.back1Price < 100 && teamA.lay1Price < 100) {
      odds = profitA < profitB ? teamA.back1 : teamA.lay1
      const perc = profitLossObj?.[teamAId] < profitLossObj?.[teamBId] ? teamA.back1Price : teamA.lay1Price;

      stake = Math.abs(calculateRequiredStack(profitLossObj?.[teamAId], profitLossObj?.[teamBId], perc));
      runner = teamA;
      const key = getKeyByValue(teamA, odds);
      type = key === "lay1" ? "lay" : "back";

    } else {
      odds = profitA < profitB ? teamB.lay1 : teamB.back1
      const perc = profitLossObj?.[teamAId] < profitLossObj?.[teamBId] ? teamB.lay1Price : teamB.back1Price;
      stake = Math.abs(calculateRequiredStack(profitLossObj?.[teamAId], profitLossObj?.[teamBId], perc));
      runner = teamB;
      const key = getKeyByValue(teamB, odds);
      type = key === "lay1" ? "lay" : "back";
    }
    console.log("odds :", odds)
    if (odds < 1) {
      toast.error("You are not eligible for cashout!", {
        style: { backgroundColor: "#ffffff", color: "#000000" },
      });
      return;
    }
    if (!isFinite(stake) || stake <= 0) {
      toast.error("You are not eligible for cashout!", {
        style: { backgroundColor: "#ffffff", color: "#000000" },
      });
      return;
    }
    let team = {
      betOnTeam: runner?.teamName,
      rate: odds,
      type: type,
      stake: stake,
      betId: data?.parentBetId || data?.id,
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
    console.log("team 11:", team)
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  const key = `${data.parentBetId || data.id}_profitLoss_${detail.id}`;
  const profitLossJson = detail?.profitLossDataMatch?.[key];

  const profitLossObj = profitLossJson ? JSON.parse(profitLossJson) : {};

  return (
    <>
      <div className="tournamentContainer">
        <div className="tournamentTitle">
          <span
            className={`tournamentTitleTxt ${isMobile ? "f-size13" : "f-size15"
              }`}
          >
            {title}
          </span>
          {data?.runners?.length === 2 && (
            <button
              // disabled={
              //   selectedBet?.team?.stake == 0 ? true : false
              // }
              disabled={
                Object.keys(profitLossObj).length <= 0 || data?.id == selectedBet?.data.id ? true : false
              }
              className="submit-buttonn"
              onClick={handleCashoutBet}
              style={{
                backgroundColor:
                  selectedBet?.team?.stake == 0
                    ? "#198754"
                    : "#086f3f",
                fontSize: isMobile ? "13px" : "14px",
                padding: "0.25rem 0.5rem",
                borderRadius: 0,
                height: "auto",
                // opacity: Object.keys(profitLossObj).length <= 0 || data?.id == selectedBet?.data.id ? 0.65 : 1
                opacity: Object.keys(profitLossObj).length <= 0 ? 0.65 : data?.id == selectedBet?.data.id ? 0.85 : 1,
                boxShadow: data?.id == selectedBet?.data.id ? "0 0 0 0.25rem rgba(60,153,110,0.5)" : "none",
              }}
            >
              Cashout
            </button>
          )}

          {/* { shouldShowInfoIcon && <OverlayTrigger placement="top" overlay={tooltip}><div className="px-2"><IoInformationCircle size={20}/></div></OverlayTrigger>} */}
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
            {box === 6 && <div className="tournamentEmptyBox"></div>}
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
                // style={box === 6 ? { width: "28%" } : {}}
                >
                  <span className={`teamFont tournamentTeamTxt`}>
                    {item?.nat || item?.runnerName}
                  </span>
                  <div className="d-flex flex-row justify-content-between w-100">
                    {/* <span
                      className={`${parseFloat(
                        profitLossObj?.[item.parentRunnerId || item.id]
                      ) +
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
                      {profitLossObj?.[item.parentRunnerId || item.id]
                        ? selectedBet?.team?.betId ===
                          (data.parentBetId || data?.id)
                          ? (parseFloat(
                            (profitLossObj?.[item.parentRunnerId || item.id])
                          ) +
                            manualProfitLoss(
                              selectedBet,
                              item?.nat || item?.runnerName,
                              data?.type,
                              data?.gtype
                            )).toFixed(2)
                          : profitLossObj?.[item.parentRunnerId || item.id]
                        : ""}
                    </span> */}
                    <span
                      className={`${parseFloat(
                        profitLossObj?.[item.parentRunnerId || item.id]
                      ) >
                        0
                        ? "color-green"
                        : "color-red"
                        } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
                    >
                      {profitLossObj?.[item.parentRunnerId || item.id]
                        ? selectedBet?.team?.betId ===
                          (data.parentBetId || data?.id)
                          ? parseFloat(
                            (profitLossObj?.[item.parentRunnerId || item.id])
                          )
                          : profitLossObj?.[item.parentRunnerId || item.id]
                        : ""}
                    </span>
                    {selectedBet?.team?.betId ===
                      (data.parentBetId || data?.id) ? (
                      <span
                        className="title-12 f-400"
                        style={{
                          color:
                            (parseFloat(
                              (profitLossObj?.[item.parentRunnerId || item.id])
                            ) + manualProfitLoss(
                              selectedBet,
                              item?.nat || item?.runnerName,
                              data?.type,
                              data?.gtype
                            )) > 0
                              ? "#086f3f"
                              : "#bd1828",
                        }}
                      >
                        {/* {manualProfitLoss(
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
                          )} */}
                        {profitLossObj?.[item.parentRunnerId || item.id]
                          ? selectedBet?.team?.betId ===
                            (data.parentBetId || data?.id)
                            ? (parseFloat(
                              (profitLossObj?.[item.parentRunnerId || item.id])
                            ) +
                              manualProfitLoss(
                                selectedBet,
                                item?.nat || item?.runnerName,
                                data?.type,
                                data?.gtype
                              )).toFixed(2)
                            : profitLossObj?.[item.parentRunnerId || item.id]
                          : ""}
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
