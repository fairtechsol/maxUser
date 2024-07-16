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
import CasinoWarResult from "../desktop/teenCard";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { HandleCards3 } from "./cardComponent2";
import "./style.scss";

const TeenPattiMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [bettingOptions, setBettingOptions] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId.casinoWar}`
  );
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

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
      odd: item?.b1,
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

  useEffect(() => {
    const resetTimer = () => {
      setLastActivityTime(Date.now());
    };

    const checkInactivity = () => {
      if (Date.now() - lastActivityTime > 5 * 60 * 1000) {
        setShow(true);
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
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={
                    <CasinoWarResult data={dragonTigerDetail?.videoInfo} />
                  }
                  id={videoFrameId}
                />
              </div>
            </div>
            <div style={{}}>
              <div className="mt-2" style={{ width: "100%" }}>
                <div className="teenPatti-table-container-m">
                  <div
                    className="teenPatti-table-row"
                    style={{
                      lineHeight: 2,
                      marginTop: "2px",
                      background: "#ffffff",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",

                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="teenPatti-table-item f12-b"
                        style={{ width: "16.7%", padding: "2px" }}
                      >
                        <HandleCards card={dragonTigerDetail?.videoInfo?.C1} />
                      </div>
                      <div
                        className="teenPatti-table-item"
                        style={{ width: "16.7%", padding: "2px" }}
                      >
                        <HandleCards card={dragonTigerDetail?.videoInfo?.C2} />
                      </div>
                      <div
                        className="teenPatti-table-item"
                        style={{ width: "16.7%", padding: "2px" }}
                      >
                        <HandleCards card={dragonTigerDetail?.videoInfo?.C3} />
                      </div>
                      <div
                        className="teenPatti-table-item"
                        style={{ width: "16.7%", padding: "2px" }}
                      >
                        <HandleCards card={dragonTigerDetail?.videoInfo?.C4} />
                      </div>
                      <div
                        className="teenPatti-table-item"
                        style={{ width: "16.7%" }}
                      >
                        <HandleCards card={dragonTigerDetail?.videoInfo?.C5} />
                      </div>
                      <div
                        className="teenPatti-table-item"
                        style={{ width: "16.7%", padding: "2px" }}
                      >
                        <HandleCards card={dragonTigerDetail?.videoInfo?.C6} />
                      </div>
                    </div>
                  </div>

                  <div
                    className="teenPatti-table-row"
                    style={{ lineHeight: 2 }}
                  >
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#08c",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        style={{
                          borderTop: `${
                            bettingOptions === 0 ? "1px solid #fff" : "none"
                          }`,
                          width: "16.7%",
                          marginTop: "2px",
                        }}
                        onClick={() => setBettingOptions(0)}
                      >
                        <div
                          className="teenPatti-table-ite f12-b"
                          style={{
                            color: "#fff",
                            textAlign: "center",
                            marginTop: "15px",
                            marginBottom: "15px",
                          }}
                        >
                          1
                        </div>
                      </div>
                      <div
                        style={{
                          borderTop: `${
                            bettingOptions === 1 ? "1px solid #fff" : "none"
                          }`,
                          width: "16.7%",
                          marginTop: "2px",
                        }}
                        onClick={() => setBettingOptions(1)}
                      >
                        <div
                          className="teenPatti-table-ite f12-b"
                          style={{
                            borderLeft: "1px solid #fff",
                            color: "#fff",
                            textAlign: "center",
                            marginTop: "15px",
                            marginBottom: "15px",
                          }}
                        >
                          2
                        </div>
                      </div>
                      <div
                        style={{
                          borderTop: `${
                            bettingOptions === 2 ? "1px solid #fff" : "none"
                          }`,
                          width: "16.7%",
                          marginTop: "2px",
                        }}
                        onClick={() => setBettingOptions(2)}
                      >
                        <div
                          className="teenPatti-table-ite f12-b"
                          style={{
                            borderLeft: "1px solid #fff",
                            color: "#fff",
                            textAlign: "center",
                            marginTop: "15px",
                            marginBottom: "15px",
                          }}
                        >
                          3
                        </div>
                      </div>
                      <div
                        style={{
                          borderTop: `${
                            bettingOptions === 3 ? "1px solid #fff" : "none"
                          }`,
                          width: "16.7%",
                          marginTop: "2px",
                        }}
                        onClick={() => setBettingOptions(3)}
                      >
                        <div
                          className="teenPatti-table-ite f12-b"
                          style={{
                            borderLeft: "1px solid #fff",
                            color: "#fff",
                            textAlign: "center",
                            marginTop: "15px",
                            marginBottom: "15px",
                          }}
                        >
                          4
                        </div>
                      </div>
                      <div
                        style={{
                          borderTop: `${
                            bettingOptions === 4 ? "1px solid #fff" : "none"
                          }`,
                          width: "16.7%",
                          marginTop: "2px",
                        }}
                        onClick={() => setBettingOptions(4)}
                      >
                        <div
                          className="teenPatti-table-ite f12-b"
                          style={{
                            borderLeft: "1px solid #fff",
                            color: "#fff",
                            textAlign: "center",
                            marginTop: "15px",
                            marginBottom: "15px",
                          }}
                        >
                          5
                        </div>
                      </div>

                      <div
                        style={{
                          borderTop: `${
                            bettingOptions === 5 ? "1px solid #fff" : "none"
                          }`,
                          width: "16.7%",
                          marginTop: "2px",
                        }}
                        onClick={() => setBettingOptions(5)}
                      >
                        <div
                          className="teenPatti-table-ite f12-b"
                          style={{
                            borderLeft: "1px solid #fff",
                            color: "#fff",
                            textAlign: "center",
                            marginTop: "15px",
                            marginBottom: "15px",
                          }}
                        >
                          6
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "center",
                      flexWrap: "wrap",
                      gap: "15px",
                    }}
                  >
                    <div style={{ width: "47%" }}>
                      {dragonTigerDetail.players
                        ?.slice(0, 5)
                        .map((playerA: any, index: any) => (
                          <div
                            key={index}
                            className="teenPatti-table-row"
                            style={{
                              lineHeight: 1,
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              marginBottom: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "70%",
                                padding: "10px",
                                border: "0.1px solid #fff",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bolder",
                                }}
                              >
                                {playerA[bettingOptions]?.nat.split(" ")[0]}
                              </span>

                              {playerA[bettingOptions]?.nat.split(" ")[0] ===
                                "Red" && (
                                <span style={{ marginLeft: "5px" }}>
                                  <HandleCards3 card={"Diamond 1"} />
                                </span>
                              )}
                              {playerA[bettingOptions]?.nat.split(" ")[0] ===
                                "Red" && (
                                <span style={{ marginLeft: "5px" }}>
                                  <HandleCards3 card={"Heart 1"} />
                                </span>
                              )}

                              {playerA[bettingOptions]?.nat.split(" ")[0] ===
                                "Black" && (
                                <span style={{ marginLeft: "5px" }}>
                                  <HandleCards3 card={"Spade 1"} />
                                </span>
                              )}
                              {playerA[bettingOptions]?.nat.split(" ")[0] ===
                                "Black" && (
                                <span style={{ marginLeft: "5px" }}>
                                  <HandleCards3 card={"Club 1"} />
                                </span>
                              )}
                            </div>

                            <div
                              key={playerA[bettingOptions].sid}
                              className={`teenPatti-table-item ${
                                playerA[bettingOptions].gstatus === "0"
                                  ? "suspended"
                                  : ""
                              }`}
                              style={{
                                width: "30%",
                                background: "#a7d8fd",
                              }}
                              onClick={() =>
                                playerA[bettingOptions].gstatus === "0"
                                  ? null
                                  : handleBet(playerA[bettingOptions])
                              }
                            >
                              <span className="f12-b">
                                {playerA[bettingOptions].b1}
                              </span>
                              <span className="f10-b">0</span>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div style={{ width: "47%" }}>
                      {dragonTigerDetail.players
                        ?.slice(5)
                        .map((playerA: any, index: any) => (
                          <div
                            key={index + 5} // Offset the index to avoid key duplication
                            className="teenPatti-table-row"
                            style={{
                              lineHeight: 1,
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              marginBottom: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "70%",
                                padding: "6px",
                                border: "0.1px solid #fff",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              {/* <span
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bolder",
                                }}
                              >
                                {playerA[bettingOptions]?.nat.split(" ")[0]}
                              </span> */}
                              <span style={{ marginLeft: "5px" }}>
                                <HandleCards3
                                  card={playerA[bettingOptions]?.nat}
                                />
                              </span>
                            </div>

                            <div
                              key={playerA[bettingOptions].sid}
                              className={`teenPatti-table-item ${
                                playerA[bettingOptions].gstatus === "0"
                                  ? "suspended"
                                  : ""
                              }`}
                              style={{
                                width: "30%",
                                background: "#a7d8fd",
                              }}
                              onClick={() =>
                                playerA[bettingOptions].gstatus === "0"
                                  ? null
                                  : handleBet(playerA[bettingOptions])
                              }
                            >
                              <span className="f12-b">
                                {playerA[bettingOptions].b1}
                              </span>
                              <span className="f10-b">0</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ width: "100%", marginTop: "15px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["R", "R", "R"]}
                  type={"war"}
                />
              </div>
              {/* <div>
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
              </div> */}
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
