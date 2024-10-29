import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tprules } from "../../../assets/images";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { cardGamesId, cardUrl } from "../../../utils/constants";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Teen1DResult from "../desktop/teenCard";
import "./style.scss";
// import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import CasinoHead from "../../commonComponent/casinoGameHeader";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import NewLoader from "../../commonComponent/newLoader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";

const TeenPattiMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
  const { playerA, playerB } = dragonTigerDetail;

  const handleClose = () => {
    setShowInactivityModal(false);
  };

  const updatedValue = (value: any) => {
    let parsedValue = parseFloat(value) * 0.01;
    if (parsedValue !== 0) {
      parsedValue += 1;
    }
    return parsedValue.toFixed(2);
  };

  const handleBet = (item: any, type: any) => {
    let team = {
      bettingType: type,
      matchId: dragonTigerDetail?.id,

      odd: type === "BACK" ? updatedValue(item.b1) : updatedValue(item?.l1),
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nation,
      name: item?.nation,
      bettingName: "Match odds",
      selectionId: item?.sectionId,
      min:parseFloat(dragonTigerDetail?.videoInfo?.min),
      max:parseFloat(dragonTigerDetail?.videoInfo?.max)
    };
    dispatch(
      selectedBetAction({
        team,
        dragonTigerDetail,
      })
    );
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
  }, [lastActivityTime, showInactivityModal]);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.teenOneDay}`);
  }, []);

  useEffect(() => {
    if (playerA?.[0]?.gstatus === "SUSPENDED" || playerA?.[0]?.b1 === "0.00") {
      dispatch(selectedBetAction(""));
    } 
    
  }, [playerA?.[0]?.gstatus,playerA?.[0]?.b1]);
  
  return (
    <>
      <div>
          <MobilePlacedBet show={show1} setShow={setShow1} />
          <CasinoHead activeTab={activeTab} setActiveTab={setActiveTab} setShow={setShow} />

        {!activeTab ? (
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  width: "100%",
                  height: "20%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.lasttime}
                  result={<Teen1DResult data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div>
                <div style={{ width: "100%" }}>
                  <div className="teenPatti-table-container-1">
                    <div
                      className="teenPatti-table-row"
                      style={{
                        border: "0px 0px 0px 0px solid #fff",
                      }}
                    >
                      <div
                        style={{
                          width: "60%",

                          textAlign: "left",
                          display: "flex",
                          flexDirection: "column",

                          border: "1px solid #fff",
                        }}
                      >
                        {/* <span className="f12-b">
                          Min: {dragonTigerDetail?.videoInfo?.min} Max:{" "}
                          {dragonTigerDetail?.videoInfo?.max}
                        </span> */}
                      </div>

                      <div
                        style={{
                          width: "40%",
                          display: "flex",
                        }}
                      >
                        <div
                          className="teen-back-m w"
                          style={{
                            width: "50%",
                          }}
                        >
                          BACK
                        </div>
                        <div
                          className="teen-back-m"
                          style={{
                            width: "50%",
                            background: "#f9c9d4",
                          }}
                        >
                          LAY
                        </div>
                      </div>
                    </div>
                    <div
                      className="teenPatti-table-row"
                      style={{
                        border: "px solid #fff",
                      }}
                    >
                      <div
                        style={{
                          width: "60%",
                          padding: "5px",
                          border: "0px solid #dee2e6",
                          display: "flex",
                          flexDirection: "column",
                          borderTop: "1px solid #fff",
                        }}
                      >
                        <span
                          style={{ fontSize: "14px", fontWeight: "bolder" }}
                        >
                          {playerA?.[0]?.nation}
                        </span>
                        <span
                          className={
                            dragonTigerDetail?.profitLoss
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sectionId}_card`
                                ]
                                ? JSON.parse(
                                    dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sectionId}_card`
                                    ]
                                  )["playera"] > 0
                                  ? "color-green"
                                  : JSON.parse(
                                      dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sectionId}_card`
                                      ]
                                    )["playera"] < 0
                                  ? "color-red"
                                  : ""
                                : ""
                              : ""
                          }
                        >
                          {dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sectionId}_card`
                              ]
                              ? JSON.parse(
                                  dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sectionId}_card`
                                  ]
                                )["playera"]
                              : 0
                            : 0}
                        </span>
                      </div>
                      <div
                        className={
                          playerA?.[0]?.gstatus === "SUSPENDED" &&
                          playerA?.[0]?.gstatus === "SUSPENDED"
                            ? "suspended"
                            : ""
                        }
                        style={{
                          width: "40%",
                          backgroundColor: "#72bbef",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          className="teenPatti-table-item"
                          style={{ width: "50%" }}
                          onClick={() =>
                            playerA?.[0]?.gstatus === "SUSPENDED"
                              ? null
                              : handleBet(playerA?.[0], "BACK")
                          }
                        >
                          <span className="f12-b">
                            {updatedValue(playerA?.[0]?.b1)}
                          </span>
                          <span className="f10-b">{playerA?.[0]?.bs1}</span>
                        </div>
                        <div
                          className={`teenPatti-table-item ${
                            playerA?.[0]?.gstatus != "0" &&
                            playerA?.[1]?.gstatus === "0"
                              ? "suspended"
                              : ""
                          }`}
                          style={{ width: "50%", background: "#f9c9d4" }}
                          onClick={() =>
                            playerA?.[0]?.gstatus === "SUSPENDED"
                              ? null
                              : handleBet(playerA?.[0], "LAY")
                          }
                        >
                          <span className="f12-b">
                            {updatedValue(playerA?.[0]?.l1)}
                          </span>
                          <span className="f10-b">{playerA?.[0]?.ls1}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="teenPatti-table-row"
                      style={{
                        border: "px solid #fff",
                      }}
                    >
                      <div
                        style={{
                          width: "60%",
                          padding: "5px",
                          borderTop: "1px solid #fff",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <span
                          style={{ fontSize: "14px", fontWeight: "bolder" }}
                        >
                          {playerB?.[0]?.nation}
                        </span>
                        <span
                          className={
                            dragonTigerDetail?.profitLoss
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sectionId}_card`
                                ]
                                ? JSON.parse(
                                    dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sectionId}_card`
                                    ]
                                  )["playerb"] > 0
                                  ? "color-green"
                                  : JSON.parse(
                                      dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sectionId}_card`
                                      ]
                                    )["playerb"] < 0
                                  ? "color-red"
                                  : ""
                                : ""
                              : ""
                          }
                        >
                          {dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sectionId}_card`
                              ]
                              ? JSON.parse(
                                  dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sectionId}_card`
                                  ]
                                )["playerb"]
                              : 0
                            : 0}
                        </span>
                      </div>
                      <div
                        className={
                          playerB?.[0]?.gstatus === "SUSPENDED" &&
                          playerB?.[0]?.gstatus === "SUSPENDED"
                            ? "suspended"
                            : ""
                        }
                        style={{
                          width: "40%",
                          backgroundColor: "#72bbef",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          className="teenPatti-table-item"
                          style={{ width: "50%" }}
                          onClick={() =>
                            playerB?.[0]?.gstatus === "SUSPENDED"
                              ? null
                              : handleBet(playerB?.[0], "BACK")
                          }
                        >
                          <span className="f12-b">
                            {updatedValue(playerB?.[0]?.b1)}
                          </span>
                          <span className="f10-b">{playerB?.[0]?.bs1}</span>
                        </div>
                        <div
                          className={`teenPatti-table-item ${
                            playerA?.[0]?.gstatus != "0" &&
                            playerA?.[1]?.gstatus === "0"
                              ? "suspended"
                              : ""
                          }`}
                          style={{ width: "50%", background: "#f9c9d4" }}
                          onClick={() =>
                            playerB?.[0]?.gstatus === "0"
                              ? null
                              : handleBet(playerB?.[0], "LAY")
                          }
                        >
                          <span className="f12-b">
                            {updatedValue(playerB?.[0]?.l1)}
                          </span>
                          <span className="f10-b">{playerB?.[0]?.ls1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ width: "100%", marginTop: "15px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["A", "B"]}
                    type={"teen"}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <MobileMyBet />
          </>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={tprules} type={"imageWithContent"} gameType="teen" />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default TeenPattiMobile;
