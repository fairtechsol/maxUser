import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { manualProfitLoss } from "../../../helpers";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { isMobile } from "../../../utils/screenDimension";
import BetBox from "../../gameDetails/betBox";
import "./style.scss";

const HtFt = ({ title, box, data, detail }) => {
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
    console.log(index);
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
      runners: data,
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
            className={`tournamentTitleTxt ${isMobile ? "f-size13" : "f-size15"
              }`}
          >
            {title}
          </span>
        </div>

        <div
          className="d-flex flex-row flex-wrap"
          style={{ position: "relative" }}
        >
          {data?.status !== "OPEN" && data?.status !== "ACTIVE" && (
            <div className="suspended-overlayRatestournament">
              <span className={`suspendTextCmmn`}>SUSPENDED</span>
            </div>
          )}
          {data?.runners?.length > 0 &&
            data?.runners?.map((item: any, index: any) => {
              return (
                <div
                  className="htftTeamTab"
                  key={index}
                  style={{ width: isMobile ? "50%" : "33.33%" }}
                >
                  <div
                    className="htftTeam"
                    style={box === 6 ? { width: "28%" } : { width: "77%" }}
                  >
                    {item?.status !== "OPEN" &&
                      item?.status !== "ACTIVE" &&
                      (data?.status === "OPEN" ||
                        data?.status === "ACTIVE") && (
                        <div className="suspended-overlayRatestournament">
                          <FaLock color="#fff" />
                        </div>
                      )}
                    <span className={`teamFont tournamentTeamTxt ms-1`}>
                      {item?.nat || item?.runnerName}
                    </span>
                    <div className="d-flex flex-row justify-content-between w-100">
                      <span
                        className={` ms-1 mt-1 ${profitLossObj?.[item.id] > 0
                          ? "color-green"
                          : profitLossObj?.[item.id] < 0
                            ? "color-red"
                            : ""
                          } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
                      >
                        {profitLossObj?.[item.id]}
                      </span>
                      {selectedBet?.team?.parentBetId ||
                        selectedBet?.team?.betId ===
                        (data.parentBetId || data?.id) ? (
                        <span
                          className="title-12 f-400 d-flex justify-content-center align-center"
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
                                data?.type
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
                            );

                            const isSelected =
                              selectedBet?.team?.betId ===
                              (data.parentBetId || data?.id);

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
                  <div className={"tournament2RateBox rateBoxWidth3"}>
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
