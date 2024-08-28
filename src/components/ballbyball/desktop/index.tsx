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
import Teen20Result from "./teenCard";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";

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
  const { runs } = dragonTigerDetail;

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
    setVideoFrameId(`${cardUrl}${cardGamesId?.ballbyball}`);
  }, []);

  useEffect(() => {
    if (runs?.[0]?.gstatus === "SUSPENDED" || runs?.[0]?.b === "0.00") {
      dispatch(selectedBetAction(""));
    }
  }, [runs?.[0]?.gstatus, runs?.[0]?.b]);

  console.log("dddd", dragonTigerDetail);
  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div style={{ marginBottom: ".30px" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    BallbyBall
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
                  time={dragonTigerDetail?.videoInfo?.lt}
                  //result={<Teen20Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <LoaderOnRefresh />
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "5%",
                    borderBottom: "0.01em solid #c7c8ca",
                  }}
                >
                  <div
                    style={{
                      lineHeight: 2,
                      width: "100%",
                      background: "#f2f2f2",
                      borderBottom: "0.01em solid #c7c8ca",
                    }}
                  >
                    <div style={{ display: "flex", width: "100%" }}>
                      <div
                        style={{ width: "40%", border: "0.1px solid #fff" }}
                      ></div>
                      <div
                        style={{
                          width: "20%",
                          backgroundColor: "#72bbef",
                          display: "flex",

                          fontWeight: "bold",
                          fontSize: "16px",
                          justifyContent: "center",
                        }}
                      >
                        BACK
                      </div>
                      <div style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  <div
                    style={{
                      lineHeight: 2,
                      width: "100%",
                      background: "#f2f2f2",
                      borderBottom: "0.01em solid #c7c8ca",
                    }}
                  >
                    <div style={{ display: "flex", width: "100%" }}>
                      <div
                        style={{ width: "40%", border: "0.1px solid #fff" }}
                      ></div>
                      <div
                        style={{
                          width: "20%",
                          backgroundColor: "#72bbef",
                          display: "flex",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        BACK
                      </div>
                      <div style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  <div
                    style={{
                      lineHeight: 2,
                      width: "100%",
                      background: "#f2f2f2",
                      borderBottom: "0.01em solid #c7c8ca",
                    }}
                  >
                    <div style={{ display: "flex", width: "100%" }}>
                      <div
                        style={{ width: "40%", border: "0.1px solid #fff" }}
                      ></div>
                      <div
                        style={{
                          width: "20%",
                          backgroundColor: "#72bbef",
                          fontWeight: "bold",
                          fontSize: "16px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        BACK
                      </div>
                      <div style={{ width: "40%" }}></div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    lineHeight: 2,
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {runs?.map((item: any, index: any) => (
                    <div
                      style={{
                        display: "flex",
                        width: "30%",
                        marginBottom: "0px",
                        borderBottom: "0.01em solid #c7c8ca",
                        background: "#f2f2f2",
                      }}
                      key={item.sid}
                    >
                      <div
                        style={{ width: "40%", border: "0.1px solid #fff",fontSize:"14px" }}
                      >{item.nat}</div>
                      <div
                        style={{
                          width: "20%",
                          backgroundColor: "#72bbef",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize:"12px"
                        }}
                      >
                        <span style={{ fontSize:"18px",
                          fontWeight:"bold"}}>{item.b}</span ><span>{item.bs}</span>
                      </div>
                      <div style={{ width: "40%",display: "flex",
                          flexDirection: "column",
                          alignItems:"center",
                          color:"#097c93",fontSize:"12px",fontWeight:"bold" }}>
                      <span>Min:{item.min}</span><span>Max:{item.max}</span>
                         
                        </div>
                    </div>
                  ))}
                </div>

                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["A", "T", "B"]}
                    type={"ballbyball"}
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
                <div
                  className="casino-title mt-2"
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
