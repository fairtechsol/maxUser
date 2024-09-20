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
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import CasinoHead from "../../commonComponent/casinoGameHeader";
import NewLoader from "../../commonComponent/newLoader";

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
  const { playerA, playerB } = dragonTigerDetail;
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
      odd: item?.rate,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nation,
      name: item?.nation,
      bettingName: "Match odds",
      selectionId: item?.sid,
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.teen20}`);
  }, []);

  useEffect(() => {
    if (playerA?.[0]?.gstatus === "0" || playerA?.[0]?.rate === "0.00") {
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
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<Teen20Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div>
                <div style={{ width: "100%" }}>
                  <div className="teenPatti-table-container-20">
                    <div className="teenPatti-table-row">
                      <div
                        style={{
                          width: "50%",
                          border: "0.1px solid #dee2e6",
                          textAlign: "left",
                        }}
                      >
                        {/* <span className="f12-b">
                          Min: {dragonTigerDetail?.videoInfo?.min} Max:{" "}
                          {dragonTigerDetail?.videoInfo?.max}
                        </span> */}
                      </div>
                      <div className="teen-back-m">BACK</div>
                    </div>
                    <div className="teenPatti-table-row">
                      <div
                        style={{
                          width: "50%",
                          padding: "5px",
                          border: "0.1px solid #dee2e6",
                        }}
                      >
                        <span
                          style={{ fontSize: "14px", fontWeight: "bolder" }}
                        >
                          {playerA?.[0]?.nation}
                        </span>
                      </div>
                      <div
                        className={
                          playerA?.[0]?.gstatus === "0" &&
                          playerA?.[1]?.gstatus === "0"
                            ? "suspended"
                            : ""
                        }
                        style={{
                          width: "50%",
                          backgroundColor: "#72bbef",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          className="teenPatti-table-item"
                          style={{ width: "40%" }}
                          onClick={() =>
                            playerA?.[0]?.gstatus === "0"
                              ? null
                              : handleBet(playerA?.[0])
                          }
                        >
                          <span className="f12-b">{playerA?.[0]?.rate}</span>
                          <span
                            className={`f10-b ${
                              dragonTigerDetail?.profitLoss
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sid}_card`
                                  ]
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sid}_card`
                                    ] > 0
                                    ? "color-green"
                                    : dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sid}_card`
                                      ] < 0
                                    ? "color-red"
                                    : ""
                                  : ""
                                : ""
                            }`}
                            style={{zIndex:"100"}}
                          >
                            {dragonTigerDetail?.profitLoss
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sid}_card`
                                ]
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[0]?.sid}_card`
                                  ]
                                : 0
                              : 0}
                          </span>
                        </div>
                        <div
                          className={`teenPatti-table-item ${
                            playerA?.[0]?.gstatus != "0" &&
                            playerA?.[1]?.gstatus === "0"
                              ? "suspended"
                              : ""
                          }`}
                          style={{ width: "60%" }}
                          onClick={() =>
                            playerA?.[1]?.gstatus === "0"
                              ? null
                              : handleBet(playerA?.[1])
                          }
                        >
                          <span className="f12-b">{playerA?.[1]?.nation}</span>
                          <span
                            className={`f10-b ${
                              dragonTigerDetail?.profitLoss
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[1]?.sid}_card`
                                  ]
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[1]?.sid}_card`
                                    ] > 0
                                    ? "color-green"
                                    : dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[1]?.sid}_card`
                                      ] < 0
                                    ? "color-red"
                                    : ""
                                  : ""
                                : ""
                            }`}
                            style={{zIndex:"100"}}
                          >
                            {dragonTigerDetail?.profitLoss
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[1]?.sid}_card`
                                ]
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerA?.[1]?.sid}_card`
                                  ]
                                : 0
                              : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="teenPatti-table-row">
                      <div
                        style={{
                          width: "50%",
                          padding: "5px",
                          border: "0.1px solid #dee2e6",
                        }}
                      >
                        <span
                          style={{ fontSize: "14px", fontWeight: "bolder" }}
                        >
                          {playerB?.[0]?.nation}
                        </span>
                      </div>
                      <div
                        className={
                          playerB?.[0]?.gstatus === "0" &&
                          playerB?.[1]?.gstatus === "0"
                            ? "suspended"
                            : ""
                        }
                        style={{
                          width: "50%",
                          backgroundColor: "#72bbef",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          className="teenPatti-table-item"
                          style={{ width: "40%" }}
                          onClick={() =>
                            playerB?.[0]?.gstatus === "0"
                              ? null
                              : handleBet(playerB?.[0])
                          }
                        >
                          <span className="f12-b">{playerB?.[0]?.rate}</span>
                          <span
                            className={`f10-b ${
                              dragonTigerDetail?.profitLoss
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[0]?.sid}_card`
                                  ]
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[0]?.sid}_card`
                                    ] > 0
                                    ? "color-green"
                                    : dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[0]?.sid}_card`
                                      ] < 0
                                    ? "color-red"
                                    : ""
                                  : ""
                                : ""
                            }`}
                          >
                            {dragonTigerDetail?.profitLoss
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[0]?.sid}_card`
                                ]
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[0]?.sid}_card`
                                  ]
                                : 0
                              : 0}
                          </span>
                        </div>
                        <div
                          className={`teenPatti-table-item ${
                            playerA?.[0]?.gstatus != "0" &&
                            playerA?.[1]?.gstatus === "0"
                              ? "suspended"
                              : ""
                          }`}
                          style={{ width: "60%" }}
                          onClick={() =>
                            playerB?.[1]?.gstatus === "0"
                              ? null
                              : handleBet(playerB?.[1])
                          }
                        >
                          <span className="f12-b">{playerB?.[1]?.nation}</span>
                          <span
                            className={`f10-b ${
                              dragonTigerDetail?.profitLoss
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[1]?.sid}_card`
                                  ]
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[1]?.sid}_card`
                                    ] > 0
                                    ? "color-green"
                                    : dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[1]?.sid}_card`
                                      ] < 0
                                    ? "color-red"
                                    : ""
                                  : ""
                                : ""
                            }`}
                          >
                            {dragonTigerDetail?.profitLoss
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[1]?.sid}_card`
                                ]
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[1]?.sid}_card`
                                  ]
                                : 0
                              : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ width: "100%", marginTop: "15px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["A", "T", "B"]}
                    type={"teen20"}
                  />
                </div>
                <div>
                  <div
                    className="casino-title mt-2 bg-primary text-white"
                    style={{ position: "relative" }}
                  >
                    <span>Rules</span>
                  </div>
                  <div className="table-responsive rules-table lh-1">
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
      <RulesModal show={show} setShow={setShow} rule={tprules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default TeenPattiMobile;
