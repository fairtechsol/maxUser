import { Table } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tprules } from "../../../assets/images";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { cardGamesId, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Teen20Result from "../desktop/teenCard";
import "./style.scss";
// import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";

const TeenPattiMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const [show1, setShow1] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
  const { runs } = dragonTigerDetail;
  const { placedBets } = useSelector((state: RootState) => state.bets);
  const rules = [
    { label: "Pair (Double)", value: "1 To 1" },
    { label: "Flush (Color)", value: "1 To 4" },
    { label: "Straight (Rown)", value: "1 To 6" },
    { label: "Trio (Teen)", value: "1 To 35" },
    { label: "Straight Flush (Pakki Rown)", value: "1 To 45" },
  ];
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: dragonTigerDetail?.id,
      odd: item?.b,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: "" + item?.sid,
    };
    dispatch(
      selectedBetAction({
        team,
        dragonTigerDetail,
      })
    );
  };

  const handleClose = () => {
    setShowInactivityModal(false);
  };

  useEffect(() => {
    const resetTimer = () => {
      setLastActivityTime(Date.now());
    };

    const checkInactivity = () => {
      if (Date.now() - lastActivityTime > 5 * 60 * 1000) {
        setShowInactivityModal(true);
        setVideoFrameId("");
      }
    };

    const activityEvents = ["mousemove", "keydown", "scroll", "click"];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    const intervalId = setInterval(checkInactivity, 1000);

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearInterval(intervalId);
    };
  }, [lastActivityTime, show]);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.ballbyball}`);
  }, []);

  useEffect(() => {
    if (runs?.[0]?.gstatus === "0" || runs?.[0]?.rate === "0.00") {
      dispatch(selectedBetAction(""));
    }
  }, [runs?.[0]?.gstatus, runs?.[0]?.b1]);

  return (
    <>
      <div>
        <div className="dt20header">
          <MobilePlacedBet show={show1} setShow={setShow1} />
          <div className="dt20subheader1">
            <div
              style={{
                height: "100%",
                borderTop: !activeTab ? "2px solid white" : "none",
                padding: "5px",
              }}
            >
              <span
                style={{ fontSize: "12px", fontWeight: "bold" }}
                onClick={() => setActiveTab(false)}
              >
                GAME
              </span>
            </div>
            <span style={{ fontSize: "18px" }}> | </span>
            <div
              style={{
                height: "100%",
                borderTop: activeTab ? "2px solid white" : "none",
                padding: "5px",
              }}
            >
              <span
                style={{ fontSize: "12px", fontWeight: "bold" }}
                onClick={() => setActiveTab(true)}
              >
                PLACED BET({placedBets?.length || 0})
              </span>
            </div>
          </div>
          <div className="dt20subheader2">
            <span
              style={{ textDecoration: "underline" }}
              onClick={() => setShow(true)}
            >
              Rules
            </span>
            <span>
              {dragonTigerDetail?.videoInfo
                ? `Round ID:  ${dragonTigerDetail?.videoInfo?.mid}`
                : ""}
            </span>
          </div>
        </div>
        {!activeTab ? (
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "100%" }}>
              <div className="horseRacingTabHeader-m">
                <div>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {dragonTigerDetail?.name}
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "20%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.lt}
                  //result={<Teen20Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <LoaderOnRefresh />
            ) : (
              <div>
                <div
                  style={{
                    background: "rgb(255 199 66 / 85%)",
                    color: "#fff",
                    fontWeight: "bold",
                    lineHeight: 2,
                  }}
                >
                  <span style={{ marginLeft: "10px" }}> Runs</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    justifyContent: "space-between",
                    borderBottom: "0.01em solid #c7c8ca",
                    lineHeight: 2,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",

                      borderBottom: "0.01em solid #c7c8ca",
                      background: "#f2f2f2",
                    }}
                  >
                    <div
                      style={{
                        width: "60%",
                        border: "0.1px solid #fff",
                        fontSize: "14px",
                        marginLeft: "3px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "20%",
                        backgroundColor: "#72bbef",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      BACK
                    </div>
                    <div
                      style={{
                        width: "20%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "#097c93",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  style={{
                    lineHeight: 2,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {runs?.map((item: any, index: any) => (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",

                        borderBottom: "0.01em solid #c7c8ca",
                        background: "#f2f2f2",
                      }}
                      key={item.sid}
                    >
                      {/* <div
                        style={{
                          width: "60%",
                          border: "0.1px solid #fff",
                          fontSize: "14px",
                          marginLeft: "3px",
                        }}
                      >
                        {item.nat}
                      </div> */}
                      <div
                        style={{
                          width: "60%",
                          fontSize: "14px",
                          marginLeft: "3px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          {item.nat}
                        </div>
                        <span
                          className={`f10-b ${
                            dragonTigerDetail?.profitLoss
                              ? dragonTigerDetail?.profitLoss[
                                  `null_${item?.sid}_card`
                                ]
                                ? dragonTigerDetail?.profitLoss[
                                    `null_${item?.sid}_card`
                                  ] > 0
                                  ? "color-green"
                                  : dragonTigerDetail?.profitLoss[
                                      `null_${item?.sid}_card`
                                    ] < 0
                                  ? "color-red"
                                  : ""
                                : ""
                              : ""
                          }`}
                          style={{ zIndex: "100" }}
                        >
                          {dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `null_${item?.sid}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `null_${item?.sid}_card`
                                ]
                              : 0
                            : 0}
                        </span>
                      </div>
                      <div
                        style={{
                          width: "20%",
                          backgroundColor: "#72bbef",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "12px",
                        }}
                        className={
                          runs?.[0]?.gstatus === "SUSPENDED" &&
                          runs?.[0]?.b === 0
                            ? "suspended"
                            : "teenPatti-table-item"
                        }
                        onClick={() => handleBet(item)}
                      >
                        <span className="f12-b">{item.b}</span>
                        <span className="f10-b">{item.bs}</span>
                      </div>
                      <div
                        style={{
                          width: "20%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          color: "#097c93",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        <span>Min:{item.min}</span>
                        <span>Max:{item.max}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#086f3f",
                  }}
                >
                  <div
                    style={{
                      width: "15%",
                      background: "#086f3f",
                      lineHeight: 2,
                    }}
                  >
                    <img
                      src="https://versionobj.ecoassetsservice.com/v15/static/front/img/icons/remark.png"
                      style={{
                        marginLeft: "20px",
                        height: "20px",
                        boxShadow: "none",
                        background: "#086f3f",
                      }}
                    ></img>
                  </div>

                  <div
                    className="ticker-container"
                    style={{
                      width: "85%",

                      background: "#086f3f",
                      border: "#086f3f",
                      lineHeight: 2.6,
                    }}
                  >
                    <div
                      className="ticker-wrap"
                      style={{ border: "#086f3f", height: "100%" }}
                    >
                      <div
                        className="ticker-move"
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          width: "100%",
                          fontSize: "12px",
                          border: "#086f3f",
                          height: "100%",
                        }}
                      >
                        {dragonTigerDetail?.videoInfo?.remark}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ width: "100%", marginTop: "15px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["R", "R", "R"]}
                    type={"ballbyball"}
                  />
                </div>
                {/* <div>
                  <div
                    className="casino-title mt-2"
                    style={{ position: "relative" }}
                  >
                    <span>Rules</span>
                  </div>
                  <div className="table-responsive rules-table">
                    <Table bordered>
                      <thead>
                        <tr>
                          <th colSpan={2} className="box-10 text-center">
                            Pair Plus
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rules.map((item, index) => (
                          <tr key={index} style={{ lineHeight: 1 }}>
                            <td
                              className="box-7"
                              style={{
                                backgroundColor: "#eee",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              {item.label}
                            </td>
                            <td
                              className="box-3"
                              style={{
                                backgroundColor: "#eee",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              {item.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        ) : (
          <>
            <MobileMyBet />
          </>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={tprules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default TeenPattiMobile;
