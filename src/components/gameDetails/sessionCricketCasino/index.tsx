import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { isLap, isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { formatNumber, handleSize } from "../../../helpers";
import { IoInformationCircle } from "react-icons/io5";
import {OverlayTrigger, Tooltip } from "react-bootstrap";

const SessionCricketCasino = ({ title, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();
  const [marketArr, setMarketArr] = useState<any>(data);
  const startAtTime = new Date(detail.startAt); 
  const hideTime = new Date(startAtTime.getTime() - 30 * 60 * 1000); 
  const shouldShowInfoIcon = new Date() < hideTime;
  const tooltip = <Tooltip id="tooltip">{`Max adv exposure limit 10L.`}</Tooltip>;
  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    value: any,
    item: any,
    tno: any,
    index: any
  ) => {
    if (status != "") {
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
      name: data?.RunnerName,
      eventType: detail?.matchType,
      matchId: detail?.id,
      percent: value,
      matchBetType: "session",
      betPlaceIndex: tno,
      mid: item?.mid?.toString(),
      teamName: index + " Number",
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

  useEffect(() => {
    if (!data?.section || !Array.isArray(data.section)) {
      const defaultArray = Array.from(
        { length: 10 },
        (_, i) => `Element ${i + 1}`
      );

      const newData = {
        ...data,
        section: defaultArray,
      };

      setMarketArr(newData);
    }
  }, []);

  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };

  return (
    <>
      <div
        className="sessionNormalContainer"
        style={{ marginTop: isMobile ? "" : "10px" }}
      >
        <div className="sessionNormalTitle">
          <span
            className="sessionNormalTitleTxt"
            style={{ fontSize: isMobile ? "13px" : "15px" }}
          >
            {title}
          </span>
          { shouldShowInfoIcon && <OverlayTrigger placement="top" overlay={tooltip}><div className="px-2"><IoInformationCircle size={20}/></div></OverlayTrigger>}
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
            <div
              className="sessionCasinoMinMax"
              style={{ borderBottom: "1px solid #c7c8ca" }}
            >
              <div style={{ backgroundColor: "#f2f2f2", flexGrow: 1 }}>
                <span
                  className={`sessionMinBox sessionMinMaxFont`}
                  style={{ marginLeft: "1%" }}
                >
                  Min:{formatNumber(marketArr?.min)} Max:
                  {formatNumber(marketArr?.max)}
                </span>
              </div>
              <div
                className="sessionRateBox back1Background"
                style={{ width: isLap ? "61px" : !isMobile ? "81px" : "20%" }}
              >
                <span className={`f-size16 sessionBackTxt`}>Back</span>
              </div>
            </div>
            {marketArr?.section?.map((item: any, index: any) => {
              return (
                <div className="w-100 d-flex flex-column" key={index}>
                  <div className="sessionRateContainer">
                    <div className="sessionRateName" style={{ flexGrow: 1 }}>
                      <span className="teamFont" style={{ fontWeight: "400" }}>
                        {index} Number
                      </span>
                      <span
                        className={`${
                          detail?.profitLossDataSession
                            ? detail?.profitLossDataSession?.filter(
                                (a: any) => a?.betId === data?.id
                              )
                              ? detail?.profitLossDataSession?.filter(
                                  (a: any) => a?.betId === data?.id
                                )[0]?.profitLoss?.[index] > 0
                                ? "color-green"
                                : detail?.profitLossDataSession?.filter(
                                    (a: any) => a?.betId === data?.id
                                  )[0]?.profitLoss?.[index] < 0
                                ? "color-red"
                                : "color-red"
                              : 0
                            : 0
                        }`}
                      >
                        {detail?.profitLossDataSession
                          ? detail?.profitLossDataSession?.filter(
                              (a: any) => a?.betId === data?.id
                            )
                            ? detail?.profitLossDataSession?.filter(
                                (a: any) => a?.betId === data?.id
                              )[0]?.profitLoss?.[index]
                            : ""
                          : ""}
                      </span>
                    </div>
                    <div
                      className="sessionCCRateBoxContainer"
                      style={{
                        width: isLap ? "61px" : !isMobile ? "81px" : "",
                      }}
                    >
                      {item?.gstatus !== "" && (
                        <div className="suspended-overlayRates">
                          <FaLock color="#fff" />
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
                          className={`sessionRateBox back1Background`}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handlePlaceBet(
                              item?.odds?.[0]?.odds,
                              "Back",
                              `${index} Number`,
                              item?.gstatus,
                              item?.odds?.[0]?.odds,
                              item,
                              item?.odds?.[0]?.tno,
                              index
                            )
                          }
                        >
                          <span className={`rateFont`}>
                            {handlePrice(item?.odds?.[0]?.odds) ?? "-"}
                          </span>
                          <span
                            className={`${
                              !isMobile ? "f-size12" : "f-size11"
                            } sessionRate2Box`}
                          >
                            {handleSize(item?.odds?.[0]?.size)}
                          </span>
                        </div>
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
    </>
  );
};
export default SessionCricketCasino;
