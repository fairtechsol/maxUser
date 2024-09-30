import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { tprules } from "../../../assets/images";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { cardGamesId, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import "./style.scss";
import Teen1DResult from "./teenCard";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";
import NewLoader from "../../commonComponent/newLoader";

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
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div style={{ height: "60%" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    1 DAY TEEN PATTI
                  </span>
                  <span
                    style={{ fontSize: "14px", textDecoration: "underline",cursor:"pointer" }}
                    onClick={() => setShow(true)}
                  >
                    {" "}
                    RULES
                  </span>
                </div>
                <span>
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${handleRoundId(
                        dragonTigerDetail?.videoInfo?.mid
                      )}|Min: ${dragonTigerDetail?.videoInfo?.min}|Max: ${
                        dragonTigerDetail?.videoInfo?.max
                      }`
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
                  time={dragonTigerDetail?.videoInfo?.lasttime}
                  result={<Teen1DResult data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div style={{ height: "40%" }}>
                <div
                  className="teenPatti-table-container"
                  style={{ marginTop: "1px" }}
                >
                  <div
                    className="teenPatti-table-row"
                    style={{ lineHeight: 2 }}
                  >
                    <div
                      style={{ width: "60%", border: "0.1px solid #fff" }}
                    ></div>
                    <div
                      style={{
                        width: "40%",
                        backgroundColor: "#72bbef",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        className="teenPatti-table-item fw-bold f16-b fs-12 fs-sm-14 fs-md-16 fs-lg-18"
                        style={{ width: "50%" }}
                      >
                        BACK
                      </div>
                      <div
                        className="teenPatti-table-item fw-bold f16-b fs-12 fs-sm-14 fs-md-16 fs-lg-18"
                        style={{ width: "50%", background: "#f9c9d4" }}
                      >
                        LAY
                      </div>
                    </div>
                  </div>
                  <div
                    className="teenPatti-table-row"
                    style={{ lineHeight: 1 }}
                  >
                    <div
                      style={{
                        width: "60%",
                        padding: "10px",
                        border: "0.1px solid #fff",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
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
                        playerA?.[0]?.gstatus === "SUSPENDED" ? "suspended" : ""
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
                        className={`teenPatti-table-item`}
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
                    style={{ lineHeight: 1 }}
                  >
                    <div
                      style={{
                        width: "60%",
                        padding: "10px",
                        border: "0.1px solid #fff",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
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
                        playerB?.[0]?.gstatus === "SUSPENDED" ? "suspended" : ""
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
                        className={`teenPatti-table-item`}
                        style={{ width: "50%", background: "#f9c9d4" }}
                        onClick={() =>
                          playerB?.[1]?.gstatus === "0"
                            ? null
                            : handleBet(playerB?.[0], "LAY")
                        }
                      >
                        <span className="f12-b">
                          {updatedValue(playerB?.[0]?.l1)}
                        </span>
                        {/* <span
                        className={`f10-b ${
                          dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[1]?.sectionId}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[1]?.sectionId}_card`
                                ] > 0
                                ? "color-green"
                                : dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[1]?.sectionId}_card`
                                  ] < 0
                                ? "color-red"
                                : ""
                              : ""
                            : ""
                        }`}
                      >
                        {dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[0]?.sectionId}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playerB?.[0]?.sectionId}_card`
                              ]
                            : 0
                          : 0}
                      </span> */}
                        <span className="f10-b">{playerB?.[0]?.ls1}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["A", "T", "B"]}
                    type={"teen"}
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
                {/* <div className="casino-title" style={{ position: "relative" }}>
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
                        <tr key={index}>
                          <td className="box-7">{item.label}</td>
                          <td className="box-3">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div> */}
                <RulesModal show={show} setShow={setShow} rule={tprules} type={"imageWithContent"} gameType="teen" />
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
