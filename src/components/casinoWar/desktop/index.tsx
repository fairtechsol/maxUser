import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { warrules } from "../../../assets/images";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { cardGamesId, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import { HandleCards } from "../../commonComponent/cardsComponent";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import NewLoader from "../../commonComponent/newLoader";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import "./style.scss";
import CasinoWarResult from "./teenCard";

const TeenPattiDesktop = () => {
  const dispatch: AppDispatch = useDispatch();
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [show, setShow] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
  //const { playerA, playerB } = dragonTigerDetail;

  const handleClose = () => {
    setShowInactivityModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (placeBetRef?.current && placeBetRef?.current?.offsetTop) {
        const sticky = placeBetRef?.current.offsetTop;
        setIsSticky(window.scrollY > sticky);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
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
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div style={{ marginBottom: ".30px" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    CASINO WAR
                  </span>
                  <span
                    style={{
                      fontSize: ".875em",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => setShow(true)}
                  >
                    {" "}
                    Rules
                  </span>
                </div>
                <span style={{fontSize:"12px",paddingTop:"6px"}}>
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${handleRoundId(
                        dragonTigerDetail?.videoInfo?.mid
                      )}|Min: ${
                        dragonTigerDetail?.players?.[0]?.[0]?.min ?? 0
                      }|Max: ${dragonTigerDetail?.players?.[0]?.[0]?.max ?? 0}`
                    : ""}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "90%",
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
              <div>
                <div className="teenPatti-table-container-c">
                  <div
                    className="teenPatti-table-row"
                    style={{
                      lineHeight: 2,
                      marginTop: "2px",
                    }}
                  >
                    <div style={{ width: "40%" }}></div>
                    <div
                      style={{
                        width: "60%",

                        display: "flex",
                        flexDirection: "row",
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
                      style={{ width: "40%", border: "0.1px solid #fff" }}
                    ></div>
                    <div
                      style={{
                        width: "60%",
                        backgroundColor: "#f2f2f2",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        className="teenPatti-table-item f12-b"
                        style={{ width: "16.7%" }}
                      >
                        1
                      </div>
                      <div
                        className="teenPatti-table-item f12-b"
                        style={{ width: "16.7%" }}
                      >
                        2
                      </div>
                      <div
                        className="teenPatti-table-item f12-b"
                        style={{ width: "16.7%" }}
                      >
                        3
                      </div>
                      <div
                        className="teenPatti-table-item f12-b"
                        style={{ width: "16.7%" }}
                      >
                        4
                      </div>
                      <div
                        className="teenPatti-table-item f12-b"
                        style={{ width: "16.7%" }}
                      >
                        5
                      </div>
                      <div
                        className="teenPatti-table-item f12-b"
                        style={{ width: "16.7%" }}
                      >
                        6
                      </div>
                    </div>
                  </div>

                  {dragonTigerDetail?.players?.map(
                    (playerA: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className="teenPatti-table-row"
                          style={{ lineHeight: 1 }}
                        >
                          <div
                            style={{
                              width: "40%",
                              padding: "10px",
                              border: "0.1px solid #fff",
                            }}
                          >
                            <span
                              style={{ fontSize: "14px", fontWeight: "bolder" }}
                            >
                              {playerA[0]?.nat.split(" ")[0]}{" "}
                              {/* Display category */}
                            </span>
                          </div>
                          <div
                            className={
                              //playerA[0]?.gstatus === "0" ? "suspended" :
                              ""
                            }
                            style={{
                              width: "60%",
                              backgroundColor: "#72bbef",
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            {Array.isArray(playerA) &&
                              playerA?.map((player: any) => (
                                <div
                                  key={player.sid}
                                  className={`teenPatti-table-item ${
                                    player.gstatus === "0" ? "locked" : ""
                                  }`}
                                  style={{ width: "16.7%" }}
                                  onClick={() =>
                                    player.gstatus === "0"
                                      ? null
                                      : handleBet(player)
                                  }
                                >
                                  <span className="f12-b">{player.b1}</span>

                                  <span
                                    className={`f400 title-14 ${
                                      dragonTigerDetail?.profitLoss
                                        ? dragonTigerDetail?.profitLoss[
                                            `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                                          ]
                                          ? dragonTigerDetail?.profitLoss[
                                              `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                                            ] > 0
                                            ? "color-green"
                                            : dragonTigerDetail?.profitLoss[
                                                `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                                              ] < 0
                                            ? "color-red"
                                            : ""
                                          : ""
                                        : ""
                                    }`}
                                    style={{
                                      marginTop:
                                        player.gstatus === "0" ? "15px" : "",
                                      zIndex: "100",
                                    }}
                                  >
                                    {dragonTigerDetail?.profitLoss
                                      ? dragonTigerDetail?.profitLoss[
                                          `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                                        ]
                                        ? dragonTigerDetail?.profitLoss[
                                            `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                                          ]
                                        : 0
                                      : 0}
                                  </span>

                                  {/* {(!dragonTigerDetail.profitLoss ||
                                  !dragonTigerDetail.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                                  ]) && (
                                  <span className="f400 title-14">0</span>
                                )} */}
                                </div>
                              ))}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>

                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["R", "R", "R"]}
                    type={"war"}
                  />
                </div>
              </div>
            )}
          </div>
        </Col>
        <Col md={4} className="p-0">
          <Container className="p-0" fluid ref={placeBetRef}>
            <Row
              className={` ${isSticky ? "position-fixed top-0" : ""}`}
              style={{
                width: isSticky
                  ? placeBetRef.current?.offsetWidth + "px"
                  : "100%",
              }}
            >
              <Col className="p-1 pt-0" md={12}>
                <DesktopPlacedBet />
              </Col>
              <Col className="p-1 pt-0" md={12}>
                <DesktopMyBet />
              </Col>
              <Col>
                <RulesModal show={show} setShow={setShow} rule={warrules} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default TeenPattiDesktop;
