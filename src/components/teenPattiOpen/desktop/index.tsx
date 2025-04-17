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
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import NewLoader from "../../commonComponent/newLoader";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import "../../commonStyle.scss";
import TeenPattiTableRow from "./tableRow";
import TeenOpenResult from "./teenCard";
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
  const { players, pairsPlus } = dragonTigerDetail;

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
      betOnTeam: item?.nation,
      name: item?.nation,
      bettingName: "Match odds",
      selectionId: item?.sid,
      min: item?.min,
      max: item?.max
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

  const extractCardAndPlayerInfo = (cardsString: any) => {
    let cardsPart = cardsString;
    let playersPart = "";

    if (cardsString?.includes("#")) {
      [cardsPart, playersPart] = cardsString.split("#");
    }

    const cardsArray = cardsPart?.split(",");

    const playersArray = playersPart
      ? playersPart?.match(/\d+/g)?.map(Number)
      : [];

    return {
      cardsArray,
      playersArray,
    };
  };

  const { cardsArray: cardsArray1, playersArray: playersArray1 } =
    extractCardAndPlayerInfo(dragonTigerDetail?.videoInfo?.cards);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.teenOpen}`);
  }, []);

  useEffect(() => {
    if (
      players?.player1?.gstatus === "0" ||
      players?.player1?.rate === "0.00"
    ) {
      dispatch(selectedBetAction(""));
    }
  }, [players?.player1?.gstatus, players?.player1?.rate]);

  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div style={{ marginBottom: ".30px" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    OPEN TEENPATTI
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => setShow(true)}
                  >
                    {" "}
                    Rules
                  </span>
                </div>
                <span className="title-12 mt-1">
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${handleRoundId(
                      dragonTigerDetail?.videoInfo?.mid
                    )}`
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
                  result={<TeenOpenResult data={cardsArray1} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div>
                <div className="teenPatti-table-container-open">
                  <div
                    className="teenPatti-table-row"
                    style={{
                      lineHeight: 2,
                      background: "#f2f2f2",
                      borderLeft: "0.1px solid #c7c8ca",
                      borderBottom: "0.1px solid #c7c8ca",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "60%",
                        backgroundColor: "#72bbef",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        className="teenPatti-table-itemo f12-b"
                        style={{ width: "50%" }}
                      >
                        Odds
                      </div>
                      <div
                        className="teenPatti-table-itemo f12-b"
                        style={{ width: "50%" }}
                      >
                        Pair Plus
                      </div>
                    </div>
                  </div>

                  {players &&
                    Object.keys(players).map((key, index) => (
                      <TeenPattiTableRow
                        key={key}
                        indx={index}
                        player={players[key]}
                        pairPlus={pairsPlus[`pairPlus${index + 1}`]}
                        cardsA={cardsArray1}
                        playersA={playersArray1}
                        handleBet={handleBet}
                      />
                    ))}
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["R", "R", "R"]}
                    type={"teen8"}
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
                <div
                  className="casino-title mt-2"
                  style={{ position: "relative" }}
                >
                  <span style={{ color: "#fff" }}>Rules</span>
                </div>
                <div className="table-responsive rules-table">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th
                          colSpan={2}
                          className="box-10 text-center title-14"
                          style={{ background: "#f7f7f7", lineHeight: "1" }}
                        >
                          Pair Plus
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rules?.map((item, index) => (
                        <tr key={index} style={{ lineHeight: "1" }}>
                          <td
                            className="box-7"
                            style={{ background: "#f7f7f7" }}
                          >
                            {item.label}
                          </td>
                          <td
                            className="box-3"
                            style={{ background: "#f7f7f7" }}
                          >
                            {item.value}
                          </td>
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
