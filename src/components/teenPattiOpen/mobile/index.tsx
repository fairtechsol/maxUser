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
import TeenOpenResult from "../desktop/teenCard";
import PlacedBet from "./placeBet";
import "./style.scss";
import TeenPattiTableRow from "./tableRow";
// import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";

const TeenPattiMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
  //const { playerA, playerB } = dragonTigerDetail;
  const { players, pairsPlus } = dragonTigerDetail;
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
      betOnTeam: item?.nat,
      name: item?.nat,
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
  }, [lastActivityTime, showInactivityModal]);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.teenOpen}`);
  }, []);

  return (
    <>
      <div>
        <div className="dt20header">
          <PlacedBet show={show1} setShow={setShow1} />
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
              {" "}
              {dragonTigerDetail?.videoInfo
                ? `Round ID:  ${handleRoundId(
                    dragonTigerDetail?.videoInfo?.mid
                  )}`
                : ""}{" "}
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
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={
                    <TeenOpenResult data={dragonTigerDetail?.videoInfo} />
                  }
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <LoaderOnRefresh />
            ) : (
              <div>
                <div style={{ width: "100%" }}>
                  <div className="teenPatti-table-container-open">
                    <div className="teenPatti-table-row">
                      <div
                        style={{
                          width: "40%",
                          border: "0.1px solid #dee2e6",
                          textAlign: "left",
                        }}
                      ></div>
                      <div
                        style={{
                          width: "60%",
                         
                          textAlign: "left",
                          display: "flex",
                        }}
                        className=""
                      >
                        <div
                          className="teen-back-m"
                          style={{
                            border: "0.5px solid #dee2e6",
                            width:"50%",
                            padding:"2px",
                            display:"flex",
                            flexDirection:"column"
                          }}
                        >
                          
                          <span>BACK</span>
                          <span className="f5-b" style={{fontSize:"10px"}}>
                            ( Min: {dragonTigerDetail?.players?.player1?.min}{" "}
                            Max: {dragonTigerDetail?.players?.player1?.max})
                          </span>
                        </div>
                        <div className="teen-back-m" style={{
                          width:"50%",
                          border: "0.5px solid #dee2e6",
                        }}>
                          <span className="f5-b" style={{padding:"2px",marginTop:"20px",fontSize:"10px"}}>
                            ( Min:{" "}
                            {dragonTigerDetail?.pairsPlus?.pairPlus1?.min} Max:{" "}
                            {dragonTigerDetail?.pairsPlus?.pairPlus1?.max})
                          </span>
                        </div>
                      </div>
                    </div>

                    {players &&
                      Object?.keys(players)?.map((key, index) => (
                        <TeenPattiTableRow
                          key={index}
                          player={players[key]}
                          pairPlus={pairsPlus[`pairPlus${index + 1}`]}
                          handleBet={handleBet}
                        />
                      ))}

                    {/* <div className="teenPatti-table-row">
                    <div
                      style={{
                        width: "50%",
                        padding: "5px",
                        border: "0.1px solid #dee2e6",
                      }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
                        {playerA?.[0]?.nat}
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
                        <span className="f12-b">{playerA?.[1]?.nat}</span>
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
                      <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
                        {playerB?.[0]?.nat}
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
                        <span className="f12-b">{playerB?.[1]?.nat}</span>
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
                  </div> */}
                  </div>
                </div>

                <div style={{ width: "100%", marginTop: "15px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["R", "R", "R"]}
                    type={"teen8"}
                  />
                </div>
                <div>
                  <div
                    className="casino-title"
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
