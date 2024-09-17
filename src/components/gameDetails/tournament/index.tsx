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
    // console.log('runner',runner)
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
      <div className="otherMarketContainer">
        <div className="otherMarketTitle">
          <span
            className={`otherMarketTitleTxt ${
              isMobile ? "f-size13" : "f-size15"
            }`}
          >
            {title}
          </span>
        </div>

        <div className="otherMarketBackLayTab">
          <div className="otherMarketMinMaxBox">
            <span className="otherMarketMinMax">
              Min:{formatNumber(data?.minBet)} Max:{formatNumber(data?.maxBet)}
            </span>
          </div>
          <div
            className={
              box === 6
                ? "otherMarket1BackLayBoxContainer backLayBoxWidth"
                : "otherMarket2BackLayBoxContainer backLayBoxWidth2"
            }
          >
            <div
              className={
                box === 6 ? "otherMarket1BackBoxTab" : "otherMarket2BackBoxTab"
              }
            >
              <span className={`f-size16 otherMarketBackTxt`}>Back</span>
            </div>
            <div
              className={
                box === 6 ? "otherMarket1LayBoxTab" : "otherMarket2LayBoxTab"
              }
            >
              <span className={`f-size16 otherMarketBackTxt`}>Lay</span>
            </div>
            {box === 6 && <div className="otherMarketEmptyBox"></div>}
          </div>
        </div>
        {data?.runners?.length > 0 &&
          data?.runners?.map((item: any, index: any) => {
            return (
              <div className="otherMarketTeamTab" key={index}>
                <div
                  className="otherMarketTeam"
                  style={box === 6 ? { width: "28%" } : {}}
                >
                  <span className={`teamFont otherMarketTeamTxt`}>
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
                      ? "otherMarket1RateBox rateBoxWidth"
                      : "otherMarket2RateBox rateBoxWidth2"
                  }
                >
                  {item?.status !== "ACTIVE" && (
                    <div className="suspended-overlayRatesotherMarket">
                      <span className={`suspendTextCmmn`}>SUSPENDED</span>
                    </div>
                  )}
                  {box === 6 ? (
                    <>
                      {(data?.runners?.[0]?.ex?.availableToBack?.length > 0
                        ? data?.runners?.[0]?.ex?.availableToBack
                        : dummyArray
                      )?.map((item: any) => {
                        return (
                          <BetBox
                            data={item}
                            type={"back"}
                            detail={detail}
                            runner={item}
                            handlePlaceBet={handlePlaceBet}
                          />
                        );
                      })}
                      {(data?.runners?.[0]?.ex?.availableToLay?.length > 0
                        ? data?.runners?.[0]?.ex?.availableToLay
                        : dummyArray
                      )?.map((item: any) => {
                        return (
                          <BetBox
                            data={item}
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
          <div className="otherMarketRemarkTab">
            <div className="remark-content">{data?.rem}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default Tournament;
