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
import Teen20Result from "../desktop/teenCard";
import { cardGamesId } from "../../../utils/constants";

const TeenPattiMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
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
            <div style={{ width: "100%", height: "28vh" }}>
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
                  result={<Teen20Result data={dragonTigerDetail?.videoInfo} />}
                  id={cardGamesId?.teen20}
                />
              </div>
            </div>
            <div className="mt-2" style={{ width: "100%" }}>
              <div className="teenPatti-table-container-m">
                <div className="teenPatti-table-row">
                  <div
                    style={{
                      width: "50%",
                      border: "0.1px solid #dee2e6",
                      textAlign: "left",
                    }}
                  >
                    <span className="f12-b">
                      Min: {dragonTigerDetail?.videoInfo?.min} Max:{" "}
                      {dragonTigerDetail?.videoInfo?.max}
                    </span>
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
                      <span className="f10-b">
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
                      <span className="f10-b">
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
                      <span className="f10-b">
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
                      <span className="f10-b">
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
