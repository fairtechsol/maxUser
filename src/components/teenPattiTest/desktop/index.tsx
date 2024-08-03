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
import "./style.scss";
import TeenTestResult from "./teenCard";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";
import RulesComponent from "../../commonComponent/rulesComponent";

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
  const { playerA } = dragonTigerDetail;
  const { sections, videoInfo } = dragonTigerDetail;

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

  const handleBet = (item: any, rateType: string, sectionId: string) => {
    const rate =
      rateType === "drate"
        ? item.drate
        : rateType === "lrate"
        ? item.lrate
        : item.trate;

    let team = {
      bettingType: "BACK",
      matchId: dragonTigerDetail?.id,
      odd: rate,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam:
        (rateType == "drate"
          ? "Dragon"
          : rateType == "lrate"
          ? "Lion"
          : "Tiger") +
        " " +
        item?.nat,
      name:
        (rateType == "drate"
          ? "Dragon"
          : rateType == "lrate"
          ? "Lion"
          : "Tiger") +
        " " +
        item?.nat,
      bettingName: "Match odds",
      selectionId: sectionId,
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.teenTest}`);
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
                    TEST TEENPATTI
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
                  result={
                    <TeenTestResult data={dragonTigerDetail?.videoInfo} />
                  }
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
                    <div style={{ width: "40%" }}></div>
                    <div
                      style={{
                        width: "60%",
                        backgroundColor: "#72bbef",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        className="teenPatti-table-item f12-b"
                        style={{ width: "100%" }}
                      >
                        BACK
                      </div>
                    </div>
                  </div>
                  <div
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
                      <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
                        {playerA?.[0]?.nat}
                      </span>
                    </div>

                    <div
                      className="teenPatti-table-item"
                      style={{ width: "20%", backgroundColor: "#72bbef" }}
                    >
                      <span className="f12-b">{"DRAGON"}</span>
                    </div>
                    <div
                      className={`teenPatti-table-item ${
                        playerA?.[0]?.gstatus != "0" &&
                        playerA?.[1]?.gstatus === "0"
                          ? "suspended"
                          : ""
                      }`}
                      style={{ width: "20%", backgroundColor: "#72bbef" }}
                    >
                      <span className="f12-b">{"LION"}</span>
                    </div>
                    <div
                      className={`teenPatti-table-item ${
                        playerA?.[0]?.gstatus != "0" &&
                        playerA?.[1]?.gstatus === "0"
                          ? "suspended"
                          : ""
                      }`}
                      style={{ width: "20%", backgroundColor: "#72bbef" }}
                    >
                      <span className="f12-b">{"TIGER"}</span>
                    </div>
                  </div>

                  {sections &&
                    sections.map((section: any, index: any) => (
                      <div
                        className="teenPatti-table-row"
                        style={{ lineHeight: 1 }}
                        key={index}
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
                            {section.nat}
                          </span>
                        </div>

                        <div
                          className={`${
                            section.dstatus !== true ? "suspended" : ""
                          }`}
                          style={{
                            width: "60%",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <div
                            className={`teenPatti-table-item`}
                            style={{
                              width: "33.3%",
                              backgroundColor: "#72bbef",
                            }}
                            onClick={() =>
                              section.dstatus === false
                                ? null
                                : handleBet(
                                    section,
                                    "drate",
                                    section.dsectionid
                                  )
                            }
                          >
                            <span className="f12-b">{section.drate}</span>
                            <span
                              className={
                                dragonTigerDetail?.profitLoss
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${section?.dsectionid}_card`
                                    ]
                                    ? dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${section?.dsectionid}_card`
                                      ] > 0
                                      ? "color-green"
                                      : dragonTigerDetail?.profitLoss[
                                          `${dragonTigerDetail?.videoInfo?.mid}_${section?.dsectionid}_card`
                                        ] < 0
                                      ? "color-red"
                                      : ""
                                    : ""
                                  : ""
                              }
                            >
                              {dragonTigerDetail?.profitLoss
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${section?.dsectionid}_card`
                                  ]
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${section?.dsectionid}_card`
                                    ]
                                  : 0
                                : 0}
                            </span>
                          </div>

                          <div
                            className={`teenPatti-table-item`}
                            style={{
                              width: "33.3%",
                              backgroundColor: "#72bbef",
                            }}
                            onClick={() =>
                              section.lstatus === false
                                ? null
                                : handleBet(section, "lrate", section.lsection)
                            }
                          >
                            <span className="f12-b">{section.lrate}</span>
                            <span
                              className={
                                dragonTigerDetail?.profitLoss
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${section?.lsection}_card`
                                    ]
                                    ? dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${section?.lsection}_card`
                                      ] > 0
                                      ? "color-green"
                                      : dragonTigerDetail?.profitLoss[
                                          `${dragonTigerDetail?.videoInfo?.mid}_${section?.lsection}_card`
                                        ] < 0
                                      ? "color-red"
                                      : ""
                                    : ""
                                  : ""
                              }
                            >
                              {dragonTigerDetail?.profitLoss
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${section?.lsection}_card`
                                  ]
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${section?.lsection}_card`
                                    ]
                                  : 0
                                : 0}
                            </span>
                          </div>

                          <div
                            className={`teenPatti-table-item`}
                            style={{
                              width: "33.3%",
                              backgroundColor: "#72bbef",
                            }}
                            onClick={() =>
                              section.tstatus === false
                                ? null
                                : handleBet(section, "trate", section.tsection)
                            }
                          >
                            <span className="f12-b">{section.trate}</span>
                            <span
                              className={
                                dragonTigerDetail?.profitLoss
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${section?.tsection}_card`
                                    ]
                                    ? dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${section?.tsection}_card`
                                      ] > 0
                                      ? "color-green"
                                      : dragonTigerDetail?.profitLoss[
                                          `${dragonTigerDetail?.videoInfo?.mid}_${section?.tsection}_card`
                                        ] < 0
                                      ? "color-red"
                                      : ""
                                    : ""
                                  : ""
                              }
                            >
                              {dragonTigerDetail?.profitLoss
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${section?.tsection}_card`
                                  ]
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${section?.tsection}_card`
                                    ]
                                  : 0
                                : 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                  <div className="ticker-container">
                    <div className="ticker-wrap">
                      <div
                        className="ticker-move"
                        style={{ color: "#8b0000", fontWeight: "700" }}
                      >
                        {videoInfo && videoInfo.remark}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["D", "T", "L"]}
                    type={"teen9"}
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
                <DesktopPlacedBet />
              </Col>
              <Col md={12}>
                <DesktopMyBet />
              </Col>
              <Col>
                <RulesComponent>
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
                </RulesComponent>
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
