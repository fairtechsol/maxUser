import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { isLap, isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { AppDispatch } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/constants";

const OtherMarket = ({ title, box, data, detail }) => {
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
      teamA: data?.type === "other" ? data?.metaData?.teamA : "yes",
      teamB: data?.type === "other" ? data?.metaData?.teamB : "no",
      teamC:data?.metaData?.teamC,
      betId: data?.id,
      eventType: detail?.matchType,
      matchId: detail?.id,
      matchBetType: data?.type,
      placeIndex: index,
      mid: data?.mid?.toString(),
      selectionId: runner?.selectionId?.toString(),
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  const formatNumber = (num: any) => {
    if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1).replace(/\.0$/, "") + "L";
    }
    return num.toString();
  };
  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };
console.log('data',data)
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
            // style={
            //   box === 6
            //     ? { width: isLap ? "240px" : !isMobile ? "320px" : "" }
            //     : { width: isLap ? "120px" : !isMobile ? "160px" : "" }
            // }
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

        <div className="otherMarketTeamTab">
          {/* {data?.activeStatus != "live" && (
            <div className="suspended-overlayRatesotherMarket">
              <span className={`suspendedTxtotherMarket`}></span>
            </div>
          )} */}
          <div
            className="otherMarketTeam"
            style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont otherMarketTeamTxt`}>
              {data?.type === "other" ? data?.metaData?.teamA : "Yes"}
            </span>
            <span
              className={`${
                detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.A
                ] > 0
                  ? "color-green"
                  : detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.A
                    ] < 0
                  ? "color-red"
                  : ""
              } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
            >
              {detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.A
              ] ?? 0}
            </span>
          </div>
          <div
            className={
              box === 6
                ? "otherMarket1RateBox rateBoxWidth"
                : "otherMarket2RateBox rateBoxWidth2"
            }
            // style={
            //   box === 6
            //     ? { width: isLap ? "360px" : !isMobile ? "480px" : "" }
            //     : { width: isLap ? "120px" : !isMobile ? "160px" : "" }
            // }
          >
            {(data?.activeStatus !== "live" ||
              data?.runners?.[0]?.status !== "ACTIVE") && (
              <div className="suspended-overlayRatesotherMarket">
                <span className={`suspendTextCmmn`}>SUSPENDED</span>
              </div>
            )}
            {box === 6 && (
              <div
                className="otherMarketBackBox back3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[0]?.ex?.availableToBack?.[0]?.price,
                    "BACK",
                    data?.type === "other" ? data?.metaData?.teamA : "yes",
                    data?.runners?.[0]?.status,
                    data?.runners?.[0]?.ex?.availableToBack?.[0]?.tno,
                    data?.runners?.[0]
                  )
                }
              >
                <span className={`rateFont otherMarketRate1Box`}>
                  {handlePrice(
                    data?.runners?.[0]?.ex?.availableToBack?.[0]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont otherMarketRate2Box`}>
                  {data?.runners?.[0]?.ex?.availableToBack?.[0]?.size}
                </span>
              </div>
            )}
            {box === 6 && (
              <div
                className="otherMarketBackBox back2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[0]?.ex?.availableToBack?.[1]?.price,
                    "BACK",
                    data?.type === "other" ? data?.metaData?.teamA : "yes",
                    data?.runners?.[0]?.status,
                    data?.runners?.[0]?.ex?.availableToBack?.[1]?.tno,
                    data?.runners?.[0]
                  )
                }
              >
                <span className={`rateFont otherMarketRate1Box`}>
                  {handlePrice(
                    data?.runners?.[0]?.ex?.availableToBack?.[1]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont otherMarketRate2Box`}>
                  {data?.runners?.[0]?.ex?.availableToBack?.[1]?.size}
                </span>
              </div>
            )}
            <div
              className="otherMarketBackBox back1Background"
              onClick={() =>
                handlePlaceBet(
                  box === 6
                    ? data?.runners?.[0]?.ex?.availableToBack?.[2]?.price
                    : data?.runners?.[0]?.ex?.availableToBack?.[0]?.price,
                  "BACK",
                  data?.type === "other" ? data?.metaData?.teamA : "yes",
                  data?.runners?.[0]?.status,
                  box === 6
                    ? data?.runners?.[0]?.ex?.availableToBack?.[2]?.tno
                    : data?.runners?.[0]?.ex?.availableToBack?.[0]?.tno,
                  data?.runners?.[0]
                )
              }
            >
              <span className={`rateFont otherMarketRate1Box`}>
                {box === 6
                  ? handlePrice(
                      data?.runners?.[0]?.ex?.availableToBack?.[2]?.price
                    ) ?? "-"
                  : handlePrice(
                      data?.runners?.[0]?.ex?.availableToBack?.[0]?.price
                    ) ?? "-"}
              </span>
              <span className={`sizeFont otherMarketRate2Box`}>
                {box === 6
                  ? data?.runners?.[0]?.ex?.availableToBack?.[2]?.size
                  : data?.runners?.[0]?.ex?.availableToBack?.[0]?.size}
              </span>
            </div>
            <div
              className="otherMarketBackBox lay1Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[0]?.ex?.availableToLay?.[0]?.price,
                  "LAY",
                  data?.type === "other" ? data?.metaData?.teamA : "yes",
                  data?.runners?.[0]?.status,
                  data?.runners?.[0]?.ex?.availableToLay?.[0]?.tno,
                  data?.runners?.[0]
                )
              }
            >
              <span className={`rateFont otherMarketRate1Box`}>
                {handlePrice(
                  data?.runners?.[0]?.ex?.availableToLay?.[0]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont otherMarketRate2Box`}>
                {data?.runners?.[0]?.ex?.availableToLay?.[0]?.size}
              </span>
            </div>
            {box === 6 && (
              <div
                className="otherMarketBackBox lay2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[0]?.ex?.availableToLay?.[1]?.price,
                    "LAY",
                    data?.type === "other" ? data?.metaData?.teamA : "yes",
                    data?.runners?.[0]?.status,
                    data?.runners?.[0]?.ex?.availableToLay?.[1]?.tno,
                    data?.runners?.[0]
                  )
                }
              >
                <span className={`rateFont otherMarketRate1Box`}>
                  {handlePrice(
                    data?.runners?.[0]?.ex?.availableToLay?.[1]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont otherMarketRate2Box`}>
                  {data?.runners?.[0]?.ex?.availableToLay?.[1]?.size}
                </span>
              </div>
            )}
            {box === 6 && (
              <div
                className="otherMarketBackBox lay3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[0]?.ex?.availableToLay?.[2]?.price,
                    "LAY",
                    data?.type === "other" ? data?.metaData?.teamA : "yes",
                    data?.runners?.[0]?.status,
                    data?.runners?.[0]?.ex?.availableToLay?.[2]?.tno,
                    data?.runners?.[0]
                  )
                }
              >
                <span className={`rateFont otherMarketRate1Box`}>
                  {handlePrice(
                    data?.runners?.[0]?.ex?.availableToLay?.[2]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont otherMarketRate2Box`}>
                  {data?.runners?.[0]?.ex?.availableToLay?.[2]?.size}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="otherMarketTeamTab">
          {/* {data?.activeStatus != "live" && (
            <div className="suspended-overlayRatesotherMarket">
              <span
                className={`${
                  !isMobile ? "f-size18" : "f-size16"
                } suspendedTxtotherMarket`}
              ></span>
            </div>
          )} */}
          <div
            className="otherMarketTeam"
            style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont otherMarketTeamTxt`}>
              {data?.type === "other" ? data?.metaData?.teamB : "No"}
            </span>
            <span
              className={`${
                detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.B
                ] > 0
                  ? "color-green"
                  : detail?.profitLossDataMatch?.[
                      profitLossDataForMatchConstants[data?.type]?.B
                    ] < 0
                  ? "color-red"
                  : ""
              } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
            >
              {detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.B
              ] ?? 0}
            </span>
          </div>
          <div
            className={
              box === 6
                ? "otherMarket1RateBox rateBoxWidth"
                : "otherMarket2RateBox rateBoxWidth2"
            }
            // style={
            //   box === 6
            //     ? { width: isLap ? "360px" : !isMobile ? "480px" : "" }
            //     : { width: isLap ? "120px" : !isMobile ? "160px" : "" }
            // }
          >
            {(data?.activeStatus !== "live" ||
              data?.runners?.[1]?.status !== "ACTIVE") && (
              <div className="suspended-overlayRatesotherMarket">
                <span className={`suspendTextCmmn`}>SUSPENDED</span>
              </div>
            )}
            {box === 6 && (
              <div
                className="otherMarketBackBox back3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[1]?.ex?.availableToBack?.[0]?.price,
                    "BACK",
                    data?.type === "other" ? data?.metaData?.teamB : "no",
                    data?.runners?.[1]?.status,
                    data?.runners?.[1]?.ex?.availableToBack?.[0]?.tno,
                    data?.runners?.[1]
                  )
                }
              >
                <span className={`rateFont otherMarketRate1Box`}>
                  {handlePrice(
                    data?.runners?.[1]?.ex?.availableToBack?.[0]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont otherMarketRate2Box`}>
                  {data?.runners?.[1]?.ex?.availableToBack?.[0]?.size}
                </span>
              </div>
            )}
            {box === 6 && (
              <div
                className="otherMarketBackBox back2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[1]?.ex?.availableToBack?.[1]?.price,
                    "BACK",
                    data?.type === "other" ? data?.metaData?.teamB : "no",
                    data?.runners?.[1]?.status,
                    data?.runners?.[1]?.ex?.availableToBack?.[1]?.tno,
                    data?.runners?.[1]
                  )
                }
              >
                <span className={`rateFont otherMarketRate1Box`}>
                  {handlePrice(
                    data?.runners?.[1]?.ex?.availableToBack?.[1]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont otherMarketRate2Box`}>
                  {data?.runners?.[1]?.ex?.availableToBack?.[1]?.size}
                </span>
              </div>
            )}
            <div
              className="otherMarketBackBox back1Background"
              onClick={() =>
                handlePlaceBet(
                  box === 6
                    ? data?.runners?.[1]?.ex?.availableToBack?.[2]?.price
                    : data?.runners?.[1]?.ex?.availableToBack?.[0]?.price,
                  "BACK",
                  data?.type === "other" ? data?.metaData?.teamB : "no",
                  data?.runners?.[1]?.status,
                  box === 6
                    ? data?.runners?.[1]?.ex?.availableToBack?.[2]?.tno
                    : data?.runners?.[1]?.ex?.availableToBack?.[0]?.tno,
                  data?.runners?.[1]
                )
              }
            >
              <span className={`rateFont otherMarketRate1Box`}>
                {box === 6
                  ? handlePrice(
                      data?.runners?.[1]?.ex?.availableToBack?.[2]?.price
                    ) ?? "-"
                  : handlePrice(
                      data?.runners?.[1]?.ex?.availableToBack?.[0]?.price
                    ) ?? "-"}
              </span>
              <span className={`sizeFont otherMarketRate2Box`}>
                {box === 6
                  ? data?.runners?.[1]?.ex?.availableToBack?.[2]?.size
                  : data?.runners?.[1]?.ex?.availableToBack?.[0]?.size}
              </span>
            </div>
            <div
              className="otherMarketBackBox lay1Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[1]?.ex?.availableToLay?.[0]?.price,
                  "LAY",
                  data?.type === "other" ? data?.metaData?.teamB : "no",
                  data?.runners?.[1]?.status,
                  data?.runners?.[1]?.ex?.availableToLay?.[0]?.tno,
                  data?.runners?.[1]
                )
              }
            >
              <span className={`rateFont otherMarketRate1Box`}>
                {handlePrice(
                  data?.runners?.[1]?.ex?.availableToLay?.[0]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont otherMarketRate2Box`}>
                {data?.runners?.[1]?.ex?.availableToLay?.[0]?.size}
              </span>
            </div>
            {box === 6 && (
              <div
                className="otherMarketBackBox lay2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[1]?.ex?.availableToLay?.[1]?.price,
                    "LAY",
                    data?.type === "other" ? data?.metaData?.teamB : "no",
                    data?.runners?.[1]?.status,
                    data?.runners?.[1]?.ex?.availableToLay?.[1]?.tno,
                    data?.runners?.[1]
                  )
                }
              >
                <span className={`rateFont otherMarketRate1Box`}>
                  {handlePrice(
                    data?.runners?.[1]?.ex?.availableToLay?.[1]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont otherMarketRate2Box`}>
                  {data?.runners?.[1]?.ex?.availableToLay?.[1]?.size}
                </span>
              </div>
            )}
            {box === 6 && (
              <div
                className="otherMarketBackBox lay3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[1]?.ex?.availableToLay?.[2]?.price,
                    "LAY",
                    data?.type === "other" ? data?.metaData?.teamB : "no",
                    data?.runners?.[1]?.status,
                    data?.runners?.[1]?.ex?.availableToLay?.[2]?.tno,
                    data?.runners?.[1]
                  )
                }
              >
                <span className={`rateFont otherMarketRate1Box`}>
                  {handlePrice(
                    data?.runners?.[1]?.ex?.availableToLay?.[2]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont otherMarketRate2Box`}>
                  {data?.runners?.[1]?.ex?.availableToLay?.[2]?.size}
                </span>
              </div>
            )}
          </div>
        </div>

        {data?.metaData?.teamC && (
          <div className="otherMarketTeamTab">
            {/* {data?.activeStatus != "live" && (
              <div className="suspended-overlayRatesotherMarket">
                <span className={`suspendTextCmmn`}></span>
              </div>
            )} */}
            <div
              className="otherMarketTeam"
              style={box === 6 ? { width: "28%" } : {}}
            >
              <span className={`teamFont otherMarketTeamTxt`}>
                {data?.metaData?.teamC}
              </span>{" "}
              <span
                className={`${
                  detail?.profitLossDataMatch?.[
                    profitLossDataForMatchConstants[data?.type]?.C
                  ] > 0
                    ? "color-green"
                    : detail?.profitLossDataMatch?.[
                        profitLossDataForMatchConstants[data?.type]?.C
                      ] < 0
                    ? "color-red"
                    : ""
                } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
              >
                {detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.C
                ] ?? 0}
              </span>
            </div>
            <div
              className={
                box === 6
                  ? "otherMarket1RateBox rateBoxWidth"
                  : "otherMarket2RateBox rateBoxWidth2"
              }
              // style={
              //   box === 6
              //     ? { width: isLap ? "360px" : !isMobile ? "480px" : "" }
              //     : { width: isLap ? "120px" : !isMobile ? "160px" : "" }
              // }
            >
              {(data?.activeStatus !== "live" ||
                data?.runners?.[2]?.status !== "ACTIVE") && (
                <div className="suspended-overlayRatesotherMarket">
                  <span className={`suspendTextCmmn`}>SUSPENDED</span>
                </div>
              )}
              {box === 6 && (
                <div
                  className="otherMarketBackBox back3Background"
                  onClick={() =>
                    handlePlaceBet(
                      data?.runners?.[2]?.ex?.availableToBack?.[0]?.price,
                      "BACK",
                      detail?.teamC,
                      data?.runners?.[2]?.status,
                      data?.runners?.[2]?.ex?.availableToBack?.[0]?.tno,
                      data?.runners?.[2]
                    )
                  }
                >
                  <span className={`rateFont otherMarketRate1Box`}>
                    {handlePrice(
                      data?.runners?.[0]?.ex?.availableToBack?.[0]?.price
                    ) ?? "-"}
                  </span>
                  <span className={`sizeFont otherMarketRate2Box`}>
                    {data?.runners?.[0]?.ex?.availableToBack?.[0]?.size}
                  </span>
                </div>
              )}
              {box === 6 && (
                <div
                  className="otherMarketBackBox back2Background"
                  onClick={() =>
                    handlePlaceBet(
                      data?.runners?.[2]?.ex?.availableToBack?.[1]?.price,
                      "BACK",
                      detail?.teamC,
                      data?.runners?.[2]?.status,
                      data?.runners?.[2]?.ex?.availableToBack?.[1]?.tno,
                      data?.runners?.[2]
                    )
                  }
                >
                  <span className={`rateFont otherMarketRate1Box`}>
                    {handlePrice(
                      data?.runners?.[2]?.ex?.availableToBack?.[1]?.price
                    ) ?? "-"}
                  </span>
                  <span className={`sizeFont otherMarketRate2Box`}>
                    {data?.runners?.[2]?.ex?.availableToBack?.[1]?.size}
                  </span>
                </div>
              )}
              <div
                className="otherMarketBackBox back1Background"
                onClick={() =>
                  handlePlaceBet(
                    box === 6
                      ? data?.runners?.[2]?.ex?.availableToBack?.[2]?.price
                      : data?.runners?.[2]?.ex?.availableToBack?.[0]?.price,
                    "BACK",
                    detail?.teamC,
                    data?.runners?.[2]?.status,
                    box === 6
                      ? data?.runners?.[2]?.ex?.availableToBack?.[2]?.tno
                      : data?.runners?.[2]?.ex?.availableToBack?.[0]?.tno,
                    data?.runners?.[2]
                  )
                }
              >
                <span className={`rateFont otherMarketRate1Box`}>
                  {box === 6
                    ? handlePrice(
                        data?.runners?.[2]?.ex?.availableToBack?.[2]?.price
                      ) ?? "-"
                    : handlePrice(
                        data?.runners?.[2]?.ex?.availableToBack?.[0]?.price
                      ) ?? "-"}
                </span>
                <span className={`sizeFont otherMarketRate2Box`}>
                  {box === 6
                    ? data?.runners?.[2]?.ex?.availableToBack?.[2]?.size
                    : data?.runners?.[2]?.ex?.availableToBack?.[0]?.size}
                </span>
              </div>
              <div
                className="otherMarketBackBox lay1Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[2]?.ex?.availableToLay?.[0]?.price,
                    "LAY",
                    detail?.teamC,
                    data?.runners?.[2]?.status,
                    data?.runners?.[2]?.ex?.availableToLay?.[0]?.tno,
                    data?.runners?.[2]
                  )
                }
              >
                <span className={`rateFont otherMarketRate1Box`}>
                  {handlePrice(
                    data?.runners?.[2]?.ex?.availableToLay?.[0]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont otherMarketRate2Box`}>
                  {data?.runners?.[2]?.ex?.availableToLay?.[0]?.size}
                </span>
              </div>
              {box === 6 && (
                <div
                  className="otherMarketBackBox lay2Background"
                  onClick={() =>
                    handlePlaceBet(
                      data?.runners?.[2]?.ex?.availableToLay?.[1]?.price,
                      "LAY",
                      detail?.teamC,
                      data?.runners?.[2]?.status,
                      data?.runners?.[2]?.ex?.availableToLay?.[1]?.tno,
                      data?.runners?.[2]
                    )
                  }
                >
                  <span className={`rateFont otherMarketRate1Box`}>
                    {handlePrice(
                      data?.runners?.[2]?.ex?.availableToLay?.[1]?.price
                    ) ?? "-"}
                  </span>
                  <span className={`sizeFont otherMarketRate2Box`}>
                    {data?.runners?.[2]?.ex?.availableToLay?.[1]?.size}
                  </span>
                </div>
              )}
              {box === 6 && (
                <div
                  className="otherMarketBackBox lay3Background"
                  onClick={() =>
                    handlePlaceBet(
                      data?.runners?.[2]?.ex?.availableToLay?.[2]?.price,
                      "LAY",
                      detail?.teamC,
                      data?.runners?.[2]?.status,
                      data?.runners?.[2]?.ex?.availableToLay?.[2]?.tno,
                      data?.runners?.[2]
                    )
                  }
                >
                  <span className={`rateFont otherMarketRate1Box`}>
                    {handlePrice(
                      data?.runners?.[2]?.ex?.availableToLay?.[2]?.price
                    ) ?? "-"}
                  </span>
                  <span className={`sizeFont otherMarketRate2Box`}>
                    {data?.runners?.[2]?.ex?.availableToLay?.[2]?.size}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        {data?.rem && (
          <div className="otherMarketRemarkTab">
            <div className="remark-content">{data?.rem}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default OtherMarket;
