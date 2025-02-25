import { memo, useEffect, useState } from "react";
import { Col, Container, Ratio, Row, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
// import { formatDate } from "../../../utils/dateUtils";
import moment from "moment";
import { FaTv } from "react-icons/fa";
import { liveStreamPageUrl } from "../../../utils/constants";
import { getTvData } from "../../../utils/tvUrlGet";
import BetTableHeader from "../../commonComponent/betTableHeader";
import NewLoader from "../../commonComponent/newLoader";
import CommonTabs from "../../commonComponent/tabs";
import Iframe from "../../iframe/iframe";
import Bookmaker from "../bookmaker";
import ManualMarket from "../manulMarkets";
import MatchOdd from "../matchOdd";
import OtherMarket from "../otherMarket";
import SessionCricketCasino from "../sessionCricketCasino";
import MobileSessionFancy from "../sessionFancy/mobileSessionFancy";
import MobileSessionKhado from "../sessionKhado/mobileSessionFancy";
import MobileSessionNormal from "../sessionNormal/mobileSessionNormal";
import MobileSessionOddEven from "../sessionOddEven/mobileSessionOddEven";
import Tournament from "../tournament";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";

const MobileGameDetail = () => {
  const [show, setShow] = useState(true);
  // const [liveScoreBoardData, setLiveScoreBoardData] = useState(null);
  // const [errorCount, setErrorCount] = useState<number>(0);
  // const [channelId, setChannelId] = useState<string>("");
  const [showVideo, setShowVideo] = useState(false);
  // const [currInterval, setCurrInterval] = useState<any>(null);
  const { matchDetails, liveScoreBoardData, loading } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { placedBets } = useSelector((state: RootState) => state.bets);
  const [tvData, setTvData] = useState<any>(null);

  useEffect(() => {
    if (matchDetails?.eventId) {
      getTvData(
        matchDetails?.eventId,
        setTvData,
        matchDetails?.matchType,
        true,
        true
      );
    }
  }, [matchDetails?.id]);

  const normalizedData = matchDetails?.sessionBettings?.map((item: any) =>
    JSON.parse(item)
  );
  const manualEntries = matchDetails?.manualSessionActive
    ? normalizedData?.filter((item: any) => item?.isManual)
    : [];

  return (
    <div>
      <PlacedBet show={show} setShow={setShow} />
      <BetTableHeader
        customClass=""
        customTextClass="title-12 fbold"
        title={matchDetails?.title}
        rightComponent={
          <span className="title-12 fbold text-white">
            {matchDetails?.startAt &&
              moment(matchDetails?.startAt).format("DD/MM/YYYY hh:mm:ss")}
          </span>
        }
        style={{ padding: "5px" }}
      />
      {/* {liveScoreBoardData && <Iframe data={liveScoreBoardData} />}  */}
      <CommonTabs defaultActive="odds" className="color">
        {[
          {
            id: "odds",
            name: <div className="oddstab border-end lh-sm pe-1">ODDS</div>,
          },
          {
            id: "matchedBet",
            name: (
              <div className="ps-5 border-end pe-2">{`MATCHED BET(${
                Array.from(new Set(placedBets))?.length
              })`}</div>
            ),
          },
          matchDetails?.eventId &&
            matchDetails?.matchType !== "politics" && {
              name: (
                <div
                  onClick={() => {
                    getTvData(
                      matchDetails?.eventId,
                      setTvData,
                      matchDetails?.matchType,
                      true
                    );
                    setShowVideo(!showVideo);
                  }}
                  className="ps-5"
                >
                  <FaTv size={15} />
                </div>
              ),
            },
        ]
          ?.filter(Boolean) // Remove null values from the array
          .map((item, index) => (
            <Tab
              key={item?.id}
              eventKey={item?.id}
              tabClassName="m-tab border-0"
              title={
                <div className="font rounded-0 lh-sm py-0 f600">
                  {item?.name}
                </div>
              }
            >
              {index == 0 ? (
                !loading ? (
                  <div style={{ width: "98%" }}>
                    <Row className="ms-0">
                      {/* Conditionally render the LiveStreamComponent if channelId is valid */}

                      {!sessionStorage.getItem("isDemo") &&
                        showVideo &&
                         (
                          <Container className="px-0">
                            <Row className="justify-content-md-center">
                              <Col md={12}>
                                <Ratio aspectRatio="16x9">
                                  <iframe
                                    src={
                                      import.meta.env.VITE_NODE_ENV ==
                                      "production"
                                        ? tvData?.tvData?.iframeUrl
                                        : `${liveStreamPageUrl}${matchDetails?.eventId}/${matchDetails?.matchType}`
                                    }
                                    title="Live Stream"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                  ></iframe>
                                </Ratio>
                              </Col>
                            </Row>
                          </Container>
                        )}
                      {liveScoreBoardData && (
                        <Iframe data={liveScoreBoardData} width="100%" />
                      )}
                      {matchDetails?.matchOdd?.activeStatus === "live" &&
                        matchDetails?.matchOdd?.isActive && (
                          <Col className="g-0" md={12}>
                            <MatchOdd
                              title={"Match_odd"}
                              data={matchDetails?.matchOdd}
                              detail={matchDetails}
                            />
                          </Col>
                        )}

                      {matchDetails?.bookmaker?.activeStatus === "live" &&
                        matchDetails?.bookmaker?.isActive && (
                          <Col className="g-0" md={12}>
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
                          <div key={index} className="p-0">
                            {item?.activeStatus === "live" && (
                              <Col className="g-0" md={12}>
                                <OtherMarket
                                  title={item?.name}
                                  box={
                                    item?.runners?.[0]?.ex?.availableToBack
                                      ?.length > 2
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
                        matchDetails?.tournament
                          ?.filter(
                            (item: any) =>
                              !["completed_match", "tied_match"].includes(
                                item?.name?.toLowerCase()
                              )
                          )
                          ?.sort((a: any, b: any) => a.sNo - b.sNo)
                          ?.map((item: any, index: number) => (
                            <div className="p-0" key={index}>
                              {item?.activeStatus === "live" && (
                                <Col className="g-0" md={12}>
                                  <Tournament
                                    title={item?.name}
                                    box={
                                      item?.runners?.[0]?.ex?.availableToBack
                                        ?.length > 2
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
                          <Col className="g-0" md={12}>
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
                            <div key={index} className="p-0">
                              {item?.activeStatus === "live" && item?.isActive && (
                                <Col className="g-0" md={12}>
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
                          <Col className="g-0" md={12}>
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

                      {((matchDetails?.manualTiedMatch?.activeStatus ===
                        "live" &&
                        matchDetails?.manualTiedMatch?.isActive) ||
                        (matchDetails?.manualTideMatch?.activeStatus ===
                          "live" &&
                          matchDetails?.manualTideMatch?.isActive)) && (
                        <Col className="g-0" md={12}>
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

                      {matchDetails?.marketCompleteMatch1?.activeStatus ===
                        "live" &&
                        matchDetails?.marketCompleteMatch1?.isActive && (
                          <Col className="g-0" md={12}>
                            <OtherMarket
                              title={matchDetails?.marketCompleteMatch1?.name}
                              box={
                                matchDetails?.marketCompleteMatch1?.runners?.[0]
                                  ?.ex?.availableToBack?.length > 2
                                  ? 6
                                  : 2
                              }
                              data={matchDetails?.marketCompleteMatch1}
                              detail={matchDetails}
                            />
                          </Col>
                        )}
                      {matchDetails?.manualCompleteMatch?.activeStatus ===
                        "live" &&
                        matchDetails?.manualCompleteMatch?.isActive && (
                          <Col className="g-0" md={12}>
                            <ManualMarket
                              title={matchDetails?.manualCompleteMatch?.name}
                              data={matchDetails?.manualCompleteMatch}
                              detail={matchDetails}
                              // data={matchDetails?.matchOdd}
                            />
                          </Col>
                        )}
                      {(matchDetails?.apiSession?.session?.section?.length >
                        0 ||
                        manualEntries?.length > 0) && (
                        <Col className="g-0" md={12}>
                          <MobileSessionNormal
                            title={"Normal"}
                            mtype={"session"}
                            data={matchDetails?.apiSession?.session}
                            detail={matchDetails}
                            manual={manualEntries ? manualEntries : []}
                          />
                        </Col>
                      )}
                      {matchDetails?.apiSession?.overByover?.section?.length >
                        0 && (
                        <Col className="g-0" md={12}>
                          <MobileSessionNormal
                            title={"overByover"}
                            mtype={"overByover"}
                            data={matchDetails?.apiSession?.overByover}
                            detail={matchDetails}
                          />
                        </Col>
                      )}
                      {matchDetails?.apiSession?.ballByBall?.section?.length >
                        0 && (
                        <Col className="g-0" md={12}>
                          <MobileSessionNormal
                            title={"Ballbyball"}
                            mtype={"ballByBall"}
                            data={matchDetails?.apiSession?.ballByBall}
                            detail={matchDetails}
                          />
                        </Col>
                      )}

                      {matchDetails?.apiSession?.fancy1?.section?.length >
                        0 && (
                        <Col className="g-0" md={12}>
                          <MobileSessionFancy
                            title={"fancy1"}
                            data={matchDetails?.apiSession?.fancy1}
                            detail={matchDetails}
                            // data={matchDetails?.matchOdd}
                          />
                        </Col>
                      )}

                      {matchDetails?.apiSession?.khado?.section?.length > 0 && (
                        <Col className="g-0" md={12}>
                          <MobileSessionKhado
                            title={"khado"}
                            data={matchDetails?.apiSession?.khado}
                            detail={matchDetails}
                          />
                        </Col>
                      )}
                      {matchDetails?.apiSession?.meter?.section?.length > 0 && (
                        <Col className="g-0" md={12}>
                          <MobileSessionNormal
                            title={"meter"}
                            mtype={"meter"}
                            data={matchDetails?.apiSession?.meter}
                            detail={matchDetails}
                          />
                        </Col>
                      )}
                      {matchDetails?.apiSession?.oddEven?.section?.length >
                        0 && (
                        <Col className="g-0" md={12}>
                          <MobileSessionOddEven
                            title={"oddeven"}
                            // type={"fancy"}
                            data={matchDetails?.apiSession?.oddEven}
                            detail={matchDetails}
                            // data={matchDetails?.matchOdd}
                          />
                        </Col>
                      )}
                      {matchDetails?.apiSession?.cricketCasino?.section
                        ?.length > 0 &&
                        matchDetails?.apiSession?.cricketCasino?.section?.map(
                          (item: any, index: number) => {
                            return (
                              <div
                                key={index}
                                style={{ width: "100%", padding: 0 }}
                              >
                                {item?.activeStatus === "live" && (
                                  <Col className="g-0" md={12}>
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
                      {matchDetails?.tournament?.length > 0 &&
                        matchDetails?.tournament
                          ?.filter((item: any) =>
                            ["completed_match", "tied_match"].includes(
                              item?.name?.toLowerCase()
                            )
                          )
                          ?.sort((a: any, b: any) => a.sNo - b.sNo)
                          ?.map((item: any, index: number) => (
                            <div className="p-0" key={index}>
                              {item?.activeStatus === "live" && (
                                <Col className="g-0" md={12}>
                                  <Tournament
                                    title={item?.name}
                                    box={
                                      item?.runners?.[0]?.ex?.availableToBack
                                        ?.length > 2
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
                      {matchDetails?.apiTideMatch?.activeStatus === "live" &&
                        matchDetails?.apiTideMatch?.isActive && (
                          <Col className="g-0" md={12}>
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
                      {matchDetails?.marketCompleteMatch?.activeStatus ===
                        "live" &&
                        matchDetails?.marketCompleteMatch?.isActive && (
                          <Col className="g-0" md={12}>
                            <OtherMarket
                              title={matchDetails?.marketCompleteMatch?.name}
                              box={
                                matchDetails?.marketCompleteMatch?.runners?.[0]
                                  ?.ex?.availableToBack?.length > 2
                                  ? 6
                                  : 2
                              }
                              data={matchDetails?.marketCompleteMatch}
                              detail={matchDetails}
                              // data={matchDetails?.matchOdd}
                            />
                          </Col>
                        )}
                    </Row>
                  </div>
                ) : (
                  <div
                    className="w-100 d-flex justify-content-center align-items-center"
                    style={{ height: "100vh" }}
                  >
                    <NewLoader />
                  </div>
                )
              ) : item?.id === "matchedBet" ? (
                <MyBet />
              ) : null}
            </Tab>
          ))}
      </CommonTabs>
    </div>
  );
};

export default memo(MobileGameDetail);
