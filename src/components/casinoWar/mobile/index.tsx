import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { warrules } from "../../../assets/images";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { cardGamesId, cardUrl } from "../../../utils/constants";
import CardResultBox from "../../commonComponent/cardResultBox";
import { HandleCards } from "../../commonComponent/cardsComponent";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import CasinoWarResult from "../desktop/teenCard";
import { HandleCards3 } from "./cardComponent2";
import "./style.scss";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import CasinoHead from "../../commonComponent/casinoGameHeader";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import NewLoader from "../../commonComponent/newLoader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";

const TeenPattiMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [bettingOptions, setBettingOptions] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const [show1, setShow1] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
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
      min: item?.min,
      max: item?.max,
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.casinoWar}`);
  }, []);

  useEffect(() => {
    if (
      dragonTigerDetail?.players?.[0]?.[0]?.gstatus === "0" ||
      dragonTigerDetail?.players?.[0]?.[0]?.b1 === "0.00"
    ) {
      dispatch(selectedBetAction(""));
    }
  }, [
    dragonTigerDetail?.players?.[0]?.[0]?.gstatus,
    dragonTigerDetail?.players?.[0]?.[0]?.b1,
  ]);

  return (
    <>
      <div>
        <MobilePlacedBet show={show1} setShow={setShow1} />
        <CasinoHead
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setShow={setShow}
        />

        {!activeTab ? (
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "100%", height: "250px" }}>
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
            {loading ? (
              <NewLoader />
            ) : (
              <div style={{ height: "780px" }}>
                <div style={{ width: "100%" }}>
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
                          <HandleCards
                            card={dragonTigerDetail?.videoInfo?.C1}
                          />
                        </div>
                        <div
                          className="teenPatti-table-item"
                          style={{ width: "16.7%", padding: "2px" }}
                        >
                          <HandleCards
                            card={dragonTigerDetail?.videoInfo?.C2}
                          />
                        </div>
                        <div
                          className="teenPatti-table-item"
                          style={{ width: "16.7%", padding: "2px" }}
                        >
                          <HandleCards
                            card={dragonTigerDetail?.videoInfo?.C3}
                          />
                        </div>
                        <div
                          className="teenPatti-table-item"
                          style={{ width: "16.7%", padding: "2px" }}
                        >
                          <HandleCards
                            card={dragonTigerDetail?.videoInfo?.C4}
                          />
                        </div>
                        <div
                          className="teenPatti-table-item"
                          style={{ width: "16.7%", padding: "2px" }}
                        >
                          <HandleCards
                            card={dragonTigerDetail?.videoInfo?.C5}
                          />
                        </div>
                        <div
                          className="teenPatti-table-item"
                          style={{ width: "16.7%", padding: "2px" }}
                        >
                          <HandleCards
                            card={dragonTigerDetail?.videoInfo?.C6}
                          />
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
                          backgroundColor: "#004a25",
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
                            className=" f12-b"
                            style={{
                              borderLeft: "1px solid #fff",
                              color: "#fff",
                              textAlign: "center",
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
                        gap: "0px",
                        background: "#f2f2f2",
                      }}
                    >
                      <div style={{ width: "50%" }}>
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
                                marginBottom: "0px",
                                background: "#f7f7f7",
                              }}
                            >
                              <div
                                style={{
                                  width: "70%",
                                  padding: "10px",
                                  border: "0.1px solid #c7c8ca",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "cente",
                                  height:"50px"
                                }}
                              >
                                <div
                                  style={{
                                    width: "100%",
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

                                  {playerA[bettingOptions]?.nat.split(
                                    " "
                                  )[0] === "Red" && (
                                    <span style={{ marginLeft: "5px" }}>
                                      <HandleCards3 card={"Diamond 1"} />
                                    </span>
                                  )}
                                  {playerA[bettingOptions]?.nat.split(
                                    " "
                                  )[0] === "Red" && (
                                    <span style={{ marginLeft: "5px" }}>
                                      <HandleCards3 card={"Heart 1"} />
                                    </span>
                                  )}

                                  {playerA[bettingOptions]?.nat.split(
                                    " "
                                  )[0] === "Black" && (
                                    <span style={{ marginLeft: "5px" }}>
                                      <HandleCards3 card={"Spade 1"} />
                                    </span>
                                  )}
                                  {playerA[bettingOptions]?.nat.split(
                                    " "
                                  )[0] === "Black" && (
                                    <span style={{ marginLeft: "5px" }}>
                                      <HandleCards3 card={"Club 1"} />
                                    </span>
                                  )}
                                </div>
                                {dragonTigerDetail?.profitLoss &&
                                  dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                  ] && (
                                    <span
                                      style={{
                                        marginTop:
                                          playerA[bettingOptions]?.gstatus ===
                                          "0"
                                            ? ""
                                            : "",
                                        zIndex: "100",
                                      }}
                                      className={`f400 title-14 ${
                                        dragonTigerDetail?.profitLoss
                                          ? dragonTigerDetail?.profitLoss[
                                              `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                            ]
                                            ? dragonTigerDetail?.profitLoss[
                                                `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                              ] > 0
                                              ? "color-green"
                                              : dragonTigerDetail?.profitLoss[
                                                  `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                                ] < 0
                                              ? "color-red"
                                              : ""
                                            : ""
                                          : ""
                                      }`}
                                    >
                                      {dragonTigerDetail?.profitLoss
                                        ? dragonTigerDetail?.profitLoss[
                                            `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                          ]
                                          ? dragonTigerDetail?.profitLoss[
                                              `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                            ]
                                          : ""
                                        : ""}
                                    </span>
                                  )}
                                {(!dragonTigerDetail.profitLoss ||
                                  !dragonTigerDetail.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                  ]) && <span className="f400 title-14"></span>}
                              </div>

                              <div
                                key={playerA[bettingOptions].sid}
                                className={`teenPatti-table-item ${
                                  playerA[bettingOptions].gstatus === "0"
                                    ? "lock"
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
                              </div>
                            </div>
                          ))}
                      </div>

                      <div style={{ width: "50%" }}>
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
                                marginBottom: "0px",
                                background: "#f7f7f7",
                              }}
                            >
                              <div
                                style={{
                                  width: "70%",
                                  padding: "6px",
                                  border: "0.1px solid #c7c8ca",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "cente",
                                  height: "50px",
                                }}
                              >
                                <span style={{ marginLeft: "5px" }}>
                                  <HandleCards3
                                    card={playerA[bettingOptions]?.nat}
                                  />
                                </span>

                                {dragonTigerDetail?.profitLoss &&
                                  dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                  ] && (
                                    <span
                                      style={{
                                        marginTop:
                                          playerA[bettingOptions]?.gstatus ===
                                          "0"
                                            ? ""
                                            : "",
                                        zIndex: "100",
                                      }}
                                      className={`f400 title-14 ${
                                        dragonTigerDetail?.profitLoss
                                          ? dragonTigerDetail?.profitLoss[
                                              `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                            ]
                                            ? dragonTigerDetail?.profitLoss[
                                                `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                              ] > 0
                                              ? "color-green"
                                              : dragonTigerDetail?.profitLoss[
                                                  `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                                ] < 0
                                              ? "color-red"
                                              : ""
                                            : ""
                                          : ""
                                      }`}
                                    >
                                      {dragonTigerDetail?.profitLoss
                                        ? dragonTigerDetail?.profitLoss[
                                            `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                          ]
                                          ? dragonTigerDetail?.profitLoss[
                                              `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                            ]
                                          : ""
                                        : ""}
                                    </span>
                                  )}
                                {(!dragonTigerDetail.profitLoss ||
                                  !dragonTigerDetail.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerA[bettingOptions]?.sid}_card`
                                  ]) && <span className="f400 title-14"></span>}
                              </div>

                              <div
                                key={playerA[bettingOptions].sid}
                                className={`teenPatti-table-item ${
                                  playerA[bettingOptions].gstatus === "0"
                                    ? "lock"
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
            )}
          </div>
        ) : (
          <>
            <MobileMyBet />
          </>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={warrules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default TeenPattiMobile;
