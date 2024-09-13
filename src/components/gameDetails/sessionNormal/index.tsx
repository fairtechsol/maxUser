import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { isLap, isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { useEffect, useState } from "react";
import {
  getRunAmount,
  resetRunAmountModal,
} from "../../../store/actions/betPlace/betPlaceActions";
import RunBoxTable from "../betTable/runBoxTable";
import { useSelector } from "react-redux";
import { calculateMaxLoss, formatNumber, handleSize } from "../../../helpers";
import { Modal } from "react-bootstrap";

const SessionNormal = ({ title, data, detail, manual ,mtype}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [marketArr, setMarketArr] = useState(data?.section || []);

  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    value: any,
    item: any,
    tno: any
  ) => {
    console.log("team", item);
    // if ( status != "live" || ( data?.status != "OPEN" || item?.status != "active")) {
    //   return false;
    // }
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
      betId: item?.id,
      name: item?.RunnerName || item?.name,
      eventType: detail?.matchType,
      matchId: detail?.id,
      percent: value,
      matchBetType: mtype,
      betPlaceIndex: tno,
      mid: data?.mid?.toString(),
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  const { runAmount, runAmountModal } = useSelector(
    (state: RootState) => state.bets
  );
  const evenIndexArray = [];
  const oddIndexArray = [];

  useEffect(() => {
    const newMarketArr = [...(data?.section || []), ...(manual || [])];
    setMarketArr(newMarketArr);
  }, [data, manual]);

  marketArr?.forEach((element: any, index: any) => {
    if (index % 2 === 0) {
      evenIndexArray.push(element);
    } else {
      oddIndexArray.push(element);
    }
  });
  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };
  const handleStatus = (activeStatus: any, gStaus: any, status: any) => {
    if (activeStatus === "live") {
      if (
        gStaus != undefined &&
        (gStaus === "" || gStaus === "OPEN" || gStaus === "open")
      ) {
        return false;
      } else if (status === "active") {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const handleModal = (event: any) => {
    dispatch(resetRunAmountModal({ showModal: event, id: runAmount?.betId }));
  };

  return (
    <>
      <div
        className="sessionNormalContainer"
        style={{ marginTop: isMobile ? "" : "10px" }}
      >
        <div className="sessionNormalTitle">
          <span className="sessionNormalTitleTxt f-size15">{title}</span>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div className="sessionYesNoBoxContainer">
              <div
                className="sessionYesNoBox rateBoxWidthNormal"
                // style={{ width: isLap ? "180px" : !isMobile ? "240px" : "" }}
              >
                <div className="sessionYesBox lay1Background">
                  <span className={`f-size16 sessionBackTxt`}>No</span>
                </div>
                <div className="sessionYesBox back1Background">
                  <span className={`f-size16 sessionBackTxt`}>Yes</span>
                </div>
                <div className="sessionEmptyBox"></div>
              </div>
            </div>
            {evenIndexArray?.map((item: any, index: any) => {
              return (
                <div className="sessionRateContainer" key={index}>
                  <div
                    className="sessionRateName runnerWidthNormal"
                    style={{ overflow: "hidden" }}
                  >
                    <span
                      className="f-size15"
                      style={{ fontWeight: "400", lineHeight: 1 }}
                      onClick={() => {
                        // console.log("first", item);
                        if (item.activeStatus === "save") {
                          return true;
                        } else if (
                          calculateMaxLoss(
                            detail?.profitLossDataSession,
                            item?.id
                          ) === 0
                        ) {
                          return;
                        } else
                          dispatch(
                            resetRunAmountModal({
                              showModal: true,
                              id: item?.id,
                            })
                          );
                        dispatch(getRunAmount(item?.id));
                      }}
                    >
                      {(item?.RunnerName || item?.name)?.length > 25
                        ? `${(item?.RunnerName || item?.name)?.slice(0, 25)}...`
                        : item?.RunnerName || item?.name}
                    </span>{" "}
                    <span
                      className={`${
                        calculateMaxLoss(
                          detail?.profitLossDataSession,
                          item?.id
                        ) < 0
                          ? "color-red"
                          : "color-red"
                      }  title-14`}
                    >
                      {calculateMaxLoss(
                        detail?.profitLossDataSession,
                        item?.id
                      ) !== 0
                        ? `-${calculateMaxLoss(
                            detail?.profitLossDataSession,
                            item?.id
                          )}`
                        : ""}
                    </span>
                  </div>
                  <div
                    className="sessionRateBoxContainer rateBoxWidthNormal"
                    // style={{
                    //   width: isLap ? "180px" : !isMobile ? "240px" : "",
                    // }}
                  >
                    {handleStatus(
                      item?.activeStatus,
                      item?.GameStatus,
                      item?.status
                    ) && (
                      <div className="suspended-overlayRates">
                        <span className={`suspendTextCmmn`}>
                          {(item?.GameStatus || item?.status)?.toUpperCase() ?? "SUSPENDED"}
                        </span>
                      </div>
                    )}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRight: "1px solid #c7c8ca",
                      }}
                    >
                      <div
                        className={`sessionRateBox rateFont lay1Background`}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handlePlaceBet(
                            item?.ex?.availableToLay?.[0]?.price ||
                              item?.noRate,
                            "no",
                            "NO",
                            item?.activeStatus,
                            item?.ex?.availableToLay?.[0]?.size ||
                              item?.noPercent,
                            item,
                            item?.ex?.availableToLay?.[0]?.tno || 0
                          )
                        }
                      >
                        <span className={`rateFont`}>
                          {handlePrice(
                            item?.ex?.availableToLay?.[0]?.price || item?.noRate
                          ) ?? "-"}
                        </span>
                        <span className={`f-size12 sessionRate2Box`}>
                          {handleSize(item?.ex?.availableToLay?.[0]?.size) ||
                            item?.noPercent}
                        </span>
                      </div>
                      {item?.ex?.availableToLay?.length > 1 && (
                        <div
                          className={`sessionRateBox lay1Background`}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.ex?.availableToLay?.[1]?.price,
                              "no",
                              "NO",
                              item?.activeStatus,
                              item?.ex?.availableToLay?.[1]?.size,
                              item,
                              item?.ex?.availableToLay?.[1]?.tno
                            )
                          }
                        >
                          <span className={`rateFont`}>
                            {handlePrice(
                              item?.ex?.availableToLay?.[1]?.price
                            ) ?? "-"}
                          </span>
                          <span className={`f-size12 sessionRate2Box`}>
                            {handleSize(item?.ex?.availableToLay?.[1]?.size)}
                          </span>
                        </div>
                      )}
                      {item?.ex?.availableToLay?.length > 2 && (
                        <div
                          className={`sessionRateBox lay1Background`}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.ex?.availableToLay?.[2]?.price,
                              "no",
                              "NO",
                              item?.activeStatus,
                              item?.ex?.availableToLay?.[2]?.size,
                              item,
                              item?.ex?.availableToLay?.[2]?.tno
                            )
                          }
                        >
                          <span className={`rateFont`}>
                            {handlePrice(
                              item?.ex?.availableToLay?.[2]?.price
                            ) ?? "-"}
                          </span>
                          <span className={`f-size12 sessionRate2Box`}>
                            {handleSize(item?.ex?.availableToLay?.[2]?.size)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        className="sessionRateBox back1Background"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handlePlaceBet(
                            item?.ex?.availableToBack?.[0]?.price ||
                              item?.yesRate,
                            "Yes",
                            "YES",
                            item?.activeStatus,
                            item?.ex?.availableToBack?.[0]?.size ||
                              item?.yesPercent,
                            item,
                            item?.ex?.availableToBack?.[0]?.tno || 0
                          )
                        }
                      >
                        <span className={`rateFont`}>
                          {handlePrice(
                            item?.ex?.availableToBack?.[0]?.price ||
                              item?.yesRate
                          ) ?? "-"}
                        </span>
                        <span className={`f-size12 sessionRate2Box`}>
                          {handleSize(item?.ex?.availableToBack?.[0]?.size) ||
                            item?.yesPercent}
                        </span>
                      </div>
                      {item?.ex?.availableToBack?.length > 1 && (
                        <div
                          className="sessionRateBox back1Background"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.ex?.availableToBack?.[1]?.price,
                              "Yes",
                              "YES",
                              item?.activeStatus,
                              item?.ex?.availableToBack?.[1]?.size,
                              item,
                              item?.ex?.availableToBack?.[1]?.tno
                            )
                          }
                        >
                          <span className={`rateFont`}>
                            {handlePrice(
                              item?.ex?.availableToBack?.[1]?.price
                            ) ?? "-"}
                          </span>
                          <span className={`f-size12 sessionRate2Box`}>
                            {handleSize(item?.ex?.availableToBack?.[1]?.size)}
                          </span>
                        </div>
                      )}
                      {item?.ex?.availableToBack?.length > 2 && (
                        <div
                          className="sessionRateBox back1Background"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.ex?.availableToBack?.[2]?.price,
                              "Yes",
                              "YES",
                              item?.activeStatus,
                              item?.ex?.availableToBack?.[2]?.size,
                              item,
                              item?.ex?.availableToBack?.[2]?.tno
                            )
                          }
                        >
                          <span className={`rateFont`}>
                            {handlePrice(
                              item?.ex?.availableToBack?.[2]?.price
                            ) ?? "-"}
                          </span>
                          <span className={`f-size12 sessionRate2Box`}>
                            {handleSize(item?.ex?.availableToBack?.[2]?.size)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="sessionMinBoxContainer">
                      <span className={`sessionMinBox`}>
                        Min:{formatNumber(item?.min || item?.minBet)}
                      </span>
                      <span className={`sessionMinBox`}>
                        Max:{formatNumber(item?.max || item?.maxBet)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {oddIndexArray?.length > 0 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {title !== "oddeven" && (
                <div className="sessionYesNoBoxContainer">
                  <div
                    className="sessionEmptyBox"
                    // style={{ width: "54%" }}
                  ></div>
                  <div
                    className="sessionYesNoBox rateBoxWidthNormal"
                    // style={{
                    //   width: isLap ? "180px" : !isMobile ? "240px" : "",
                    // }}
                  >
                    <div className="sessionYesBox lay1Background">
                      <span className={`f-size16 sessionBackTxt`}>No</span>
                    </div>
                    <div className="sessionYesBox back1Background">
                      <span className={`f-size16 sessionBackTxt`}>Yes</span>
                    </div>
                    <div className="sessionEmptyBox"></div>
                  </div>
                </div>
              )}

              {oddIndexArray?.map((item: any, index: any) => {
                return (
                  <div className="sessionRateContainer" key={index}>
                    <div
                      className="sessionRateName runnerWidthNormal"
                      style={{ overflow: "hidden" }}
                    >
                      <span
                        className="f-size15"
                        style={{
                          fontWeight: "400",
                          lineHeight: 1,
                          // overflow:"hidden"
                        }}
                        onClick={() => {
                          if (item.activeStatus === "save") {
                            return true;
                          } else if (
                            calculateMaxLoss(
                              detail?.profitLossDataSession,
                              item?.id
                            ) === 0
                          ) {
                            return;
                          } else
                            dispatch(
                              resetRunAmountModal({
                                showModal: true,
                                id: item?.id,
                              })
                            );
                          dispatch(getRunAmount(item?.id));
                        }}
                      >
                        {(item?.RunnerName || item?.name)?.length > 25
                          ? `${(item?.RunnerName || item?.name)?.slice(
                              0,
                              25
                            )}...`
                          : item?.RunnerName || item?.name}
                      </span>{" "}
                      <span
                        className={`${
                          calculateMaxLoss(
                            detail?.profitLossDataSession,
                            item?.id
                          ) < 0
                            ? "color-red"
                            : "color-red"
                        }  title-14`}
                      >
                        {calculateMaxLoss(
                          detail?.profitLossDataSession,
                          item?.id
                        ) !== 0
                          ? `-${calculateMaxLoss(
                              detail?.profitLossDataSession,
                              item?.id
                            )}`
                          : ""}
                      </span>
                    </div>
                    <div
                      className="sessionRateBoxContainer rateBoxWidthNormal"
                      // style={{
                      //   width: isLap ? "180px" : !isMobile ? "240px" : "",
                      // }}
                    >
                      {handleStatus(
                        item?.activeStatus,
                        item?.GameStatus,
                        item?.status
                      ) && (
                        <div className="suspended-overlayRates">
                          <span className={`suspendTextCmmn`}>
                            {(item?.GameStatus || item?.status)?.toUpperCase() ?? "SUSPENDED"}
                          </span>
                        </div>
                      )}
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          className={`sessionRateBox lay1Background`}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.ex?.availableToLay?.[0]?.price ||
                                item?.noRate,
                              "no",
                              "NO",
                              item?.activeStatus,
                              item?.ex?.availableToLay?.[0]?.size ||
                                item?.noPercent,
                              item,
                              item?.ex?.availableToLay?.[0]?.tno || 0
                            )
                          }
                        >
                          <span className={`rateFont`}>
                            {handlePrice(
                              item?.ex?.availableToLay?.[0]?.price ||
                                item?.noRate
                            ) ?? "-"}
                          </span>
                          <span className={`f-size12 sessionRate2Box`}>
                            {handleSize(item?.ex?.availableToLay?.[0]?.size) ||
                              item?.noPercent}
                          </span>
                        </div>
                        {item?.ex?.availableToLay?.length > 1 && (
                          <div
                            className={`sessionRateBox lay1Background`}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handlePlaceBet(
                                item?.ex?.availableToLay?.[1]?.price,
                                "no",
                                "NO",
                                item?.activeStatus,
                                item?.ex?.availableToLay?.[1]?.size,
                                item,
                                item?.ex?.availableToLay?.[1]?.tno
                              )
                            }
                          >
                            <span className={`rateFont`}>
                              {handlePrice(
                                item?.ex?.availableToLay?.[1]?.price
                              ) ?? "-"}
                            </span>
                            <span className={`f-size12 sessionRate2Box`}>
                              {handleSize(item?.ex?.availableToLay?.[1]?.size)}
                            </span>
                          </div>
                        )}
                        {item?.ex?.availableToLay?.length > 2 && (
                          <div
                            className={`sessionRateBox lay1Background`}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handlePlaceBet(
                                item?.ex?.availableToLay?.[2]?.price,
                                "no",
                                "NO",
                                item?.activeStatus,
                                item?.ex?.availableToLay?.[2]?.size,
                                item,
                                item?.ex?.availableToLay?.[2]?.tno
                              )
                            }
                          >
                            <span className={`rateFont`}>
                              {handlePrice(
                                item?.ex?.availableToLay?.[2]?.price
                              ) ?? "-"}
                            </span>
                            <span className={`f-size12 sessionRate2Box`}>
                              {handleSize(item?.ex?.availableToLay?.[2]?.size)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          className="sessionRateBox back1Background"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.ex?.availableToBack?.[0]?.price ||
                                item?.yesRate,
                              "Yes",
                              "YES",
                              item?.activeStatus,
                              item?.ex?.availableToBack?.[0]?.size ||
                                item?.yesPercent,
                              item,
                              item?.ex?.availableToBack?.[0]?.tno
                            )
                          }
                        >
                          <span className={`rateFont`}>
                            {handlePrice(
                              item?.ex?.availableToBack?.[0]?.price ||
                                item?.yesRate
                            ) ?? "-"}
                          </span>
                          <span className={`f-size12 sessionRate2Box`}>
                            {handleSize(item?.ex?.availableToBack?.[0]?.size) ||
                              item?.yesPercent}
                          </span>
                        </div>
                        {item?.ex?.availableToBack?.length > 1 && (
                          <div
                            className="sessionRateBox back1Background"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handlePlaceBet(
                                item?.ex?.availableToBack?.[1]?.price,
                                "Yes",
                                "YES",
                                item?.activeStatus,
                                title === "oddeven"
                                  ? item?.ex?.availableToBack?.[1]?.price
                                  : item?.ex?.availableToBack?.[1]?.size,
                                item,
                                item?.ex?.availableToBack?.[1]?.tno
                              )
                            }
                          >
                            <span className={`rateFont`}>
                              {handlePrice(
                                item?.ex?.availableToBack?.[1]?.price
                              ) ?? "-"}
                            </span>
                            <span className={`f-size12 sessionRate2Box`}>
                              {handleSize(item?.ex?.availableToBack?.[1]?.size)}
                            </span>
                          </div>
                        )}
                        {item?.ex?.availableToBack?.length > 2 && (
                          <div
                            className="sessionRateBox back1Background"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handlePlaceBet(
                                item?.ex?.availableToBack?.[2]?.price,
                                "Yes",
                                "YES",
                                item?.activeStatus,
                                item?.ex?.availableToBack?.[2]?.size,
                                item,
                                item?.ex?.availableToBack?.[2]?.tno
                              )
                            }
                          >
                            <span className={`rateFont`}>
                              {handlePrice(
                                item?.ex?.availableToBack?.[2]?.price
                              ) ?? "-"}
                            </span>
                            <span className={`f-size12 sessionRate2Box`}>
                              {handleSize(item?.ex?.availableToBack?.[2]?.size)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="sessionMinBoxContainer">
                        <span className={`sessionMinBox`}>
                          Min:{formatNumber(item?.min || item?.minBet)}
                        </span>
                        <span className={`sessionMinBox`}>
                          Max:{formatNumber(item?.max || item?.maxBet)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      <Modal show={runAmountModal} onHide={()=>handleModal(false)}>
        <Modal.Header
          className="bg-primary rounded-0"
          style={{ zIndex: "999" }}
        >
          <Modal.Title>
            <span
              style={{ color: "#fff", fontSize: "16px", fontWeight: "bold" }}
            >
              Run Amount
            </span>
          </Modal.Title>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={()=>handleModal(false)}
          ></button>
        </Modal.Header>
        <Modal.Body className="p-0 mt-2 mb-2 rounded-0">
        <div style={{ width: "100%", height: "auto", overflowY: "auto",padding:"10px" }}>
          <RunBoxTable runAmount={{ betPlaced: runAmount?.runAmountData }} />
        </div>
        </Modal.Body>
        {/* {footer ? <Modal.Footer>{footer}</Modal.Footer> : ""} */}
      </Modal>
    </>
  );
};
export default SessionNormal;
