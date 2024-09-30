import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { crick20rules } from "../../../assets/images";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { cardGamesId, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import NewLoader from "../../commonComponent/newLoader";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";
import RulesComponent from "../../commonComponent/rulesComponent";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import ScoreBox from "../mobile/scoreBox";
import "./style.scss";
import Teen20Result from "./teenCard";
const CricketMatch20Desktop = () => {
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
  const [profitLossData, setProfitLossData] = useState<
    Record<string, ProfitLoss>
  >({});

  const { leftBoard, rightBoard } = dragonTigerDetail;

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

  const handleBet = (item: any, type: any) => {
    let team = {
      bettingType: type,
      matchId: dragonTigerDetail?.id,
      odd: type === "BACK" ? item?.b1 : item.l1,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: item?.sid,
      min:item?.min,
      max:item?.max
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.cmatch20}`);
  }, []);

  type ProfitLoss = {
    pl: number;
    run: number | string;
  };

  useEffect(() => {
    if (
      dragonTigerDetail?.profitLoss?.[
        `${dragonTigerDetail?.videoInfo?.mid}_1_card`
      ]
    ) {
      const parsedData = JSON.parse(
        dragonTigerDetail.profitLoss[
          `${dragonTigerDetail.videoInfo.mid}_1_card`
        ]
      );
      setProfitLossData(parsedData);
    } else setProfitLossData({});
  }, [dragonTigerDetail]);

  useEffect(() => {
    if (leftBoard?.[0]?.gstatus === "SUSPENDED" || leftBoard?.[0]?.b1 ==="0.00") {
      dispatch(selectedBetAction(""));
    } else {
    }
  }, [leftBoard?.[0]?.gstatus,leftBoard?.[0]?.b1]);

  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div style={{ height: "400px", marginBottom: ".30px" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    CRICKET MATCH 20-20
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
                      )}
                     
                      `
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
                  profitLoss={profitLossData}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div style={{}}>
                <div className="teenPatti-table-container">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      background: "#f7f7f7",
                    }}
                  >
                    <div
                      style={{
                        width: "49%",
                        background: "#F2F2F2",
                        padding: "5px",
                        boxShadow: "0 0 3px #aaa",
                      }}
                    >
                      {leftBoard?.map((item: any, index: any) => (
                        <div>
                          <ScoreBox
                            teamA="Team A"
                            teamAScore={`${dragonTigerDetail?.videoInfo?.C2}/${dragonTigerDetail?.videoInfo?.C3}`}
                            teamAOver={dragonTigerDetail?.videoInfo?.C4}
                            teamB="Team B"
                            teamBScore={`${dragonTigerDetail?.videoInfo?.C5}/${dragonTigerDetail?.videoInfo?.C6}`}
                            teamBOver={dragonTigerDetail?.videoInfo?.C7}
                            ballIconUrl={`https://versionobj.ecoassetsservice.com/v13/static/front/img/balls/cricket20/ball${
                              2 + index
                            }.png`}
                            backOdds={item.b1}
                            layOdds={item.l1}
                            handleBet={handleBet}
                            item={item}
                            runs={
                              Object.keys(profitLossData).length > 0
                                ? profitLossData[String(2 + index)]?.run ?? 0
                                : 0
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        width: "49%",
                        background: "#F2F2F2",
                        padding: "5px",
                        boxShadow: "0 0 3px #aaa",
                      }}
                    >
                      {rightBoard?.map((item: any, index: any) => {
                        return (
                          <div>
                            <ScoreBox
                              teamA="Team A"
                              teamAScore={`${dragonTigerDetail?.videoInfo?.C2}/${dragonTigerDetail?.videoInfo?.C3}`}
                              teamAOver={dragonTigerDetail?.videoInfo?.C4}
                              teamB="Team B"
                              teamBScore={`${dragonTigerDetail?.videoInfo?.C5}/${dragonTigerDetail?.videoInfo?.C6}`}
                              teamBOver={dragonTigerDetail?.videoInfo?.C7}
                              ballIconUrl={`https://versionobj.ecoassetsservice.com/v13/static/front/img/balls/cricket20/ball${
                                7 + index
                              }.png`}
                              backOdds={item.b1}
                              layOdds={item.l1}
                              handleBet={handleBet}
                              item={item}
                              runs={
                                Object.keys(profitLossData).length > 0
                                  ? profitLossData[String(7 + index)]?.run ?? 0
                                  : 0
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="ticker-container">
                    <div className="ticker-wrap">
                      <div
                        className="ticker-move"
                        style={{
                          color: "#097c93",
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        {dragonTigerDetail?.videoInfo &&
                          dragonTigerDetail?.videoInfo.remark}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                    type={"cmatch20"}
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
              <Col className="p-1 pt-0">
                <RulesComponent />
                <RulesModal show={show} setShow={setShow} rule={crick20rules} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default CricketMatch20Desktop;
