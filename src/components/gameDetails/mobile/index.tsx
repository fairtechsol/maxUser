import { memo, useEffect, useState } from "react";
import { Col, Container, Ratio, Row, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import moment from "moment";
import { FaTv } from "react-icons/fa";
import { liveStreamPageUrl, scoreBoardUrlMain } from "../../../utils/constants";
import { getTvData } from "../../../utils/tvUrlGet";
import BetTableHeader from "../../commonComponent/betTableHeader";
import NewLoader from "../../commonComponent/newLoader";
import CommonTabs from "../../commonComponent/tabs";
import Iframe from "../../iframe/iframe";
import HtFt from "../htft";
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
  const [showVideo, setShowVideo] = useState(false);
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
                    if (!showVideo) {
                      getTvData(
                        matchDetails?.eventId,
                        setTvData,
                        matchDetails?.matchType,
                        true
                      );
                      setShowVideo(!showVideo);
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
                >
                  <FaTv size={15} />
                </div>
              ),
            },
        ]
          ?.filter(Boolean)
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
                      {["cricket", "politics"].includes(
                        matchDetails?.matchType
                      ) ? (
                        liveScoreBoardData && (
                          <Iframe data={liveScoreBoardData} width="100%" />
                        )
                      ) : (
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
                      )}
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
                              {item?.activeStatus === "live" &&
                                (item?.name === "HT/FT" ? (
                                  <Col className="g-0" md={12}>
                                    <HtFt
                                      title={item?.name}
                                      box={
                                        item?.runners?.[0]?.ex?.availableToBack
                                          ?.length > 2
                                          ? 6
                                          : 2
                                      }
                                      data={item}
                                      detail={matchDetails}
                                    />
                                  </Col>
                                ) : (
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
                                    />
                                  </Col>
                                ))}
                            </div>
                          ))}

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
