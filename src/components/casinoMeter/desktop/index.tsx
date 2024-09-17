import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { tprules, warrules } from "../../../assets/images";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { cardGamesId, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import "./style.scss";
import CasinoWarResult from "./teenCard";
import { HandleCards } from "../../commonComponent/cardsComponent";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";
import LowCards from "./Low";
import HighCards from "./High";
import Meter from "./meter";
const CasinoMeterDesktop = () => {
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

  const { placedBets } = useSelector((state: RootState) => state.bets);
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

  // const rules = [
  //   { label: "Pair (Double)", value: "1 To 1" },
  //   { label: "Flush (Color)", value: "1 To 4" },
  //   { label: "Straight (Rown)", value: "1 To 6" },
  //   { label: "Trio (Teen)", value: "1 To 35" },
  //   { label: "Straight Flush (Pakki Rown)", value: "1 To 45" },
  // ];
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.cmeter}`);
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

  console.log(dragonTigerDetail, "place", placedBets);
  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div style={{ marginBottom: ".30px" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    CASINO METER
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
                    ""
                  }
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <LoaderOnRefresh />
            ) : (
              <div>
                {dragonTigerDetail?.videoInfo?.cards?.split(",")[0] !== "1" && (
                  <Meter
                    data={dragonTigerDetail?.videoInfo?.cards}
                    runPosition={
                      dragonTigerDetail?.videoInfo?.mid ==
                      placedBets?.[0]?.runnerId
                        ? placedBets?.[0]?.teamName == "Low"
                          ? "Low"
                          : "High"
                        : ""
                    }
                  />
                )}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    gap: "10px",
                    paddingTop: "10px",
                  }}
                >
                  <LowCards
                    odds={dragonTigerDetail.low}
                    data={dragonTigerDetail}
                    placedLow={
                      dragonTigerDetail?.videoInfo?.mid ==
                      placedBets?.[0]?.runnerId
                        ? placedBets?.[0]?.teamName == "Low"
                          ? true
                          : false
                        : true
                    }
                  />
                  <HighCards
                    odds={dragonTigerDetail.high}
                    data={dragonTigerDetail}
                    placedHigh={
                      dragonTigerDetail?.videoInfo?.mid ==
                      placedBets?.[0]?.runnerId
                        ? placedBets?.[0]?.teamName == "High"
                          ? true
                          : false
                        : true
                    }
                  />
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["H","L"]}
                    type={"cmeter"}
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

export default CasinoMeterDesktop;
