import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
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
import PlacedBet from "./placeBet";
import "./style.scss";
import Teen20Result from "./teenCard";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";

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
    setVideoFrameId(`${cardUrl}${cardGamesId?.teen20}`);
  }, []);

  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div style={{ marginBottom: ".30px" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    20-20 TEENPATTI
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
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
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<Teen20Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <LoaderOnRefresh />
            ) : (
              <div>
                <div className="teenPatti-table-container-20">
                  <div
                    className="teenPatti-table-row"
                    style={{ lineHeight: 2 }}
                  >
                    <div
                      style={{ width: "50%", border: "0.1px solid #fff" }}
                    ></div>
                    <div
                      style={{
                        width: "50%",
                        backgroundColor: "#72bbef",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        className="teenPatti-table-item f12-b"
                        style={{ width: "40%" }}
                      >
                        BACK
                      </div>
                      <div
                        className="teenPatti-table-item"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                  <div
                    className="teenPatti-table-row"
                    style={{ lineHeight: 1 }}
                  >
                    <div
                      style={{
                        width: "50%",
                        padding: "10px",
                        border: "0.1px solid #fff",
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
                  <div
                    className="teenPatti-table-row"
                    style={{ lineHeight: 1 }}
                  >
                    <div
                      style={{
                        width: "50%",
                        padding: "10px",
                        border: "0.1px solid #fff",
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
                          playerB?.[0]?.gstatus != "0" &&
                          playerB?.[1]?.gstatus === "0"
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
                  </div>
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["A", "T", "B"]}
                    type={"teen20"}
                  />
                </div>
              </div>
            )}
          </div>
        </Col>
        <Col md={4} className="ps-0">
          <Container className="p-0" fluid ref={placeBetRef}>
            <Row
              className={` ${isSticky ? "position-fixed top-0" : ""}`}
              style={{
                width: isSticky
                  ? placeBetRef.current?.offsetWidth + "px"
                  : "100%",
              }}
            >
              <Col md={12}>
                <PlacedBet />
              </Col>
              <Col md={12}>
                <DesktopMyBet />
              </Col>
              <Col>
                <div className="casino-title mt-2" style={{ position: "relative" }}>
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
                </div>
                <RulesModal show={show} setShow={setShow} rule={tprules} />
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
