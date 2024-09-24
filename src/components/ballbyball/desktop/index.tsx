import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { cardGamesId, cardUrl } from "../../../utils/constants";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import "./style.scss";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";
import NewLoader from "../../commonComponent/newLoader";
import RulesModal from "../../commonComponent/rulesModal";

const TeenPattiDesktop = () => {
  const dispatch: AppDispatch = useDispatch();
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("rules");
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

  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: dragonTigerDetail?.id,
      odd: item?.b,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: "" + item?.sid,
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
                    Rules
                  </span>
                </div>
                {/* <span>
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${handleRoundId(
                        dragonTigerDetail?.videoInfo?.mid
                      )}`: ""}
                    
                </span> */}
                <span>
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${dragonTigerDetail?.videoInfo?.mid}`
                    : ""}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "90%",
                  backgroundColor: "#000",
                  position: "relative",
                }}
              >
                {/* <img
                 className="elem"
                  src={`https://versionobj.ecoassetsservice.com/v13/static/front/img/balls/cricket20/ball${0}.png`}
                  style={{
                    position: "absolute", 
                    top: "50%", 
                    left: "50%", 
                    transform: "translate(-50%, -100%)", 
                    zIndex: 2, 
                  }}
                  alt="Centered Image"
                /> */}

                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.lt}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div>
                <div
                  style={{
                    background: "rgb(255 199 66 / 85%)",
                    color: "#fff",
                    fontWeight: "bold",
                    lineHeight: 2,
                  }}
                >
                  <span style={{ marginLeft: "10px" }}> Runs</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    justifyContent: "space-between",
                    borderBottom: "0.01em solid #c7c8ca",
                    lineHeight: 2,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "30%",

                      borderBottom: "0.01em solid #c7c8ca",
                      background: "#f2f2f2",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        //border: "0.1px solid #fff",
                        fontSize: "14px",
                        marginLeft: "3px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "20%",
                        backgroundColor: "#72bbef",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Back
                    </div>
                    <div
                      style={{
                        width: "40%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "#097c93",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "30%",

                      borderBottom: "0.01em solid #c7c8ca",
                      background: "#f2f2f2",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        //border: "0.1px solid #fff",
                        fontSize: "14px",
                        marginLeft: "3px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "20%",
                        backgroundColor: "#72bbef",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Back
                    </div>
                    <div
                      style={{
                        width: "40%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "#097c93",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "30%",

                      borderBottom: "0.01em solid #c7c8ca",
                      background: "#f2f2f2",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        //border: "0.1px solid #fff",
                        fontSize: "14px",
                        marginLeft: "3px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "20%",
                        backgroundColor: "#72bbef",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Back
                    </div>
                    <div
                      style={{
                        width: "40%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "#097c93",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    ></div>
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

                        borderBottom: "0.01em solid #c7c8ca",
                        background: "#f2f2f2",
                      }}
                      key={item.sid}
                    >
                      <div
                        style={{
                          width: "40%",

                          marginLeft: "3px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          {item.nat}
                        </div>
                        <span
                          className={`f10-b ${
                            dragonTigerDetail?.profitLoss
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${item?.sid}_card`
                                ]
                                ? dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${item?.sid}_card`
                                  ] > 0
                                  ? "color-green"
                                  : dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${item?.sid}_card`
                                    ] < 0
                                  ? "color-red"
                                  : ""
                                : ""
                              : ""
                          }`}
                          style={{ zIndex: "100" }}
                        >
                          {dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.sid}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${item?.sid}_card`
                                ]
                              : ""
                            : ""}
                        </span>
                      </div>
                      <div
                        style={{
                          width: "20%",
                          backgroundColor: "#72bbef",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "12px",
                        }}
                        className={
                          runs?.[0]?.gstatus === "SUSPENDED" &&
                          runs?.[0]?.b === 0
                            ? "suspended"
                            : "teenPatti-table-item"
                        }
                        onClick={() =>
                          runs?.[0]?.gstatus === "SUSPENDED" &&
                          runs?.[0]?.b === 0
                            ? ""
                            : handleBet(item)
                        }
                      >
                        <span className="f12-b">{item.b}</span>
                        <span className="f10-b">{item.bs}</span>
                      </div>
                      <div
                        style={{
                          width: "40%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          color: "#097c93",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        <span>Min:{item.min}</span>
                        <span>Max:{item.max}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "10%",
                      background: "#086f3f",
                      lineHeight: 2,
                    }}
                  >
                    <img
                      src="https://versionobj.ecoassetsservice.com/v15/static/front/img/icons/remark.png"
                      style={{
                        marginLeft: "20px",
                        height: "20px",
                        boxShadow: "none",
                        background: "#086f3f",
                      }}
                    ></img>
                  </div>

                  <div
                    className="ticker-container"
                    style={{
                      width: "90%",

                      background: "#086f3f",
                      border: "#086f3f",
                      lineHeight: 2.7,
                    }}
                  >
                    <div
                      className="ticker-wrap"
                      style={{ border: "#086f3f", height: "100%" }}
                    >
                      <div
                        className="ticker-move"
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          width: "100%",
                          fontSize: "12px",
                          border: "#086f3f",
                          height: "100%",
                        }}
                      >
                        {dragonTigerDetail?.videoInfo?.remark}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["R", "R", "R"]}
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
              <RulesModal show={show} setShow={setShow} type={modalType}/>
            </Row>
          </Container>
        </Col>
      </Row>
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default TeenPattiDesktop;
