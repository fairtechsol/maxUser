import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { liveStreamPageUrl, scoreBoardUrlMain } from "../../../utils/constants";
import { formatDate } from "../../../utils/dateUtils";
import { getTvData } from "../../../utils/tvUrlGet";
import BetTableHeader from "../../commonComponent/betTableHeader";
import LiveStreamComponent from "../../commonComponent/liveStreamComponent";
import CustomModal from "../../commonComponent/modal";
import NewLoader from "../../commonComponent/newLoader";
import Iframe from "../../iframe/iframe";
import HtFt from "../htft";
import SessionCricketCasino from "../sessionCricketCasino";
import SessionFancy from "../sessionFancy";
import SessionKhado from "../sessionKhado";
import SessionNormal from "../sessionNormal";
import SessionOddEven from "../sessionOddEven";
import Tournament from "../tournament";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";

const DesktopGameDetail = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showContactAdmin, setShowContactAdmin] = useState(false);
  const [showScoreboard, setShowScoreboard] = useState<boolean>(false);
  const [tvData, setTvData] = useState<any>(null);

  const { matchDetails, liveScoreBoardData, loading } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const handleShowScoreboard = (e: any) => {
    if (!showScoreboard) {
      getTvData(
        matchDetails?.eventId,
        setTvData,
        matchDetails?.matchType,
        false,
        true
      );
    } else {
      setTvData((prev: any) => {
        return {
          ...prev,
          scoreData: null,
        };
      });
    }
    setShowScoreboard(e);
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
    <Container fluid className="pe-0 ps-1">
      <Row className="p-0">
        <Col md={8}>
          {!loading ? (
            <Container className="p-0">
              <>
                <Col md={12} className="p-0">
                  {["cricket", "politics"].includes(matchDetails?.matchType) ? (
                    <BetTableHeader
                      customClass="mt-1 py-1 "
                      title={matchDetails?.title}
                      rightComponent={
                        <span className="title-16 fbold text-white">
                          {matchDetails?.startAt &&
                            moment(matchDetails?.startAt).format(
                              "DD/MM/YYYY hh:mm:ss"
                            )}
                        </span>
                      }
                    />
                  ) : (
                    <BetTableHeader
                      customClass="mt-1 py-1"
                      title={matchDetails?.title}
                      setShowScoreboard={handleShowScoreboard}
                      rightComponent={
                        <span className="title-16 fbold text-white">
                          {matchDetails?.startAt &&
                            formatDate(matchDetails?.startAt)}
                        </span>
                      }
                    />
                  )}
                </Col>
                {["cricket", "politics"].includes(matchDetails?.matchType)
                  ? liveScoreBoardData && (
                      <Iframe data={liveScoreBoardData} width="100%" />
                    )
                  : showScoreboard && (
                      <>
                        {(() => {
                          const isProd =
                            import.meta.env.VITE_NODE_ENV === "production";
                          const iframeSrc = isProd
                            ? tvData?.scoreData?.iframeUrl
                            : `${scoreBoardUrlMain}${matchDetails?.eventId}/${matchDetails?.matchType}`;

                          if (!iframeSrc) return null;

                          return (
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
                                src={iframeSrc}
                                title="Live Stream"
                                referrerPolicy="strict-origin-when-cross-origin"
                              />
                            </div>
                          );
                        })()}
                      </>
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
                      <div key={index}>
                        {item?.activeStatus === "live" &&
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
                                detail={matchDetails}
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
                                detail={matchDetails}
                              />
                            </Col>
                          ))}
                      </div>
                    ))}
                {(matchDetails?.apiSession?.session?.section?.length > 0 ||
                  manualEntries?.length > 0) && (
                  <Col md={12}>
                    <SessionNormal
                      title="Normal"
                      mtype="session"
                      data={matchDetails?.apiSession?.session}
                      detail={matchDetails}
                      manual={manualEntries ? manualEntries : []}
                    />
                  </Col>
                )}
                {matchDetails?.apiSession?.overByover?.section?.length > 0 && (
                  <Col md={12}>
                    <SessionNormal
                      title="overByover"
                      mtype="overByover"
                      data={matchDetails?.apiSession?.overByover}
                      detail={matchDetails}
                    />
                  </Col>
                )}
                {matchDetails?.apiSession?.ballByBall?.section?.length > 0 && (
                  <Col md={12}>
                    <SessionNormal
                      title="Ballbyball"
                      mtype="ballByBall"
                      data={matchDetails?.apiSession?.ballByBall}
                      detail={matchDetails}
                    />
                  </Col>
                )}
                {matchDetails?.apiSession?.fancy1?.section?.length > 0 && (
                  <Col md={12}>
                    <SessionFancy
                      title="fancy1"
                      data={matchDetails?.apiSession?.fancy1}
                      detail={matchDetails}
                    />
                  </Col>
                )}{" "}
                {matchDetails?.apiSession?.khado?.section?.length > 0 && (
                  <Col md={12}>
                    <SessionKhado
                      title="khado"
                      data={matchDetails?.apiSession?.khado}
                      detail={matchDetails}
                    />
                  </Col>
                )}
                {matchDetails?.apiSession?.meter?.section?.length > 0 && (
                  <Col md={12}>
                    <SessionNormal
                      title="meter"
                      mtype="meter"
                      data={matchDetails?.apiSession?.meter}
                      detail={matchDetails}
                    />
                  </Col>
                )}
                {matchDetails?.apiSession?.oddEven?.section?.length > 0 && (
                  <Col md={12}>
                    <SessionOddEven
                      title="oddeven"
                      data={matchDetails?.apiSession?.oddEven}
                      detail={matchDetails}
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
                {matchDetails?.tournament?.length > 0 &&
                  matchDetails?.tournament
                    ?.filter((item: any) =>
                      ["completed_match", "tied_match"].includes(
                        item?.name?.toLowerCase()
                      )
                    )
                    ?.sort((a: any, b: any) => a.sNo - b.sNo)
                    ?.map((item: any, index: number) => (
                      <div key={index}>
                        {item?.activeStatus === "live" && item?.isActive && (
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
                              detail={matchDetails}
                            />
                          </Col>
                        )}
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
              <div
                className="scrollable-content"
                style={{
                  maxHeight: "100vh",
                  overflowY: "auto",
                  paddingBottom: "20px",
                }}
              >
                {matchDetails?.eventId &&
                  matchDetails?.matchType !== "politics" && (
                    <>
                      {(() => {
                        const isProd =
                          import.meta.env.VITE_NODE_ENV === "production";
                        const iframeSrc = isProd
                          ? tvData?.tvData?.iframeUrl
                          : `${liveStreamPageUrl}${matchDetails?.eventId}/${matchDetails?.matchType}`;

                        if (!iframeSrc) return null;

                        return (
                          <div className="px-1 pt-1">
                            <LiveStreamComponent
                              url={iframeSrc}
                              eventId={matchDetails?.eventId}
                              matchType={matchDetails?.matchType}
                              setTvData={setTvData}
                            />
                          </div>
                        );
                      })()}
                    </>
                  )}
                <div className="px-1 pt-1">
                  <PlacedBet />
                </div>
                <div className="px-1 pt-1">
                  <MyBet />
                </div>
              </div>
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
