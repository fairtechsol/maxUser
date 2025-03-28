import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { calculateMaxLoss, handleSize } from "../../../helpers";
import {
  getRunAmountMeter,
  resetRunAmountModalKhado,
} from "../../../store/actions/betPlace/betPlaceActions";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import RunBoxTable from "../betTable/runBoxTable";
import "./style.scss";

const MobileSessionKhado = ({ title, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();

  const { runAmount, runAmountModalKhado } = useSelector(
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
      name: `${item?.RunnerName}-${item?.ex?.availableToLay?.[0]?.price}`,
      eventType: detail?.matchType,
      matchId: detail?.id,
      percent: value,
      mid: data?.mid?.toString(),
      betPlaceIndex: tno,
      matchBetType: "session",
      min: item?.min,
      max: item?.max,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };

  useEffect(() => {
    handleModal(false);
  }, []);
  const handleModal = (event: any) => {
    dispatch(
      resetRunAmountModalKhado({ showModal: event, id: runAmount?.betId })
    );
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
              <div className="sessionYesNoBox" style={{ width: "20%" }}>
                <div
                  className="sessionYesBox back1Background"
                  style={{ width: "100%" }}
                >
                  <span className={`f-size16 sessionBackTxt`}>Back</span>
                </div>
              </div>
            </div>
            {data?.section?.map((item: any, index: any) => {
              return (
                <div className="w-100 d-flex flex-column">
                  <div className="sessionRateContainer" key={index}>
                    <div
                      className="sessionRateName"
                      style={{ width: "60%", overflow: "hidden" }}
                    >
                      <span
                        className="f-size13"
                        style={{ fontWeight: "400" }}
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
                              resetRunAmountModalKhado({
                                showModal: true,
                                id: item?.id,
                              })
                            );
                          dispatch(getRunAmountMeter(item?.id));
                        }}
                      >
                        {item?.RunnerName}-
                        {item?.ex?.availableToLay?.[0]?.price}
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
                    <div className="sessionRateBoxContainer rateBoxWidthKhado">
                      {(item?.activeStatus != "live" ||
                        item?.GameStatus != "") && (
                        <div className="suspended-overlayRates">
                          <span className={`suspendTextCmmn`}>
                            {item?.GameStatus ?? "SUSPENDED"}
                          </span>
                        </div>
                      )}
                      <div
                        className={`sessionRateBox back1Background`}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handlePlaceBet(
                            item?.ex?.availableToBack?.[0]?.price,
                            "Back",
                            `${item?.RunnerName}-${item?.ex?.availableToLay?.[0]?.price}`,
                            item?.activeStatus,
                            item?.ex?.availableToBack?.[0]?.size,
                            item,
                            item?.ex?.availableToBack?.[0]?.tno
                          )
                        }
                      >
                        <span className={`rateFont`}>
                          {handlePrice(item?.ex?.availableToBack?.[0]?.price) ??
                            "-"}
                        </span>
                        <span className={`f-size11 sessionRate2Box`}>
                          {handleSize(item?.ex?.availableToBack?.[0]?.size)}
                        </span>
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
        <Modal show={runAmountModalKhado} onHide={() => handleModal(false)}>
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
          <Modal.Body className="p-0 mt-2 mb-2 rounded-0">
            <div
              style={{
                width: "100%",
                height: "100vh",
                overflowY: "auto",
                padding: "10px",
              }}
            >
              <RunBoxTable
                runAmount={{ betPlaced: runAmount?.runAmountData }}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export default MobileSessionKhado;
