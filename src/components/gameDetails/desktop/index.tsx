import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { IoInformationCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getChannelId } from "../../../helpers";
import service from "../../../service";
import { RootState } from "../../../store/store";
import { Constants, liveStreamCricketPageUrl } from "../../../utils/constants";
import { formatDate } from "../../../utils/dateUtils";
import { MatchType } from "../../../utils/enum";
import BetTableHeader from "../../commonComponent/betTableHeader";
import LiveStreamComponent from "../../commonComponent/liveStreamComponent";
import CustomModal from "../../commonComponent/modal";
import Bookmaker from "../bookmaker";
import ManualMarket from "../manulMarkets";
import MatchOdd from "../matchOdd";
import OtherMarket from "../otherMarket";
import SessionCricketCasino from "../sessionCricketCasino";
import SessionFancy from "../sessionFancy";
import SessionNormal from "../sessionNormal";
import SessionOddEven from "../sessionOddEven";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";
import { Link } from "react-router-dom";
import Iframe from "../../iframe/iframe";
import Tournament from "../tournament";
import NewLoader from "../../commonComponent/newLoader";
import SessionKhado from "../sessionKhado";

const DesktopGameDetail = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showContactAdmin, setShowContactAdmin] = useState(false);
  const [liveScoreBoardData, setLiveScoreBoardData] = useState(null);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [channelId, setChannelId] = useState<string>("");

  // const [scoreData, setScoreData] = useState<any>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  const { matchDetails, marketId, loading } = useSelector(
    (state: RootState) => state.match.matchList
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

  const getScoreBoard = async (eventId: string) => {
    try {
      const response: any = await service.get(
        // `https://fairscore7.com/score/getMatchScore/${marketId}`
        // `https://dpmatka.in/dcasino/score.php?matchId=${marketId}`
        //`https://devscore.fairgame.club/score/getMatchScore/${marketId}`
        `${Constants.thirdPartyLive}/cricketScore?eventId=${eventId}`
      );
      // {"success":false,"msg":"Not found"}
      //console.log("response 11:", response);
      if (response?.success !== false) {
        setLiveScoreBoardData(response?.data);
        setErrorCount(0);
      }
    } catch (e: any) {
      console.log("Error:", e?.message);
      setLiveScoreBoardData(null);
      setErrorCount((prevCount: number) => prevCount + 1);
    }
  };

  useEffect(() => {
    if (matchDetails?.marketId === marketId) {
      let intervalTime = 5000;
      if (errorCount >= 5 && errorCount < 10) {
        intervalTime = 60000;
      } else if (errorCount >= 10) {
        intervalTime = 600000;
      }
      const interval = setInterval(() => {
        getScoreBoard(matchDetails?.eventId);
      }, intervalTime);

      return () => {
        clearInterval(interval);
        setLiveScoreBoardData(null);
      };
    }
  }, [matchDetails?.id, matchDetails?.eventId, errorCount, marketId]);

  useEffect(() => {
    try {
      if (matchDetails?.eventId) {
        const callApiForLiveStream = async () => {
          let result = await getChannelId(matchDetails?.eventId);
          if (result) {
            setChannelId(result?.channelNo);
          }
        };
        callApiForLiveStream();
      }
    } catch (error) {
      console.log(error);
    }
  }, [matchDetails?.id]);
  const normalizedData = matchDetails?.sessionBettings?.map((item: any) =>
    JSON.parse(item)
  );
  const manualEntries = matchDetails?.manualSessionActive
    ? normalizedData?.filter((item: any) => item?.isManual)
    : [];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       //console.log("fetch",matchDetails?.eventId)
  //       const response = await fetch(
  //         `http://172.105.54.97:8085/api/new/GetCricketScoreDiamoand?eventid=${1809072133}`
  //       );

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const result = await response.json();
  //       setScoreData(result);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [matchDetails]);
  return (
    <Container fluid className="pe-0 ps-1">
      <Row className="p-0">
        <Col md={8}>
          {!loading ? (
            <Container className="p-0">
              <>
                <Col md={12} className="p-0">
                  <BetTableHeader
                    customClass="mt-1 py-1 "
                    title={matchDetails?.title}
                    rightComponent={
                      <span className="title-16 fbold text-white">
                        {matchDetails?.startAt &&
                          formatDate(matchDetails?.startAt)}
                      </span>
                    }
                  />
                  {/* <div
                  style={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: "#000",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: liveScoreBoardData ? liveScoreBoardData : "",
                  }}
                ></div> */}
                </Col>
                {liveScoreBoardData && (
                  <Iframe data={liveScoreBoardData} width="100%" />
                )}
                {matchDetails?.matchOdd?.activeStatus === "live" &&
                  matchDetails?.matchOdd?.isActive && (
                    <Col md={12} style={{ marginTop: "8px" }}>
                      <MatchOdd
                        title={matchDetails?.matchOdd?.name}
                        data={matchDetails?.matchOdd}
                        detail={matchDetails}
                      />
                    </Col>
                  )}
                {matchDetails?.bookmaker?.activeStatus === "live" &&
                  matchDetails?.bookmaker?.isActive && (
                    <Col md={12} style={{ marginTop: "8px" }}>
                      <Bookmaker
                        title={matchDetails?.bookmaker?.name}
                        box={
                          matchDetails?.bookmaker?.runners?.[0]?.ex
                            ?.availableToBack?.length > 2
                            ? 6
                            : 2
                        }
                        data={matchDetails?.bookmaker}
                        detail={matchDetails}
                        // data={matchDetails?.matchOdd}
                      />
                    </Col>
                  )}
                {matchDetails?.other?.length > 0 &&
                  matchDetails?.other?.map((item: any, index: number) => (
                    <div key={index}>
                      {item?.activeStatus === "live" && item?.isActive && (
                        <Col md={12} style={{ marginTop: "8px" }}>
                          <OtherMarket
                            title={item?.name}
                            box={
                              item?.runners?.[0]?.ex?.availableToBack?.length >
                              2
                                ? 6
                                : 2
                            }
                            data={item}
                            detail={matchDetails}
                            // data={matchDetails?.matchOdd}
                          />
                        </Col>
                      )}
                    </div>
                  ))}
                {matchDetails?.tournament?.length > 0 &&
                  matchDetails?.tournament?.map((item: any, index: number) => (
                    <div key={index}>
                      {item?.activeStatus === "live" && item?.isActive && (
                        <Col md={12} style={{ marginTop: "8px" }}>
                          <Tournament
                            title={item?.name}
                            box={
                              item?.runners?.[0]?.ex?.availableToBack?.length >
                              2
                                ? 6
                                : 2
                            }
                            data={item}
                            detail={matchDetails}
                            // data={matchDetails?.matchOdd}
                          />
                        </Col>
                      )}
                    </div>
                  ))}
                {matchDetails?.bookmaker2?.activeStatus === "live" &&
                  matchDetails?.bookmaker2?.isActive && (
                    <Col md={12} style={{ marginTop: "8px" }}>
                      <Bookmaker
                        title={matchDetails?.bookmaker2?.name}
                        box={
                          matchDetails?.bookmaker2?.runners?.[0]?.ex
                            ?.availableToBack?.length > 2
                            ? 6
                            : 2
                        }
                        data={matchDetails?.bookmaker2}
                        detail={matchDetails}
                        // type={MatchType.MATCH_ODDS}
                        // data={matchDetails?.matchOdd}
                      />
                    </Col>
                  )}
                {matchDetails?.quickBookmaker?.length > 0 &&
                  matchDetails?.quickBookmaker?.map(
                    (item: any, index: number) => (
                      <div key={index}>
                        {item?.activeStatus === "live" && item?.isActive && (
                          <Col md={12}>
                            <ManualMarket
                              title={item?.name}
                              data={item}
                              detail={matchDetails}
                              // data={matchDetails?.matchOdd}
                            />
                          </Col>
                        )}
                      </div>
                    )
                  )}
                {matchDetails?.apiTideMatch2?.activeStatus === "live" &&
                  matchDetails?.apiTideMatch2?.isActive && (
                    <Col md={12} style={{ marginTop: "8px" }}>
                      <OtherMarket
                        title={matchDetails?.apiTideMatch2?.name}
                        box={
                          matchDetails?.apiTideMatch2?.runners?.[0]?.ex
                            ?.availableToBack?.length > 2
                            ? 6
                            : 2
                        }
                        data={matchDetails?.apiTideMatch2}
                        detail={matchDetails}
                        // type={MatchType.MATCH_ODDS}
                        // data={matchDetails?.matchOdd}
                      />
                    </Col>
                  )}
                {((matchDetails?.manualTiedMatch?.activeStatus === "live" &&
                  matchDetails?.manualTiedMatch?.isActive) ||
                  (matchDetails?.manualTideMatch?.activeStatus === "live" &&
                    matchDetails?.manualTideMatch?.isActive)) && (
                  <Col md={12}>
                    <ManualMarket
                      title={
                        matchDetails?.manualTiedMatch?.name ||
                        matchDetails?.manualTideMatch?.name
                      }
                      data={
                        matchDetails?.manualTiedMatch ||
                        matchDetails?.manualTideMatch
                      }
                      detail={matchDetails}
                      // data={matchDetails?.matchOdd}
                    />
                  </Col>
                )}
                {matchDetails?.marketCompleteMatch1?.activeStatus === "live" &&
                  matchDetails?.marketCompleteMatch1?.isActive && (
                    <Col md={12}>
                      <OtherMarket
                        title={matchDetails?.marketCompleteMatch1?.name}
                        box={
                          matchDetails?.marketCompleteMatch1?.runners?.[0]?.ex
                            ?.availableToBack?.length > 2
                            ? 6
                            : 2
                        }
                        data={matchDetails?.marketCompleteMatch1}
                        detail={matchDetails}
                      />
                    </Col>
                  )}
                {matchDetails?.manualCompleteMatch?.activeStatus === "live" &&
                  matchDetails?.manualCompleteMatch?.isActive && (
                    <Col md={12}>
                      <ManualMarket
                        title={matchDetails?.manualCompleteMatch?.name}
                        data={matchDetails?.manualCompleteMatch}
                        detail={matchDetails}
                        // data={matchDetails?.matchOdd}
                      />
                    </Col>
                  )}
                {(matchDetails?.apiSession?.session?.section?.length > 0 ||
                  manualEntries?.length > 0) && (
                  <Col md={12}>
                    <SessionNormal
                      title={"Normal"}
                      mtype={"session"}
                      data={matchDetails?.apiSession?.session}
                      detail={matchDetails}
                      manual={manualEntries ? manualEntries : []}
                    />
                  </Col>
                )}
                {matchDetails?.apiSession?.overByover?.section?.length > 0 && (
                  <Col md={12}>
                    <SessionNormal
                      title={"overByover"}
                      mtype={"overByover"}
                      data={matchDetails?.apiSession?.overByover}
                      detail={matchDetails}
                    />
                  </Col>
                )}
                {matchDetails?.apiSession?.ballByBall?.section?.length > 0 && (
                  <Col md={12}>
                    <SessionNormal
                      title={"Ballbyball"}
                      mtype={"ballByBall"}
                      data={matchDetails?.apiSession?.ballByBall}
                      detail={matchDetails}
                    />
                  </Col>
                )}
                {matchDetails?.apiSession?.fancy1?.section?.length > 0 && (
                  <Col md={12}>
                    <SessionFancy
                      title={"fancy1"}
                      data={matchDetails?.apiSession?.fancy1}
                      detail={matchDetails}
                      // data={matchDetails?.matchOdd}
                    />
                  </Col>
                )}{" "}
                {matchDetails?.apiSession?.khado?.section?.length > 0 && (
                  <Col md={12}>
                    <SessionKhado
                      title={"khado"}
                      data={matchDetails?.apiSession?.khado}
                      detail={matchDetails}
                    />
                  </Col>
                )}
                {matchDetails?.apiSession?.meter?.section?.length > 0 && (
                  <Col md={12}>
                    <SessionNormal
                      title={"meter"}
                      mtype={"meter"}
                      data={matchDetails?.apiSession?.meter}
                      detail={matchDetails}
                    />
                  </Col>
                )}
                {matchDetails?.apiSession?.oddEven?.section?.length > 0 && (
                  <Col md={12}>
                    <SessionOddEven
                      title={"oddeven"}
                      // type={"fancy"}
                      data={matchDetails?.apiSession?.oddEven}
                      detail={matchDetails}
                      // data={matchDetails?.matchOdd}
                    />
                  </Col>
                )}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "1%",
                  }}
                >
                  {matchDetails?.apiSession?.cricketCasino?.section?.length >
                    0 &&
                    matchDetails?.apiSession?.cricketCasino?.section?.map(
                      (item: any, index: number) => {
                        let length =
                          matchDetails?.apiSession?.cricketCasino?.section
                            ?.length;
                        return (
                          <div
                            key={index}
                            style={{
                              width:
                                length % 2 === 0
                                  ? "49.5%"
                                  : index === length - 1
                                  ? "100%"
                                  : "49.5%",
                            }}
                          >
                            {item?.activeStatus === "live" && (
                              <Col md={12}>
                                <SessionCricketCasino
                                  title={item?.RunnerName}
                                  data={item}
                                  detail={matchDetails}
                                />
                              </Col>
                            )}
                          </div>
                        );
                      }
                    )}
                </div>
                {matchDetails?.apiTideMatch?.activeStatus === "live" &&
                  matchDetails?.apiTideMatch?.isActive && (
                    <Col md={12}>
                      <OtherMarket
                        title={matchDetails?.apiTideMatch?.name}
                        box={
                          matchDetails?.apiTideMatch?.runners?.[0]?.ex
                            ?.availableToBack?.length > 2
                            ? 6
                            : 2
                        }
                        data={matchDetails?.apiTideMatch}
                        detail={matchDetails}
                        // data={matchDetails?.matchOdd}
                      />
                    </Col>
                  )}
                {matchDetails?.marketCompleteMatch?.activeStatus === "live" &&
                  matchDetails?.marketCompleteMatch?.isActive && (
                    <Col md={12}>
                      <OtherMarket
                        title={matchDetails?.marketCompleteMatch?.name}
                        box={
                          matchDetails?.marketCompleteMatch?.runners?.[0]?.ex
                            ?.availableToBack?.length > 2
                            ? 6
                            : 2
                        }
                        data={matchDetails?.marketCompleteMatch}
                        detail={matchDetails}
                        // data={matchDetails?.matchOdd}
                      />
                    </Col>
                  )}
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
        <Col md={4} className="p-0 sideBet-W">
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
                  // onClick={() => setShowContactAdmin(true)}
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
                    style={{ margin: "0 0 0 5px", color: "#ff0000" }}
                    className="fs-5 text-decoration-underline cursor-pointer blinking-text"
                  >
                    <Link className="text-danger" to={"/ballbyball"}>
                      {" "}
                      Ball By Ball
                    </Link>
                  </h6>
                </div>
              </Col>
              {matchDetails?.eventId &&
                matchDetails?.matchType !== "politics" && (
                  <Col md={12} className="px-1 pt-1">
                    <LiveStreamComponent
                      url={`${liveStreamCricketPageUrl}${matchDetails?.eventId}`}
                    />
                  </Col>
                )}
              <Col md={12} className="px-1 pt-1">
                <PlacedBet />
              </Col>
              <Col md={12} className="px-1 pt-1 ">
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
                className="mt-3 mb-3"
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

export default DesktopGameDetail;
