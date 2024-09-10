import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { isLap, isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { AppDispatch } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/constants";
import { handleSize } from "../../../helpers";

const Bookmaker = ({ title, box, data, detail }) => {
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

  return (
    <>
      <div className="bookmakerContainer">
        <div className="bookmakerTitle">
          <span
            className={`bookmakerTitleTxt ${
              isMobile ? "f-size13" : "f-size15"
            }`}
          >
            {title}
          </span>
        </div>

        <div className="bookmakerBackLayTab">
          <div className="bookmakerMinMaxBox">
            <span className="bookmakerMinMax">
              Min:{formatNumber(data?.minBet)} Max:{formatNumber(data?.maxBet)}
            </span>
          </div>
          <div
            className={
              box === 6
                ? "bookmaker1BackLayBoxContainer backLayBoxWidth"
                : "bookmaker2BackLayBoxContainer backLayBoxWidth2"
            }
            // style={
            //   box === 6
            //     ? { width: isLap ? "240px" : !isMobile ? "320px" : "" }
            //     : { width: isLap ? "120px" : !isMobile ? "160px" : "" }
            // }
          >
            <div
              className={
                box === 6 ? "bookmaker1BackBoxTab" : "bookmaker2BackBoxTab"
              }
            >
              <span className={`f-size16 bookmakerBackTxt`}>Back</span>
            </div>
            <div
              className={
                box === 6 ? "bookmaker1LayBoxTab" : "bookmaker2LayBoxTab"
              }
            >
              <span className={`f-size16 bookmakerBackTxt`}>Lay</span>
            </div>
            {box === 6 && <div className="bookmakerEmptyBox"></div>}
          </div>
        </div>

        <div className="bookmakerTeamTab">
          {/* {data?.activeStatus != "live" && (
            <div className="suspended-overlayRatesBookmaker">
              <span className={`suspendedTxtBookmaker`}></span>
            </div>
          )} */}
          <div
            className="bookmakerTeam"
            style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont bookmakerTeamTxt`}>
              {detail?.teamA?.length > 25
                ? `${detail?.teamA?.slice(0, 25)}...`
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
              } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
            >
              {detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.A+"_"+detail?.id
              ] ?? ""}
            </span>
          </div>
          <div
            className={
              box === 6
                ? "bookmaker1RateBox rateBoxWidth"
                : "bookmaker2RateBox rateBoxWidth2"
            }
            // style={
            //   box === 6
            //     ? { width: isLap ? "360px" : !isMobile ? "480px" : "" }
            //     : { width: isLap ? "120px" : !isMobile ? "160px" : "" }
            // }
          >
            {(data?.activeStatus !== "live" ||
              data?.runners?.[0]?.status !== "ACTIVE") && (
              <div className="suspended-overlayRatesBookmaker">
                <span className={`suspendTextCmmn`}>SUSPENDED</span>
              </div>
            )}
            {box === 6 && (
              <div
                className="bookmakerBackBox back3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[0]?.ex?.availableToBack?.[0]?.price,
                    "BACK",
                    detail?.teamA,
                    data?.runners?.[0]?.status,
                    data?.runners?.[0]?.ex?.availableToBack?.[0]?.tno,
                    data?.runners?.[0]
                  )
                }
              >
                <span className={`rateFont bookmakerRate1Box`}>
                  {handlePrice(
                    data?.runners?.[0]?.ex?.availableToBack?.[0]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont bookmakerRate2Box`}>
                  {handleSize(data?.runners?.[0]?.ex?.availableToBack?.[0]?.size)}
                </span>
              </div>
            )}
            {box === 6 && (
              <div
                className="bookmakerBackBox back2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[0]?.ex?.availableToBack?.[1]?.price,
                    "BACK",
                    detail?.teamA,
                    data?.runners?.[0]?.status,
                    data?.runners?.[0]?.ex?.availableToBack?.[1]?.tno,
                    data?.runners?.[0]
                  )
                }
              >
                <span className={`rateFont bookmakerRate1Box`}>
                  {handlePrice(
                    data?.runners?.[0]?.ex?.availableToBack?.[1]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont bookmakerRate2Box`}>
                  {handleSize(data?.runners?.[0]?.ex?.availableToBack?.[1]?.size)}
                </span>
              </div>
            )}
            <div
              className="bookmakerBackBox back1Background"
              onClick={() =>
                handlePlaceBet(
                  box === 6
                    ? data?.runners?.[0]?.ex?.availableToBack?.[2]?.price
                    : data?.runners?.[0]?.ex?.availableToBack?.[0]?.price,
                  "BACK",
                  detail?.teamA,
                  data?.runners?.[0]?.status,
                  box === 6
                    ? data?.runners?.[0]?.ex?.availableToBack?.[2]?.tno
                    : data?.runners?.[0]?.ex?.availableToBack?.[0]?.tno,
                  data?.runners?.[0]
                )
              }
            >
              <span className={`rateFont bookmakerRate1Box`}>
                {box === 6
                  ? handlePrice(
                      data?.runners?.[0]?.ex?.availableToBack?.[2]?.price
                    ) ?? "-"
                  : handlePrice(
                      data?.runners?.[0]?.ex?.availableToBack?.[0]?.price
                    ) ?? "-"}
              </span>
              <span className={`sizeFont bookmakerRate2Box`}>
                {box === 6
                  ? handleSize(data?.runners?.[0]?.ex?.availableToBack?.[2]?.size)
                  : handleSize(data?.runners?.[0]?.ex?.availableToBack?.[0]?.size)}
              </span>
            </div>
            <div
              className="bookmakerBackBox lay1Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[0]?.ex?.availableToLay?.[0]?.price,
                  "LAY",
                  detail?.teamA,
                  data?.runners?.[0]?.status,
                  data?.runners?.[0]?.ex?.availableToLay?.[0]?.tno,
                  data?.runners?.[0]
                )
              }
            >
              <span className={`rateFont bookmakerRate1Box`}>
                {handlePrice(
                  data?.runners?.[0]?.ex?.availableToLay?.[0]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont bookmakerRate2Box`}>
                {handleSize(data?.runners?.[0]?.ex?.availableToLay?.[0]?.size)}
              </span>
            </div>
            {box === 6 && (
              <div
                className="bookmakerBackBox lay2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[0]?.ex?.availableToLay?.[1]?.price,
                    "LAY",
                    detail?.teamA,
                    data?.runners?.[0]?.status,
                    data?.runners?.[0]?.ex?.availableToLay?.[1]?.tno,
                    data?.runners?.[0]
                  )
                }
              >
                <span className={`rateFont bookmakerRate1Box`}>
                  {handlePrice(
                    data?.runners?.[0]?.ex?.availableToLay?.[1]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont bookmakerRate2Box`}>
                  {handleSize(data?.runners?.[0]?.ex?.availableToLay?.[1]?.size)}
                </span>
              </div>
            )}
            {box === 6 && (
              <div
                className="bookmakerBackBox lay3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[0]?.ex?.availableToLay?.[2]?.price,
                    "LAY",
                    detail?.teamA,
                    data?.runners?.[0]?.status,
                    data?.runners?.[0]?.ex?.availableToLay?.[2]?.tno,
                    data?.runners?.[0]
                  )
                }
              >
                <span className={`rateFont bookmakerRate1Box`}>
                  {handlePrice(
                    data?.runners?.[0]?.ex?.availableToLay?.[2]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont bookmakerRate2Box`}>
                  {handleSize(data?.runners?.[0]?.ex?.availableToLay?.[2]?.size)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bookmakerTeamTab">
          {/* {data?.activeStatus != "live" && (
            <div className="suspended-overlayRatesBookmaker">
              <span
                className={`${
                  !isMobile ? "f-size18" : "f-size16"
                } suspendedTxtBookmaker`}
              ></span>
            </div>
          )} */}
          <div
            className="bookmakerTeam"
            style={box === 6 ? { width: "28%" } : {}}
          >
            <span className={`teamFont bookmakerTeamTxt`}>
              {detail?.teamB?.length > 25
                ? `${detail?.teamB?.slice(0, 25)}...`
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
              } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
            >
              {detail?.profitLossDataMatch?.[
                profitLossDataForMatchConstants[data?.type]?.B+"_"+detail?.id
              ] ?? ""}
            </span>
          </div>
          <div
            className={
              box === 6
                ? "bookmaker1RateBox rateBoxWidth"
                : "bookmaker2RateBox rateBoxWidth2"
            }
            // style={
            //   box === 6
            //     ? { width: isLap ? "360px" : !isMobile ? "480px" : "" }
            //     : { width: isLap ? "120px" : !isMobile ? "160px" : "" }
            // }
          >
            {(data?.activeStatus !== "live" ||
              data?.runners?.[1]?.status !== "ACTIVE") && (
              <div className="suspended-overlayRatesBookmaker">
                <span className={`suspendTextCmmn`}>SUSPENDED</span>
              </div>
            )}
            {box === 6 && (
              <div
                className="bookmakerBackBox back3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[1]?.ex?.availableToBack?.[0]?.price,
                    "BACK",
                    detail?.teamB,
                    data?.runners?.[1]?.status,
                    data?.runners?.[1]?.ex?.availableToBack?.[0]?.tno,
                    data?.runners?.[1]
                  )
                }
              >
                <span className={`rateFont bookmakerRate1Box`}>
                  {handlePrice(
                    data?.runners?.[1]?.ex?.availableToBack?.[0]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont bookmakerRate2Box`}>
                  {handleSize(data?.runners?.[1]?.ex?.availableToBack?.[0]?.size)}
                </span>
              </div>
            )}
            {box === 6 && (
              <div
                className="bookmakerBackBox back2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[1]?.ex?.availableToBack?.[1]?.price,
                    "BACK",
                    detail?.teamB,
                    data?.runners?.[1]?.status,
                    data?.runners?.[1]?.ex?.availableToBack?.[1]?.tno,
                    data?.runners?.[1]
                  )
                }
              >
                <span className={`rateFont bookmakerRate1Box`}>
                  {handlePrice(
                    data?.runners?.[1]?.ex?.availableToBack?.[1]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont bookmakerRate2Box`}>
                  {handleSize(data?.runners?.[1]?.ex?.availableToBack?.[1]?.size)}
                </span>
              </div>
            )}
            <div
              className="bookmakerBackBox back1Background"
              onClick={() =>
                handlePlaceBet(
                  box === 6
                    ? data?.runners?.[1]?.ex?.availableToBack?.[2]?.price
                    : data?.runners?.[1]?.ex?.availableToBack?.[0]?.price,
                  "BACK",
                  detail?.teamB,
                  data?.runners?.[1]?.status,
                  box === 6
                    ? data?.runners?.[1]?.ex?.availableToBack?.[2]?.tno
                    : data?.runners?.[1]?.ex?.availableToBack?.[0]?.tno,
                  data?.runners?.[1]
                )
              }
            >
              <span className={`rateFont bookmakerRate1Box`}>
                {box === 6
                  ? handlePrice(
                      data?.runners?.[1]?.ex?.availableToBack?.[2]?.price
                    ) ?? "-"
                  : handlePrice(
                      data?.runners?.[1]?.ex?.availableToBack?.[0]?.price
                    ) ?? "-"}
              </span>
              <span className={`sizeFont bookmakerRate2Box`}>
                {box === 6
                  ? handleSize(data?.runners?.[1]?.ex?.availableToBack?.[2]?.size)
                  : handleSize(data?.runners?.[1]?.ex?.availableToBack?.[0]?.size)}
              </span>
            </div>
            <div
              className="bookmakerBackBox lay1Background"
              onClick={() =>
                handlePlaceBet(
                  data?.runners?.[1]?.ex?.availableToLay?.[0]?.price,
                  "LAY",
                  detail?.teamB,
                  data?.runners?.[1]?.status,
                  data?.runners?.[1]?.ex?.availableToLay?.[0]?.tno,
                  data?.runners?.[1]
                )
              }
            >
              <span className={`rateFont bookmakerRate1Box`}>
                {handlePrice(
                  data?.runners?.[1]?.ex?.availableToLay?.[0]?.price
                ) ?? "-"}
              </span>
              <span className={`sizeFont bookmakerRate2Box`}>
                {handleSize(data?.runners?.[1]?.ex?.availableToLay?.[0]?.size)}
              </span>
            </div>
            {box === 6 && (
              <div
                className="bookmakerBackBox lay2Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[1]?.ex?.availableToLay?.[1]?.price,
                    "LAY",
                    detail?.teamB,
                    data?.runners?.[1]?.status,
                    data?.runners?.[1]?.ex?.availableToLay?.[1]?.tno,
                    data?.runners?.[1]
                  )
                }
              >
                <span className={`rateFont bookmakerRate1Box`}>
                  {handlePrice(
                    data?.runners?.[1]?.ex?.availableToLay?.[1]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont bookmakerRate2Box`}>
                  {handleSize(data?.runners?.[1]?.ex?.availableToLay?.[1]?.size)}
                </span>
              </div>
            )}
            {box === 6 && (
              <div
                className="bookmakerBackBox lay3Background"
                onClick={() =>
                  handlePlaceBet(
                    data?.runners?.[1]?.ex?.availableToLay?.[2]?.price,
                    "LAY",
                    detail?.teamB,
                    data?.runners?.[1]?.status,
                    data?.runners?.[1]?.ex?.availableToLay?.[2]?.tno,
                    data?.runners?.[1]
                  )
                }
              >
                <span className={`rateFont bookmakerRate1Box`}>
                  {handlePrice(
                    data?.runners?.[1]?.ex?.availableToLay?.[2]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont bookmakerRate2Box`}>
                  {handleSize(data?.runners?.[1]?.ex?.availableToLay?.[2]?.size)}
                </span>
              </div>
            )}
          </div>
        </div>

        {detail?.teamC && (
          <div className="bookmakerTeamTab">
            {/* {data?.activeStatus != "live" && (
              <div className="suspended-overlayRatesBookmaker">
                <span className={`suspendTextCmmn`}></span>
              </div>
            )} */}
            <div
              className="bookmakerTeam"
              style={box === 6 ? { width: "28%" } : {}}
            >
              <span className={`teamFont bookmakerTeamTxt`}>
                {detail?.teamC?.length > 25
                  ? `${detail?.teamC?.slice(0, 25)}...`
                  : detail?.teamC}
              </span>{" "}
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
                } ${isMobile ? "fbold title-12" : "fbold title-14"}`}
              >
                {detail?.profitLossDataMatch?.[
                  profitLossDataForMatchConstants[data?.type]?.C+"_"+detail?.id
                ] ?? ""}
              </span>
            </div>
            <div
              className={
                box === 6
                  ? "bookmaker1RateBox rateBoxWidth"
                  : "bookmaker2RateBox rateBoxWidth2"
              }
              // style={
              //   box === 6
              //     ? { width: isLap ? "360px" : !isMobile ? "480px" : "" }
              //     : { width: isLap ? "120px" : !isMobile ? "160px" : "" }
              // }
            >
              {(data?.activeStatus !== "live" ||
                data?.runners?.[2]?.status !== "ACTIVE") && (
                <div className="suspended-overlayRatesBookmaker">
                  <span className={`suspendTextCmmn`}>SUSPENDED</span>
                </div>
              )}
              {box === 6 && (
                <div
                  className="bookmakerBackBox back3Background"
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
                  <span className={`rateFont bookmakerRate1Box`}>
                    {handlePrice(
                      data?.runners?.[0]?.ex?.availableToBack?.[0]?.price
                    ) ?? "-"}
                  </span>
                  <span className={`sizeFont bookmakerRate2Box`}>
                    {handleSize(data?.runners?.[0]?.ex?.availableToBack?.[0]?.size)}
                  </span>
                </div>
              )}
              {box === 6 && (
                <div
                  className="bookmakerBackBox back2Background"
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
                  <span className={`rateFont bookmakerRate1Box`}>
                    {handlePrice(
                      data?.runners?.[2]?.ex?.availableToBack?.[1]?.price
                    ) ?? "-"}
                  </span>
                  <span className={`sizeFont bookmakerRate2Box`}>
                    {handleSize(data?.runners?.[2]?.ex?.availableToBack?.[1]?.size)}
                  </span>
                </div>
              )}
              <div
                className="bookmakerBackBox back1Background"
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
                <span className={`rateFont bookmakerRate1Box`}>
                  {box === 6
                    ? handlePrice(
                        data?.runners?.[2]?.ex?.availableToBack?.[2]?.price
                      ) ?? "-"
                    : handlePrice(
                        data?.runners?.[2]?.ex?.availableToBack?.[0]?.price
                      ) ?? "-"}
                </span>
                <span className={`sizeFont bookmakerRate2Box`}>
                  {box === 6
                    ? handleSize(data?.runners?.[2]?.ex?.availableToBack?.[2]?.size)
                    : handleSize(data?.runners?.[2]?.ex?.availableToBack?.[0]?.size)}
                </span>
              </div>
              <div
                className="bookmakerBackBox lay1Background"
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
                <span className={`rateFont bookmakerRate1Box`}>
                  {handlePrice(
                    data?.runners?.[2]?.ex?.availableToLay?.[0]?.price
                  ) ?? "-"}
                </span>
                <span className={`sizeFont bookmakerRate2Box`}>
                  {handleSize(data?.runners?.[2]?.ex?.availableToLay?.[0]?.size)}
                </span>
              </div>
              {box === 6 && (
                <div
                  className="bookmakerBackBox lay2Background"
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
                  <span className={`rateFont bookmakerRate1Box`}>
                    {handlePrice(
                      data?.runners?.[2]?.ex?.availableToLay?.[1]?.price
                    ) ?? "-"}
                  </span>
                  <span className={`sizeFont bookmakerRate2Box`}>
                    {handleSize(data?.runners?.[2]?.ex?.availableToLay?.[1]?.size)}
                  </span>
                </div>
              )}
              {box === 6 && (
                <div
                  className="bookmakerBackBox lay3Background"
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
                  <span className={`rateFont bookmakerRate1Box`}>
                    {handlePrice(
                      data?.runners?.[2]?.ex?.availableToLay?.[2]?.price
                    ) ?? "-"}
                  </span>
                  <span className={`sizeFont bookmakerRate2Box`}>
                    {handleSize(data?.runners?.[2]?.ex?.availableToLay?.[2]?.size)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        {data?.rem && (
          <div className="bookmakerRemarkTab">
            <div className="remark-content">{data?.rem}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default Bookmaker;
