import { Table } from "react-bootstrap";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tprules } from "../../../assets/images";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Teen1DResult from "../desktop/teenCard";
import { cardGamesId, cardUrl } from "../../../utils/Constants";

const TeenPattiMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const { playerA, playerB } = dragonTigerDetail;
  const { placedBets } = useSelector((state: RootState) => state.bets);


  let AB1;
  if (playerA?.[0]?.b1) {
    //AB1 = (parseFloat(playerA?.[0]?.b1) * 0.1 + 1).toFixed(2);

    AB1 = parseFloat(playerA[0].b1) * 0.01;
    if (AB1 !== 0) {
        AB1 += 1;
    }
    AB1 = AB1.toFixed(2);
  }

  let BB1;
  if (playerB?.[0]?.b1) {
    //BB1 = (parseFloat(playerB[0].b1) * 0.1 + 1).toFixed(2);

    BB1 = parseFloat(playerA[0].b1) * 0.01;
    if (BB1 !== 0) {
        BB1 += 1;
    }
    BB1 = BB1.toFixed(2);
  }

  const rules = [
    { label: "Pair (Double)", value: "1 To 1" },
    { label: "Flush (Color)", value: "1 To 4" },
    { label: "Straight (Rown)", value: "1 To 6" },
    { label: "Trio (Teen)", value: "1 To 35" },
    { label: "Straight Flush (Pakki Rown)", value: "1 To 45" },
  ];

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
      odd:
        type === "BACK"
          ? item?.b1
            ? updatedValue(item.b1)
            : item.b1
          : item?.l1,
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
    // console.log('team',team)
  };
  return (
    <>
      <div>
        <div className="dt20header">
          <PlacedBet show={show1} setShow={setShow1} />
          <div className="dt20subheader1">
            <span
              style={{ fontSize: "12px", fontWeight: "bold" }}
              onClick={() => setActiveTab(false)}
            >
              GAME
            </span>
            <span style={{ fontSize: "18px" }}> | </span>
            <span
              style={{ fontSize: "12px", fontWeight: "bold" }}
              onClick={() => setActiveTab(true)}
            >
              PLACED BET({placedBets?.length || 0})
            </span>
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
            <div style={{ width: "100%", height: "250px" }}>
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
                  time={dragonTigerDetail?.videoInfo?.lasttime}
                  result={<Teen1DResult data={dragonTigerDetail?.videoInfo} />}
                  id={`${cardUrl}${cardGamesId.teenOneDay}`}
                />
              </div>
            </div>
            <div style={{ height: "480px" }}>
              <div className="mt-2" style={{ width: "100%" }}>
                <div className="teenPatti-table-container-m">
                  <div className="teenPatti-table-row">
                    <div
                      style={{
                        width: "60%",
                        border: "0.1px solid #dee2e6",
                        textAlign: "left",
                      }}
                    >
                      <span className="f12-b">
                        Min: {dragonTigerDetail?.videoInfo?.min} Max:{" "}
                        {dragonTigerDetail?.videoInfo?.max}
                      </span>
                    </div>

                    <div
                      style={{
                        width: "40%",
                        display: "flex",
                        gap: "2px",
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
                  <div className="teenPatti-table-row">
                    <div
                      style={{
                        width: "60%",
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
                        <span className="f12-b">{AB1}</span>
                        <span className="f10-b">{playerA?.[0]?.bs1}</span>
                        {/* <span
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
                        </span> */}
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
                        <span className="f12-b">{playerA?.[0]?.l1}</span>
                        <span className="f10-b">{playerA?.[0]?.ls1}</span>
                        {/* <span
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
                        </span> */}
                      </div>
                    </div>
                  </div>
                  <div className="teenPatti-table-row">
                    <div
                      style={{
                        width: "60%",
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
                         <span className="f12-b">{BB1}</span>
                         <span className="f10-b">{playerB?.[0]?.bs1}</span>
                        {/* <span
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
                        </span> */}
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
                  </div>
                </div>
              </div>

              <div style={{ width: "100%", marginTop: "15px" }}>
                <CardResultBox data={dragonTigerDetail} name={["A", "B"]} />
              </div>
              <div>
                <div className="casino-title" style={{ position: "relative" }}>
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
          </div>
        ) : (
          <>
            <MyBet />
          </>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={tprules} />
    </>
  );
};

export default TeenPattiMobile;
