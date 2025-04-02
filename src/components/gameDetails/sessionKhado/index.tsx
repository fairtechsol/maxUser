import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { calculateMaxLoss, formatNumber, handleSize } from "../../../helpers";
import { getRunAmountMeter, resetRunAmountModalKhado } from "../../../store/actions/betPlace/betPlaceActions";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { isMobile } from "../../../utils/screenDimension";
import RunBoxTable from "../betTable/runBoxTable";
import "./style.scss";

const SessionKhado = ({ title, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();

  const { runAmount, runAmountModalKhado } = useSelector(
    (state: RootState) => state.bets
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
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  const evenIndexArray = [];
  const oddIndexArray = [];

  data?.section?.forEach((element: any, index: any) => {
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

  useEffect(() => {
    handleModal(false)
  }, [])

  const handleModal = (event: any) => {
    dispatch(resetRunAmountModalKhado({ showModal: event, id: runAmount?.betId }));
  };
  return (
    <>
      <div
        className="sessionNormalContainer"
        style={{ marginTop: isMobile ? "" : "10px" }}
      >
        <div className="sessionNormalTitle">
          <span className="sessionNormalTitleTxt f-size15">{title}</span>
          {/* { shouldShowInfoIcon && <OverlayTrigger placement="top" overlay={tooltip}><div className="px-2"><IoInformationCircle size={20}/></div></OverlayTrigger>} */}
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
            <div className="sessionYesNoBoxContainer" >
              <div
                className="sessionYesNoBox  rateBoxWidthKhado"
              // style={{ width: isLap ? "180px" : !isMobile ? "240px" : "" }}
              >
                <div className="sessionKhadoYesBox back1Background">
                  <span className={`f-size16 sessionBackTxt`}>Back</span>
                </div>

                <div className="sessionEmptyBox"></div>
              </div>
            </div>
            {data?.section?.map((item: any, index: any) => {
              return (
                <div className="w-100 d-flex flex-column">
                  <div className="sessionRateContainer" key={index}>
                    <div className="sessionRateName runnerWidthNormal"
                      style={{ overflow: "hidden" }}>
                      <span
                        className="teamFont"
                        style={{ fontWeight: "400", lineHeight: 1 }}
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
                        {item?.RunnerName}-{item?.ex?.availableToLay?.[0]?.price}
                      </span>{" "}
                      <span
                        className={`${calculateMaxLoss(
                          detail?.profitLossDataSession,
                          item?.id
                        ) < 0
                            ? "color-red"
                            : "color-red"
                          } title-14 fbold`}
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
                      className="sessionRateBoxContainer rateBoxWidthKhado"
                    // style={{
                    //   width: isLap ? "180px" : !isMobile ? "240px" : "",
                    // }}
                    >
                      {(item?.activeStatus != "live" ||
                        item?.GameStatus != "") && (
                          <div className="suspended-overlayRates">
                            <span
                              className={`suspendTextCmmn`}
                            >
                              {item?.GameStatus ?? "SUSPENDED"}
                            </span>
                          </div>
                        )}
                      <div
                        className={`sessionRateBox rateFont back1Background`}
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
                        <span
                          className={`rateFont`}
                        >
                          {handlePrice(item?.ex?.availableToBack?.[0]?.price) ??
                            "-"}
                        </span>
                        <span
                          className={`f-size12 sessionRate2Box`}
                        >
                          {handleSize(item?.ex?.availableToBack?.[0]?.size)}
                        </span>
                      </div>

                      <div className="sessionMinBoxContainer">
                        <span className={`sessionMinBox sessionMinMaxFont`}>
                          Min:{formatNumber(item?.min)}
                        </span>
                        <span className={`sessionMinBox sessionMinMaxFont`}>
                          Max:{formatNumber(item?.max)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {item?.rem && (<div className="w-100 text-start" style={{ fontSize: "11px", color: "#097c93", backgroundColor: "#f2f2f2", borderBottom: "1px solid #c7c8ca" }}>{item?.rem}
                  </div>)}
                </div>
              );
            })}
          </div>


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
          <div style={{ width: "100%", height: "85vh", overflowY: "auto", padding: "10px" }}>
            <RunBoxTable runAmount={{ betPlaced: runAmount?.runAmountData }} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default SessionKhado;
