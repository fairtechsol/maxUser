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
import TeenOpenResult from "./teenCard";
import { HandleCards2 } from "../../cardsComponent2";
const TeenPattiDesktop = () => {
  const dispatch: AppDispatch = useDispatch();
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [show, setShow] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId.teenOpen}`
  );
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
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

  const TeenPattiTableRow = ({
    player,
    pairPlus,
    indx,
    cardsA,
  }: any) => {
   

    return (
      <div className="teenPatti-table-row" style={{ lineHeight: 1 }} >
        <div
          style={{
            width: "40%",
            height:"60px",
            padding: "10px",
            border: "0.1px solid #fff",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
            {player?.nat}
          </span>

          <HandleCards2 card={cardsA[indx] !== "1" ? cardsA[indx] : ""} />

          <HandleCards2
            card={cardsA[9 + indx] !== "1" ? cardsA[indx + 9] : ""}
          />
          <HandleCards2
            card={cardsA[18 + indx] !== "1" ? cardsA[indx + 18] : ""}
          />
        </div>
        <div
          className={player.gstatus === "0" ? "suspended" : ""}
          style={{
            width: "60%",
            backgroundColor: "#72bbef",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className="teenPatti-table-item"
            style={{ width: "50%" }}
            onClick={() => (player.gstatus === "0" ? null : handleBet(player))}
          >
            <span className="f12-b">{player.rate}</span>
            <span className={`f10-b ${"profit-loss-class"}`}>{0}</span>
          </div>
          <div
            className={`teenPatti-table-item ${
              //pairPlus.gstatus === "0" ? "suspended" :
              ""
            }`}
            style={{ width: "50%" }}
            onClick={() =>
              pairPlus.gstatus === "0" ? null : handleBet(pairPlus)
            }
          >
            <span className="f12-b">{pairPlus.nat}</span>
            <span className={`f10-b ${"profit-loss-class"}`}>{0}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div style={{ height: "400px", marginBottom: ".30px" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    OPEN TEENPATTI
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
                  result={<TeenOpenResult data={cardsArray1} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            <div style={{}}>
              <div className="teenPatti-table-container">
                <div className="teenPatti-table-row" style={{ lineHeight: 2 }}>
                  <div
                    style={{ width: "40%", border: "0.1px solid #fff" }}
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
                      className="teenPatti-table-item f12-b"
                      style={{ width: "50%" }}
                    >
                      BACK
                    </div>
                    <div
                      className="teenPatti-table-item"
                      style={{ width: "50%" }}
                    ></div>
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
