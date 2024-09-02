import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { formatDate } from "../../../utils/dateUtils";
import { MatchType } from "../../../utils/enum";
import BetTableHeader from "../../commonComponent/betTableHeader";
import BetTable from "../betTable";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";
import { IoInformationCircle } from "react-icons/io5";
import CustomModal from "../../commonComponent/modal";
import service from "../../../service";
import LiveStreamComponent from "../../commonComponent/liveStreamComponent";
import { getChannelId } from "../../../helpers";
import MatchOdd from "../matchOdd";
import Bookmaker from "../bookmaker";
import ManualMarket from "../manulMarkets";
import DynamicMarket from "../dynamicMarkets";
import SessionNormal from "../sessionNormal";
import SessionOddEven from "../sessionFancy";
import SessionFancy from "../sessionFancy";

const DesktopGameDetail = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showContactAdmin, setShowContactAdmin] = useState(false);
  const [liveScoreBoardData, setLiveScoreBoardData] = useState(null);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [channelId, setChannelId] = useState<string>("");

  const { matchDetails, marketId } = useSelector(
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

  const getScoreBoard = async (marketId: string) => {
    try {
      const response: any = await service.get(
        // `https://fairscore7.com/score/getMatchScore/${marketId}`
        `https://devscore.fairgame.club/score/getMatchScore/${marketId}`
      );
      if (response) {
        setLiveScoreBoardData(response);
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
      let intervalTime = 500;
      if (errorCount >= 5 && errorCount < 10) {
        intervalTime = 60000;
      } else if (errorCount >= 10) {
        intervalTime = 600000;
      }
      const interval = setInterval(() => {
        getScoreBoard(matchDetails?.marketId);
      }, intervalTime);

      return () => {
        clearInterval(interval);
        setLiveScoreBoardData(null);
      };
    }
  }, [matchDetails?.id, errorCount, marketId]);

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
console.log('first',matchDetails)
  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <Container fluid className="p-0">
            <Row>
              <Col md={12}>
                <BetTableHeader
                  customClass="mt-2 py-2"
                  title={matchDetails?.title}
                  rightComponent={
                    <span className="title-16 f400">
                      {matchDetails?.startAt &&
                        formatDate(matchDetails?.startAt)}
                    </span>
                  }
                />
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: "#000",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: liveScoreBoardData ? liveScoreBoardData : "",
                  }}
                ></div>
              </Col>
              {matchDetails?.matchOdd?.isActive && (
                <Col md={12} style={{ marginTop: "10px" }}>
                  <MatchOdd
                    title={"Match_odd"}
                    data={matchDetails?.matchOdd}
                    detail={matchDetails}
                  />
                </Col>
              )}

              {matchDetails?.bookmaker?.isActive && (
                <Col md={12} style={{ marginTop: "10px" }}>
                  <Bookmaker
                    title={matchDetails?.bookmaker?.name}
                    box={6}
                    data={matchDetails?.bookmaker}
                    detail={matchDetails}
                    // data={matchDetails?.matchOdd}
                  />
                </Col>
              )}

              {matchDetails?.bookmaker2?.isActive && (
                <Col md={12} style={{ marginTop: "10px" }}>
                  <Bookmaker
                    title={matchDetails?.bookmaker2?.name}
                    box={2}
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
                      {item?.isActive && (
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
              {matchDetails?.apiTideMatch?.isActive && (
                <Col md={12}>
                  <DynamicMarket
                    title={matchDetails?.apiTideMatch?.name}
                    data={matchDetails?.apiTideMatch}
                    detail={matchDetails}
                  />
                </Col>
              )}
              {matchDetails?.manualTiedMatch?.isActive && (
                <Col md={12}>
                  <ManualMarket
                    title={matchDetails?.manualTiedMatch?.name}
                    data={matchDetails?.manualTiedMatch}
                    detail={matchDetails}
                    // data={matchDetails?.matchOdd}
                  />
                </Col>
              )}
              {matchDetails?.marketCompleteMatch?.isActive && (
                <Col md={12}>
                  <DynamicMarket
                    title={matchDetails?.marketCompleteMatch?.name}
                    data={matchDetails?.marketCompleteMatch}
                    detail={matchDetails}
                  />
                </Col>
              )}
              {matchDetails?.manualCompleteMatch?.isActive && (
                <Col md={12}>
                  <ManualMarket
                    title={matchDetails?.manualCompleteMatch?.name}
                    data={matchDetails?.manualCompleteMatch}
                    detail={matchDetails}
                    // data={matchDetails?.matchOdd}
                  />
                </Col>
              )}
              {matchDetails?.apiSession?.session?.section?.length>0  &&
               
                        <Col md={12}>
                          <SessionNormal
                            title={"Normal"}
                            // type={"normal"}
                            data={matchDetails?.apiSession?.session}
                            detail={matchDetails}
                          />
                        </Col>
                     }
             {matchDetails?.apiSession?.overByover?.section?.length>0  &&
               
               <Col md={12}>
                 <SessionNormal
                   title={"overByover"}
                   // type={"normal"}
                   data={matchDetails?.apiSession?.overByover}
                   detail={matchDetails}
                 />
               </Col>
            } {matchDetails?.apiSession?.ballByBall?.section?.length>0  &&
               
              <Col md={12}>
                <SessionNormal
                  title={"Ballbyball"}
                  // type={"normal"}
                  data={matchDetails?.apiSession?.ballByBall}
                  detail={matchDetails}
                />
              </Col>
           }
               {matchDetails?.apiSession?.oddEven?.section?.length>0  &&
              <Col md={12}>
                <SessionNormal
                  title={"oddeven"}
                  // type={"fancy"}
                  data={matchDetails?.apiSession?.oddEven}
                  detail={matchDetails}
                  // data={matchDetails?.matchOdd}
                />
              </Col> }
              {matchDetails?.apiSession?.fancy1?.section?.length>0  &&
              <Col md={12}>
                <SessionFancy
                  title={"fancy1"}
                  data={matchDetails?.apiSession?.fancy1}
                  detail={matchDetails}
                  // data={matchDetails?.matchOdd}
                />
              </Col>
              }

              {/* {matchDetails?.matchOdd?.isActive && (
                <Col md={12}>
                  <BetTable
                    title={matchDetails?.matchOdd?.name}
                    type={MatchType.MATCH_ODDS}
                    data={matchDetails?.matchOdd}
                  />
                </Col>
              )}

              {matchDetails?.bookmaker?.isActive && (
                <Col md={12}>
                  <BetTable
                    title={matchDetails?.bookmaker?.name}
                    type={MatchType.MATCH_ODDS}
                    data={matchDetails?.bookmaker}
                  />
                </Col>
              )}

              {matchDetails?.quickBookmaker?.length > 0 &&
                matchDetails?.quickBookmaker?.map(
                  (item: any, index: number) => (
                    <div key={index}>
                      {item?.isActive && (
                        <Col md={12}>
                          <BetTable
                            title={item?.name}
                            type={MatchType.BOOKMAKER}
                            data={item}
                          />
                        </Col>
                      )}
                    </div>
                  )
                )} */}
              {matchDetails?.firstHalfGoal?.length > 0 &&
                matchDetails?.firstHalfGoal?.map((item: any, index: number) => (
                  <div key={index}>
                    {item?.isActive && (
                      <Col md={12}>
                        <BetTable
                          title={item?.name}
                          type={MatchType.MATCH_ODDS}
                          data={item}
                        />
                      </Col>
                    )}
                  </div>
                ))}

              {matchDetails?.halfTime?.isActive && (
                <Col md={12}>
                  <BetTable
                    title={matchDetails?.halfTime?.name}
                    type={MatchType.MATCH_ODDS}
                    data={matchDetails?.halfTime}
                  />
                </Col>
              )}

              {matchDetails?.overUnder?.length > 0 &&
                matchDetails?.overUnder?.map((item: any, index: number) => (
                  <div key={index}>
                    {item?.isActive && (
                      <Col md={12}>
                        <BetTable
                          title={item?.name}
                          type={MatchType.MATCH_ODDS}
                          data={item}
                        />
                      </Col>
                    )}
                  </div>
                ))}
              {/* {matchDetails?.apiTideMatch?.isActive && (
                <Col md={12}>
                  <BetTable
                    title={matchDetails?.apiTideMatch?.name}
                    type={MatchType.MATCH_ODDS}
                    data={matchDetails?.apiTideMatch}
                  />
                </Col>
              )}
              {matchDetails?.manualTiedMatch?.isActive && (
                <Col md={12}>
                  <BetTable
                    title={matchDetails?.manualTiedMatch?.name}
                    type={MatchType.BOOKMAKER}
                    data={matchDetails?.manualTiedMatch}
                  />
                </Col>
              )}
              {matchDetails?.marketCompleteMatch?.isActive && (
                <Col md={12}>
                  <BetTable
                    title={matchDetails?.marketCompleteMatch?.name}
                    type={MatchType.MATCH_ODDS}
                    data={matchDetails?.marketCompleteMatch}
                  />
                </Col>
              )}
              {matchDetails?.manualCompleteMatch?.isActive && (
                <Col md={12}>
                  <BetTable
                    title={matchDetails?.manualCompleteMatch?.name}
                    type={MatchType.BOOKMAKER}
                    data={matchDetails?.manualCompleteMatch}
                  />
                </Col>
              )} */}
              {matchDetails?.apiSessionActive && (
                <Col
                  md={
                    window.innerWidth >= 768 && window.innerWidth <= 1021
                      ? 12
                      : 6
                  }
                >
                  <BetTable
                    title={"Session Market"}
                    type={MatchType.API_SESSION_MARKET}
                    data={matchDetails?.sessionBettings}
                  />
                </Col>
              )}
              {/* {matchDetails?.manualSessionActive && (
                <Col md={6}>
                  <BetTable
                    title={"Quick Session Market"}
                    type={MatchType.SESSION_MARKET}
                    data={matchDetails?.sessionBettings}
                  />
                </Col>
              )} */}

              {/* <Col md={12}>
                <CommonTabs
                  customClass="overflow-x-auto overflow-y-hidden no-wrap"
                  defaultActive="fancy"
                >
                  {[
                    {
                      id: "fancy",
                      name: "Fancy 1",
                    },
                    {
                      id: "meter",
                      name: "Meter",
                    },
                    {
                      id: "khado",
                      name: "Khado",
                    },
                    {
                      id: "oddEven",
                      name: "OdeEven",
                    },
                  ]?.map((item) => {
                    return (
                      <Tab
                        key={item?.id}
                        eventKey={item?.id}
                        tabClassName="m-match-list-tabs"
                        title={
                          <div className="title-12 text-uppercase f600">
                            <span>{item?.name}</span>
                          </div>
                        }
                      >
                        <Row>
                          {data?.session?.map((item: any, index: number) => (
                            <Col md={6} key={index}>
                              <BetTable
                                title={item?.title}
                                type={MatchType.SESSION_MARKET}
                                data={item?.data}
                              />
                            </Col>
                          ))}
                        </Row>
                      </Tab>
                    );
                  })}
                </CommonTabs>
              </Col> */}
            </Row>
          </Container>
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
                <div
                  onClick={() => setShowContactAdmin(true)}
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
                    Ball by Ball
                  </h6>
                </div>
              </Col>
              {channelId !== "0" && channelId !== "" && (
                <Col md={12}>
                  <LiveStreamComponent channelId={channelId} />
                </Col>
              )}
              <Col md={12}>
                <PlacedBet />
              </Col>
              <Col md={12}>
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
