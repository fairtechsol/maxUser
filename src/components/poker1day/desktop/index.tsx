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
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";
import DynamicTable from "./betTable";
import Poker1DayResult from "./poker1DayCard";

const Poker1DayDesktop = () => {
  const dispatch: AppDispatch = useDispatch();
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [show, setShow] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId.poker1Day}`
  );
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const { playersBonusPair } = dragonTigerDetail;
// console.log(dragonTigerDetail, "data")
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

  const bonus1 = [
    { label: "Pair (2-10)", value: "1 To 3" },
    { label: "A/Q or A/J Off Suited", value: "1 TO 5" },
    { label: "Pair (JQK)", value: "1 TO 10" },
    { label: "A/K Off Suited", value: "1 TO 15" },
    { label: "A/Q or A/J Suited", value: "1 TO 20" },
    { label: "A/K Suited", value: "1 TO 25" },
    { label: "A/A", value: "1 TO 30" },
  ];

  const bonus2 = [
    { label: "Three of a Kind", value: "1 To 3" },
    { label: "Straight", value: "1 TO 4" },
    { label: "Flush", value: "1 TO 6" },
    { label: "Full House", value: "1 TO 8" },
    { label: "Four of a Kind", value: "1 TO 30" },
    { label: "Straight Flush", value: "1 TO 50" },
    { label: "Royal Flush", value: "1 TO 100" },
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

  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div style={{ height: "400px", marginBottom: ".30px" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    Poker 1 Day
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
                  result={<Poker1DayResult data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            <div style={{ height: "350px" }}>
              <div className="poker-table-container ">
                <div style={{width: "40%"}}>
                  <DynamicTable
                   odds={dragonTigerDetail?.oddsData}
                   data={dragonTigerDetail}
                   playerNum={[8, 9]}
                  />
                </div>
                <div style={{width: "60%"}}>
                <div className="poker-table-row" style={{ lineHeight: 2 }}>
                  <div
                    style={{ width: "50%", border: "0.1px solid #fff" }}
                  ></div>
                  <div
                    style={{
                      width: "50%",
                      backgroundColor: "#a7d8fd",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      className="poker-table-item f12-b"
                      style={{ width: "50%" }}
                    >
                      BACK
                    </div>
                    <div
                      className="poker-table-item f12-b"
                      style={{ width: "50%" }}
                    >BACK</div>
                  </div>
                </div>
                <div className="poker-table-row" style={{ lineHeight: 1 }}>
                  <div
                    style={{
                      width: "50%",
                      padding: "16px",
                      border: "0.1px solid #fff",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
                      Player A
                    </span>
                  </div>
                  <div
                    className={
                      playersBonusPair?.[0]?.gstatus === "SUSPENDED" 
                        ? "suspended"
                        : ""
                    }
                    style={{
                      width: "50%",
                      backgroundColor: "#a7d8fd",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      className="poker-table-item"
                      style={{ width: "50%" }}
                      onClick={() =>
                        playersBonusPair?.[0]?.gstatus === "0"
                          ? null
                          : handleBet(playersBonusPair?.[0])
                      }
                    >
                      <span className="f12-b">{playersBonusPair?.[0]?.nat}</span>
                      <span
                        className={`f10-b ${
                          dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[0]?.sid}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[0]?.sid}_card`
                                ] > 0
                                ? "color-green"
                                : dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[0]?.sid}_card`
                                  ] < 0
                                ? "color-red"
                                : ""
                              : ""
                            : ""
                        }`}
                      >
                        {dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[0]?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[0]?.sid}_card`
                              ]
                            : 0
                          : 0}
                      </span>
                    </div>
                    <div
                      className={`poker-table-item`}
                      style={{ width: "50%" }}
                      onClick={() =>
                        playersBonusPair?.[1]?.gstatus === "0"
                          ? null
                          : handleBet(playersBonusPair?.[1])
                      }
                    >
                      <span className="f12-b">{playersBonusPair?.[1]?.nat}</span>
                      <span
                        className={`f10-b ${
                          dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[1]?.sid}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[1]?.sid}_card`
                                ] > 0
                                ? "color-green"
                                : dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[1]?.sid}_card`
                                  ] < 0
                                ? "color-red"
                                : ""
                              : ""
                            : ""
                        }`}
                      >
                        {dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[1]?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[1]?.sid}_card`
                              ]
                            : 0
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="poker-table-row" style={{ lineHeight: 1 }}>
                  <div
                    style={{
                      width: "50%",
                      padding: "18px",
                      border: "0.1px solid #fff",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
                      Player B
                    </span>
                  </div>
                  <div
                    className={
                      playersBonusPair?.[2]?.gstatus === "SUSPENDED" 
                        ? "suspended"
                        : ""
                    }
                    style={{
                      width: "50%",
                      backgroundColor: "#a7d8fd",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      className="poker-table-item"
                      style={{ width: "50%" }}
                      onClick={() =>
                        playersBonusPair?.[2]?.gstatus === "0"
                          ? null
                          : handleBet(playersBonusPair?.[2])
                      }
                    >
                      <span className="f12-b">{playersBonusPair?.[2]?.nat}</span>
                      <span
                        className={`f10-b ${
                          dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[2]?.sid}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[2]?.sid}_card`
                                ] > 0
                                ? "color-green"
                                : dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[2]?.sid}_card`
                                  ] < 0
                                ? "color-red"
                                : ""
                              : ""
                            : ""
                        }`}
                      >
                        {dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[2]?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[2]?.sid}_card`
                              ]
                            : 0
                          : 0}
                      </span>
                    </div>
                    <div
                      className={`poker-table-item `}
                      style={{ width: "50%" }}
                      onClick={() =>
                        playersBonusPair?.[3]?.gstatus === "0"
                          ? null
                          : handleBet(playersBonusPair?.[3])
                      }
                    >
                      <span className="f12-b">{playersBonusPair?.[3]?.nat}</span>
                      <span
                        className={`f10-b ${
                          dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[3]?.sid}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[3]?.sid}_card`
                                ] > 0
                                ? "color-green"
                                : dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[3]?.sid}_card`
                                  ] < 0
                                ? "color-red"
                                : ""
                              : ""
                            : ""
                        }`}
                      >
                        {dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[3]?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${playersBonusPair?.[3]?.sid}_card`
                              ]
                            : 0
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            
              </div>
              <div style={{ width: "100%", marginTop: "10px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["A", "T", "B"]}
                  type={"poker"}
                />
              </div>
            </div>
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
                <MyBet />
              </Col>
              <Col>
                <div className="casino-title" style={{ position: "relative" }}>
                  <span>Rules</span>
                </div>
                <div className="table-responsive rules-table">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th colSpan={2} className="box-10 text-center title-14">
                        Bonus 1 (2 Cards Bonus)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bonus1.map((item, index) => (
                        <tr key={index}>
                          <td className="box-7">{item.label}</td>
                          <td className="box-3">{item.value}</td>
                        </tr>
                      ))}
                       <tr>
                        <th colSpan={2} className="box-10 text-center">
                        Bonus 2 (7 Cards Bonus)
                        </th>
                      </tr>
                       {bonus2.map((item, index) => (
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

export default Poker1DayDesktop;
