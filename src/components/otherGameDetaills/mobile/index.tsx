import { memo, useEffect, useState } from "react";
import { Col, Container, Ratio, Row, Tab } from "react-bootstrap";
import { FaTv } from "react-icons/fa";
import { useSelector } from "react-redux";
import { customSortOnName } from "../../../helpers";
import { RootState } from "../../../store/store";
import { liveStreamPageUrl, scoreBoardUrlMain } from "../../../utils/constants";
import { formatDate } from "../../../utils/dateUtils";
import { MatchType } from "../../../utils/enum";
import { getTvData } from "../../../utils/tvUrlGet";
import BetTableHeader from "../../commonComponent/betTableHeader";
import NewLoader from "../../commonComponent/newLoader";
import CommonTabs from "../../commonComponent/tabs";
import Bookmaker from "../../gameDetails/bookmaker";
import ManualMarket from "../../gameDetails/manulMarkets";
import MatchOdd from "../../gameDetails/matchOdd";
import "../../gameDetails/mobile/style.scss";
import Tournament from "../../gameDetails/tournament";
import BetTable from "../betTable";
import HtFt from "../htft";
import MyBet from "./myBet";
import FootballPlaceBet from "./placeBet";

const FootballMobileGameDetail = () => {
  const [show, setShow] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [tvData, setTvData] = useState<any>(null);

  const { matchDetails, loading } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const { placedBets } = useSelector((state: RootState) => state.bets);

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

  return (
    <div>
      <FootballPlaceBet show={show} setShow={setShow} />
      <Col md={12}>
        <BetTableHeader
          customClass="py-1"
          customTextClass="title-12"
          title={matchDetails?.title}
          rightComponent={
            <span className="title-12 lh-1 f500 text-white ">
              {matchDetails?.startAt && formatDate(matchDetails?.startAt)}
            </span>
          }
        />
      </Col>
      <CommonTabs className="color" defaultActive="odds">
        {[
          {
            id: "odds",
            name: <div className="oddstab border-end lh-sm pe-1">ODDS</div>,
          },
          {
            id: "matchedBet",
            name: (
              <div className="ps-5 border-end pe-2">{`MATCHED BET(${Array.from(new Set(placedBets))?.length
                })`}</div>
            ),
          },
          matchDetails?.eventId && {
            // id: "live",
            name: (
              <div
                onClick={() => {
                  if (!showVideo) {
                    getTvData(
                      matchDetails?.eventId,
                      setTvData,
                      matchDetails?.matchType,
                      true
                    );
                  } else {
                    setTvData((prev: any) => {
                      return {
                        ...prev,
                        tvData: null,
                      };
                    });
                  }
                  setShowVideo(!showVideo);
                }}
                className="ps-5"
              // style={{  lineHeight: 1.22 }}
              >
                <FaTv size={15} />
              </div>
            ),
          },
        ]
          ?.filter(Boolean)
          .map((item, index) => {
            return (
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
                        {!sessionStorage.getItem("isDemo") && showVideo && (
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
                        {
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
                              src={
                                import.meta.env.VITE_NODE_ENV == "production"
                                  ? tvData?.scoreData?.iframeUrl
                                  : `${scoreBoardUrlMain}${matchDetails?.eventId}/${matchDetails?.matchType}`
                              }
                              title="Live Stream"
                              referrerPolicy="strict-origin-when-cross-origin"
                            ></iframe>
                          </div>
                        }
                        {/* {liveScoreBoardData && (
                        <Iframe data={liveScoreBoardData} width="100%" />
                      )} */}
                        {matchDetails?.matchOdd?.isActive && (
                          <Col className="g-0 mt-2" md={12}>
                            {matchDetails?.matchOdd?.runners?.[0]?.ex
                              ?.availableToBack?.length > 2 ? (
                              <MatchOdd
                                title={matchDetails?.matchOdd?.name}
                                data={matchDetails?.matchOdd}
                                detail={matchDetails}
                              />
                            ) : (
                              <Bookmaker
                                title={matchDetails?.matchOdd?.name}
                                box={2}
                                data={matchDetails?.matchOdd}
                                detail={matchDetails}
                              />
                            )}
                          </Col>
                        )}
                        {matchDetails?.bookmaker?.isActive && (
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
                        {matchDetails?.bookmaker2?.isActive && (
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
                            // data={matchDetails?.matchOdd}
                            />
                          </Col>
                        )}
                        {matchDetails?.quickBookmaker?.length > 0 &&
                          matchDetails?.quickBookmaker
                            ?.filter((item: any) => item?.isActive)
                            ?.map((item: any) => (
                              <div key={item?.id} className="p-0">
                                <Col className="g-0" md={12}>
                                  <ManualMarket
                                    title={item?.name}
                                    data={item}
                                    detail={matchDetails}
                                  />
                                </Col>
                              </div>
                            ))}
                        {matchDetails?.tournament?.length > 0 &&
                          matchDetails?.tournament?.map(
                            (item: any, index: number) => (
                              <div key={index} className="pe-0 ps-0">
                                {item?.activeStatus === "live" &&
                                  (item?.name === "HT/FT" ? (
                                    <Col
                                      className="g-0"
                                      md={12}
                                    // style={{ marginTop: "10px" }}
                                    >
                                      <HtFt
                                        title={item?.name}
                                        box={
                                          item?.runners?.[0]?.ex
                                            ?.availableToBack?.length > 2
                                            ? 6
                                            : 2
                                        }
                                        data={item}
                                        detail={matchDetails}
                                      // data={matchDetails?.matchOdd}
                                      />
                                    </Col>
                                  ) : (
                                    <Col
                                      className="g-0"
                                      md={12}
                                    // style={{ marginTop: "10px" }}
                                    >
                                      <Tournament
                                        title={item?.name}
                                        box={
                                          item?.runners?.[0]?.ex
                                            ?.availableToBack?.length > 2
                                            ? 6
                                            : 2
                                        }
                                        data={item}
                                        detail={matchDetails}
                                      // data={matchDetails?.matchOdd}
                                      />
                                    </Col>
                                  ))}
                              </div>
                            )
                          )}
                        {matchDetails?.setWinner?.length > 0 &&
                          matchDetails?.setWinner
                            ?.filter((item: any) => item?.isActive)
                            ?.slice()
                            ?.sort(customSortOnName)
                            ?.map((item: any) => (
                              <div key={item?.id} className="p-0">
                                <Col className="g-0" md={12}>
                                  <BetTable
                                    title={item?.name}
                                    type={MatchType.SET_WINNER}
                                    data={item}
                                    backLayCount={2}
                                  />
                                </Col>
                              </div>
                            ))}
                        {/* {matchDetails?.bookmaker?.isActive && (
                      <Col className="g-0" md={12}>
                        <BetTable
                          title={matchDetails?.bookmaker?.name}
                          type={MatchType.MATCH_ODDS}
                          data={matchDetails?.bookmaker}
                          backLayCount={2}
                        />
                      </Col>
                    )} */}

                        {matchDetails?.firstHalfGoal?.length > 0 &&
                          matchDetails?.firstHalfGoal
                            ?.filter((item: any) => item?.isActive)
                            ?.slice()
                            ?.sort(customSortOnName)
                            ?.map((item: any) => (
                              <div key={item?.id} className="p-0">
                                <Col className="g-0" md={12}>
                                  <BetTable
                                    title={item?.name}
                                    type={MatchType.FIRST_HALF_GOAL}
                                    data={item}
                                    backLayCount={2}
                                  />
                                </Col>
                              </div>
                            ))}
                        {matchDetails?.halfTime?.isActive && (
                          <Col className="g-0" md={12}>
                            <BetTable
                              title={matchDetails?.halfTime?.name}
                              type={MatchType.HALF_TIME}
                              data={matchDetails?.halfTime}
                              backLayCount={2}
                            />
                          </Col>
                        )}
                        {matchDetails?.overUnder?.length > 0 &&
                          matchDetails?.overUnder
                            ?.filter((item: any) => item?.isActive)
                            ?.slice()
                            ?.sort(customSortOnName)
                            ?.map((item: any) => (
                              <div key={item?.id} className="p-0">
                                <Col className="g-0" md={12}>
                                  <BetTable
                                    title={item?.name}
                                    type={MatchType.UNDER_OVER}
                                    data={item}
                                    backLayCount={2}
                                  />
                                </Col>
                              </div>
                            ))}


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
                ) : (
                  <MyBet />
                )}
              </Tab>
            );
          })}
      </CommonTabs>
    </div>
  );
};

export default memo(FootballMobileGameDetail);
