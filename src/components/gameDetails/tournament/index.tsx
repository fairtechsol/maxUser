import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { AppDispatch } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/constants";
import { dummyArray, formatNumber } from "../../../helpers";
import BetBox from "../betBox";

const Tournament = ({ title, box, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();

  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    index: any,
    runner: any
  ) => {
    if (status != "ACTIVE") {
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
      runnerId:runner?.id?.toString()
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
                  style={box === 6 ? { width: "28%" } : {}}
                >
                  <span className={`teamFont tournamentTeamTxt`}>
                    {item?.nat}
                  </span>
                  <span
                    className={`${
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
                  className={
                    box === 6
                      ? "tournament1RateBox rateBoxWidth"
                      : "tournament2RateBox rateBoxWidth2"
                  }
                >
                  {item?.status !== "ACTIVE" && (
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
                        data={data?.runners?.[0]?.ex?.availableToBack?.[0]}
                        type={"back"}
                        detail={detail}
                        runner={item}
                        handlePlaceBet={handlePlaceBet}
                      />

                      <BetBox
                        data={data?.runners?.[0]?.ex?.availableToLay?.[0]}
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
