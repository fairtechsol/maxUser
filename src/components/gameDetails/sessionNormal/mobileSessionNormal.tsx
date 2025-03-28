import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { calculateMaxLoss, handleSize } from "../../../helpers";
import {
  getRunAmount,
  getRunAmountMeter,
  resetRunAmountModal,
} from "../../../store/actions/betPlace/betPlaceActions";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import RunBoxTable from "../betTable/runBoxTable";
import "./style.scss";

const MobileSessionNormal = ({ title, data, detail, manual }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [marketArr, setMarketArr] = useState(data?.section || []);

  const { runAmount, runAmountModal } = useSelector(
    (state: RootState) => state.bets
  );
  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    value: any,
    item: any,
    tno: any
  ) => {
    if (status != "live") {
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
      betId: item?.id,
      name: item?.RunnerName || item?.name,
      eventType: detail?.matchType,
      matchId: detail?.id,
      percent: value,
      matchBetType: "session",
      betPlaceIndex: tno,
      mid: data?.mid?.toString(),
      min: item?.min || item?.minBet,
      max: item?.max || item?.maxBet,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  useEffect(() => {
    const newMarketArr = [...(manual || []), ...(data?.section || [])];
    setMarketArr(newMarketArr);
  }, [data, manual]);

  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };
  const handleStatus = (activeStatus: any, gStaus: any, status: any) => {
    if (activeStatus === "live") {
      if (gStaus === "") {
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

  useEffect(() => {
    handleModal(false);
  }, []);
  return (
    <>
      <div className="sessionNormalContainer">
        <div className="sessionNormalTitle">
          <span className="sessionNormalTitleTxt f-size13">{title}</span>
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
              <div className="sessionYesNoBox" style={{ width: "40%" }}>
                <div
                  className="sessionYesBox lay1Background"
                  style={{ width: "100%" }}
                >
                  <span className={`f-size16 sessionBackTxt`}>No</span>
                </div>
                <div
                  className="sessionYesBox back1Background"
                  style={{ width: "100%" }}
                >
                  <span className={`f-size16 sessionBackTxt`}>Yes</span>
                </div>
              </div>
            </div>
            {marketArr?.map((item: any, index: any) => {
              return (
                <div className="w-100 d-flex flex-column">
                  <div className="sessionRateContainer" key={index}>
                    <div
                      className="sessionRateName"
                      style={{ width: "60%", overflow: "hidden" }}
                    >
                      <span
                        className="f-size13"
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
                          if (title === "meter") {
                            dispatch(getRunAmountMeter(item?.id));
                          } else {
                            dispatch(getRunAmount(item?.id));
                          }
                        }}
                      >
                        {item?.RunnerName || item?.name}
                      </span>
                      <span
                        className={`${
                          calculateMaxLoss(
                            detail?.profitLossDataSession,
                            item?.id
                          ) < 0
                            ? "color-red"
                            : "color-red"
                        } title-13 fbold`}
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
                      className="sessionRateBoxContainer"
                      style={{ width: "40%" }}
                    >
                      {handleStatus(
                        item?.activeStatus,
                        item?.GameStatus,
                        item?.status
                      ) && (
                        <div className="suspended-overlayRates">
                          <span className={`suspendTextCmmn`}>
                            {(
                              item?.GameStatus || item?.status
                            )?.toUpperCase() ?? "SUSPENDED"}
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
                              item?.RunnerName || item?.name,
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
                          <span className={`f-size11 sessionRate2Box`}>
                            {handleSize(
                              item?.ex?.availableToLay?.[0]?.size ||
                                item?.noPercent
                            )}
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
                                item?.RunnerName || item?.name,
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
                            <span className={`f-size11 sessionRate2Box`}>
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
                                item?.RunnerName || item?.name,
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
                            <span className={`f-size11 sessionRate2Box`}>
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
                              item?.RunnerName || item?.name,
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
                          <span className={`f-size11 sessionRate2Box`}>
                            {handleSize(
                              item?.ex?.availableToBack?.[0]?.size ||
                                item?.yesPercent
                            )}
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
                                item?.RunnerName || item?.name,
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
                            <span className={`f-size11 sessionRate2Box`}>
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
                                item?.RunnerName || item?.name,
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
                            <span className={`f-size11 sessionRate2Box`}>
                              {handleSize(item?.ex?.availableToBack?.[2]?.size)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {item?.rem && (
                    <div
                      className="w-100 text-start"
                      style={{
                        fontSize: "11px",
                        color: "#097c93",
                        backgroundColor: "#f2f2f2",
                        borderBottom: "1px solid #c7c8ca",
                      }}
                    >
                      {item?.rem}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        className="runbetMobileModal"
        show={runAmountModal}
        onHide={() => handleModal(false)}
        style={{ margin: 0 }}
      >
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
            onClick={() => handleModal(false)}
          ></button>
        </Modal.Header>
        <Modal.Body className="p-0 rounded-0">
          <div style={{ width: "100%", height: "auto", overflowY: "auto" }}>
            <RunBoxTable runAmount={{ betPlaced: runAmount?.runAmountData }} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default MobileSessionNormal;
