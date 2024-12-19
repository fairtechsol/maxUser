import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Ratio, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import BetTableHeader from "../../commonComponent/betTableHeader";
// import "./style.scss";
import CustomModal from "../../commonComponent/modal";
import BetTable from "../../otherGameDetaills/betTable/index";
import PlacedBet from "../../gameDetails/desktop/placeBet";
import { MatchType } from "../../../utils/enum";
import { formatDate } from "../../../utils/dateUtils";
import MyBet from "../../gameDetails/desktop/myBet";
import LiveStreamComponent from "../../commonComponent/liveStreamComponent";
import { customSortOnName, getChannelId } from "../../../helpers";
import Tournament from "../../gameDetails/tournament";
import MatchOdd from "../../gameDetails/matchOdd";
import Bookmaker from "../../gameDetails/bookmaker";
import ManualMarket from "../../gameDetails/manulMarkets";
import HtFt from "../htft";
import { IoInformationCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import NewLoader from "../../commonComponent/newLoader";
// import service from "../../../service";
import { liveStreamPageUrl, scoreBoardUrlMain } from "../../../utils/constants";
// import Iframe from "../../iframe/iframe";

const FootballDesktopGameDetail = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showContactAdmin, setShowContactAdmin] = useState(false);
  const [showScoreboard, setShowScoreboard] = useState<boolean>(false);
  const [_, setChannelId] = useState<string>("");
  // const [liveScoreBoardData, setLiveScoreBoardData] = useState(null);
  // const [errorCount, setErrorCount] = useState<number>(0);

  const { otherMatchDetails, loading } = useSelector(
    (state: RootState) => state.otherGames.matchDetail
  );

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

  useEffect(() => {
    try {
      if (otherMatchDetails?.eventId) {
        const callApiForLiveStream = async () => {
          let result = await getChannelId(otherMatchDetails?.eventId);
          if (result) {
            setChannelId(result?.channelNo);
          }
        };
        callApiForLiveStream();
      }
    } catch (error) {
      console.log(error);
    }
  }, [otherMatchDetails?.id]);
  // useEffect(() => {
  //   if (otherMatchDetails?.eventId) {
  //     let intervalTime = 5000;
  //     if (errorCount >= 5 && errorCount < 10) {
  //       intervalTime = 60000;
  //     } else if (errorCount >= 10) {
  //       intervalTime = 600000;
  //     }
  //     const interval = setInterval(() => {
  //       getScoreBoard(otherMatchDetails?.eventId);
  //     }, intervalTime);

  //     return () => {
  //       clearInterval(interval);
  //       setLiveScoreBoardData(null);
  //     };
  //   }
  // }, [otherMatchDetails?.id, otherMatchDetails?.eventId, errorCount]);

  // const getScoreBoard = async (eventId: string) => {
  //   try {
  //     const response: any = await service.get(
  //       // `https://fairscore7.com/score/getMatchScore/${marketId}`
  //       // `https://dpmatka.in/dcasino/score.php?matchId=${marketId}`
  //       //`https://devscore.fairgame.club/score/getMatchScore/${marketId}`
  //       `https://dpmatka.in/sr.php?eventid=${eventId}&sportid=${
  //         otherMatchDetails?.matchType === "football" ? "2" : "1"
  //       }`
  //     );
  //     // {"success":false,"msg":"Not found"}
  //     //console.log("response 11:", response);
  //     if (response?.success !== false) {
  //       setLiveScoreBoardData(response?.data);
  //       setErrorCount(0);
  //     }
  //   } catch (e: any) {
  //     console.log("Error:", e?.message);
  //     setLiveScoreBoardData(null);
  //     setErrorCount((prevCount: number) => prevCount + 1);
  //   }
  // };
  return (
    <Container fluid className="mt-1 pe-0 ps-1">
      <Row>
        <Col md={8}>
          {!loading ? (
            <Container className="p-0">
              <>
                <Col md={12}>
                  <BetTableHeader
                    customClass="py-1"
                    title={otherMatchDetails?.title}
                    setShowScoreboard={setShowScoreboard}
                    rightComponent={
                      <span className="title-16 fbold text-white">
                        {/* {formatDate(otherMatchDetails?.startAt)} */}
                        {otherMatchDetails?.startAt &&
                          formatDate(otherMatchDetails?.startAt)}
                      </span>
                    }
                  />
                </Col>
                {/* {liveScoreBoardData && (
                  <Iframe data={liveScoreBoardData} width="100%" />
                )} */}
                {showScoreboard && (
                  <div
                    style={{
                      height: "250px",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      position: "relative",
                      marginLeft: "4px",
                      marginRight: "4px",
                      width: "calc(100%-8px)",
                    }}
                  >
                    <iframe
                      style={{
                        height: "100%",
                        position: "absolute",
                        width: "100%",
                        left: 0,
                        top: 0,
                      }}
                      src={`${scoreBoardUrlMain}${
                        otherMatchDetails?.eventId
                      }&sportid=${
                        otherMatchDetails?.matchType === "football" ? "1" : "2"
                      }`}
                      title="Live Stream"
                      referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                  </div>
                )}
                {otherMatchDetails?.matchOdd?.activeStatus === "live" &&
                  otherMatchDetails?.matchOdd?.isActive && (
                    <Col md={12} style={{ marginTop: "8px" }}>
                      {otherMatchDetails?.matchOdd?.runners?.[0]?.ex
                        ?.availableToBack?.length > 2 ? (
                        <MatchOdd
                          title={otherMatchDetails?.matchOdd?.name}
                          data={otherMatchDetails?.matchOdd}
                          detail={otherMatchDetails}
                        />
                      ) : (
                        <Bookmaker
                          title={otherMatchDetails?.matchOdd?.name}
                          box={2}
                          data={otherMatchDetails?.matchOdd}
                          detail={otherMatchDetails}
                        />
                      )}
                    </Col>
                  )}

                {otherMatchDetails?.bookmaker?.activeStatus === "live" &&
                  otherMatchDetails?.bookmaker?.isActive && (
                    <Col md={12} style={{ marginTop: "8px" }}>
                      <Bookmaker
                        title={otherMatchDetails?.bookmaker?.name}
                        box={
                          otherMatchDetails?.bookmaker?.runners?.[0]?.ex
                            ?.availableToBack?.length > 2
                            ? 6
                            : 2
                        }
                        data={otherMatchDetails?.bookmaker}
                        detail={otherMatchDetails}
                        // data={matchDetails?.matchOdd}
                      />
                    </Col>
                  )}
                {otherMatchDetails?.bookmaker2?.activeStatus === "live" &&
                  otherMatchDetails?.bookmaker2?.isActive && (
                    <Col md={12} style={{ marginTop: "8px" }}>
                      <Bookmaker
                        title={otherMatchDetails?.bookmaker2?.name}
                        box={
                          otherMatchDetails?.bookmaker2?.runners?.[0]?.ex
                            ?.availableToBack?.length > 2
                            ? 6
                            : 2
                        }
                        data={otherMatchDetails?.bookmaker2}
                        detail={otherMatchDetails}
                        // data={matchDetails?.matchOdd}
                      />
                    </Col>
                  )}
                {otherMatchDetails?.quickBookmaker?.length > 0 &&
                  otherMatchDetails?.quickBookmaker
                    ?.filter(
                      (item: any) =>
                        item?.activeStatus === "live" && item?.isActive
                    )
                    ?.map((item: any) => (
                      <div key={item?.id}>
                        <Col md={12} style={{ marginTop: "8px" }}>
                          <ManualMarket
                            title={item?.name}
                            data={item}
                            detail={otherMatchDetails}
                          />
                        </Col>
                      </div>
                    ))}
                {otherMatchDetails?.tournament?.length > 0 &&
                  otherMatchDetails?.tournament?.map(
                    (item: any, index: number) => (
                      <div key={index}>
                        {item?.activeStatus === "live" &&
                          item?.isActive &&
                          (item?.name === "HT/FT" ? (
                            <Col md={12} style={{ marginTop: "8px" }}>
                              <HtFt
                                title={item?.name}
                                box={
                                  item?.runners?.[0]?.ex?.availableToBack
                                    ?.length > 2
                                    ? 6
                                    : 2
                                }
                                data={item}
                                detail={otherMatchDetails}
                                // data={otherMatchDetails?.matchOdd}
                              />
                            </Col>
                          ) : (
                            <Col md={12} style={{ marginTop: "8px" }}>
                              <Tournament
                                title={item?.name}
                                box={
                                  item?.runners?.[0]?.ex?.availableToBack
                                    ?.length > 2
                                    ? 6
                                    : 2
                                }
                                data={item}
                                detail={otherMatchDetails}
                                // data={otherMatchDetails?.matchOdd}
                              />
                            </Col>
                          ))}
                      </div>
                    )
                  )}
                {otherMatchDetails?.setWinner?.length > 0 &&
                  otherMatchDetails?.setWinner
                    ?.filter((item: any) => item?.isActive)
                    ?.slice()
                    ?.sort(customSortOnName)
                    ?.map((item: any) => (
                      <div key={item?.id}>
                        <Col md={12}>
                          <BetTable
                            title={item?.name}
                            type={MatchType.SET_WINNER}
                            data={item}
                          />
                        </Col>
                      </div>
                    ))}
                {otherMatchDetails?.firstHalfGoal?.length > 0 &&
                  otherMatchDetails?.firstHalfGoal
                    ?.filter((item: any) => item?.isActive)
                    ?.slice()
                    ?.sort(customSortOnName)
                    ?.map((item: any) => (
                      <div key={item?.id}>
                        <Col md={12}>
                          <BetTable
                            title={item?.name}
                            type={MatchType.FIRST_HALF_GOAL}
                            data={item}
                          />
                        </Col>
                      </div>
                    ))}

                {otherMatchDetails?.halfTime?.isActive && (
                  <Col md={12}>
                    <BetTable
                      title={otherMatchDetails?.halfTime?.name}
                      type={MatchType.HALF_TIME}
                      data={otherMatchDetails?.halfTime}
                    />
                  </Col>
                )}

                {otherMatchDetails?.overUnder?.length > 0 &&
                  otherMatchDetails?.overUnder
                    ?.filter((item: any) => item?.isActive)
                    ?.slice()
                    ?.sort(customSortOnName)
                    ?.map((item: any) => (
                      <div key={item?.id}>
                        <Col md={12}>
                          <BetTable
                            title={item?.name}
                            type={MatchType.UNDER_OVER}
                            data={item}
                          />
                        </Col>
                      </div>
                    ))}
              </>
            </Container>
          ) : (
            <div
              className="w-100 d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <NewLoader />
            </div>
          )}
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
              <Col md={12}>
                <div
                  //onClick={() => setShowContactAdmin(true)}
                  style={{
                    display: "flex",
                    margin: "10px 0",
                    marginBottom: "0",
                    alignItems: "center",
                  }}
                  className="fs-4"
                >
                  <IoInformationCircle />
                  <h6
                    style={{ margin: "0px 0px 0px 5px", color: "#ff0000" }}
                    className="fs-5 text-decoration-underline cursor-pointer blinking-text"
                  >
                    <Link className="text-danger" to={"/ballbyball"}>
                      {" "}
                      Ball By Ball
                    </Link>
                  </h6>
                </div>
              </Col>
              {otherMatchDetails?.eventId && (
                <Col md={12} className="px-1 pt-1">
                  <LiveStreamComponent
                    url={`${liveStreamPageUrl}${
                      otherMatchDetails?.eventId
                    }&sportid=${
                      otherMatchDetails?.matchType === "football" ? "1" : "2"
                    }`}
                  />
                </Col>
              )}
              <Col md={12} className="px-1 pt-1">
                <PlacedBet />
              </Col>
              <Col md={12} className="px-1 pt-1">
                <MyBet />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <CustomModal
        customClass="modalFull-90 rule-popup"
        title={""}
        show={showContactAdmin}
        setShow={setShowContactAdmin}
      >
        <Container className="under-development-container">
          <Row className="mt-5">
            <Col md={{ span: 6, offset: 3 }} className="text-center">
              <h5>Contact Admin</h5>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => setShowContactAdmin(false)}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Container>
      </CustomModal>
    </Container>
  );
};

export default FootballDesktopGameDetail;
