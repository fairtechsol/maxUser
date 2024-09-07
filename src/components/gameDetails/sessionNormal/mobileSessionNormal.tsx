import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { useEffect, useState } from "react";
import {
  getRunAmount,
  resetRunAmountModal,
} from "../../../store/actions/betPlace/betPlaceActions";
import CustomModal from "../../commonComponent/modal";
import RunBoxTable from "../betTable/runBoxTable";
import { useSelector } from "react-redux";
import { calculateMaxLoss } from "../../../helpers";

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
    if (data?.status != "OPEN" || status != "live") {
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
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  useEffect(() => {
    const newMarketArr = [...(data?.section || []), ...(manual || [])];
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
                        dispatch(getRunAmount(item?.id));
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
                      } title-13`}
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
                        <span
                          className={`${
                            !isMobile ? "f-size18" : "f-size16"
                          } suspendedTxtMatchOdd`}
                        >
                          {(item?.GameStatus || item?.status) ?? "SUSPENDED"}
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
                        <span className={`f-size15 sessionRate1Box`}>
                          {handlePrice(
                            item?.ex?.availableToLay?.[0]?.price || item?.noRate
                          ) ?? "-"}
                        </span>
                        <span className={`f-size11 sessionRate2Box`}>
                          {item?.ex?.availableToLay?.[0]?.size ||
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
                          <span className={`f-size15 sessionRate1Box`}>
                            {handlePrice(
                              item?.ex?.availableToLay?.[1]?.price
                            ) ?? "-"}
                          </span>
                          <span className={`f-size11 sessionRate2Box`}>
                            {item?.ex?.availableToLay?.[1]?.size}
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
                          <span className={`f-size15 sessionRate1Box`}>
                            {handlePrice(
                              item?.ex?.availableToLay?.[2]?.price
                            ) ?? "-"}
                          </span>
                          <span className={`f-size11 sessionRate2Box`}>
                            {item?.ex?.availableToLay?.[2]?.size}
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
                        <span className={`f-size15 sessionRate1Box`}>
                          {handlePrice(
                            item?.ex?.availableToBack?.[0]?.price ||
                              item?.yesRate
                          ) ?? "-"}
                        </span>
                        <span className={`f-size11 sessionRate2Box`}>
                          {item?.ex?.availableToBack?.[0]?.size ||
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
                          <span className={`f-size15 sessionRate1Box`}>
                            {handlePrice(
                              item?.ex?.availableToBack?.[1]?.price
                            ) ?? "-"}
                          </span>
                          <span className={`f-size11 sessionRate2Box`}>
                            {item?.ex?.availableToBack?.[1]?.size}
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
                          <span className={`f-size15 sessionRate1Box`}>
                            {handlePrice(
                              item?.ex?.availableToBack?.[2]?.price
                            ) ?? "-"}
                          </span>
                          <span className={`f-size11 sessionRate2Box`}>
                            {item?.ex?.availableToBack?.[2]?.size}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <CustomModal
        customClass="runAmountBetModal"
        title={"Run Amount"}
        show={runAmountModal}
        setShow={handleModal}
      >
        <div style={{ width: "100%", height: "auto", overflowY: "auto" }}>
          <RunBoxTable runAmount={{ betPlaced: runAmount?.runAmountData }} />
        </div>
      </CustomModal>
    </>
  );
};
export default MobileSessionNormal;
