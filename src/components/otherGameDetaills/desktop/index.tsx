import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { customSortOnName } from "../../../helpers";
import { RootState } from "../../../store/store";
import { liveStreamPageUrl, scoreBoardUrlMain } from "../../../utils/constants";
import { formatDate } from "../../../utils/dateUtils";
import { MatchType } from "../../../utils/enum";
import { getTvData } from "../../../utils/tvUrlGet";
import BetTableHeader from "../../commonComponent/betTableHeader";
import LiveStreamComponent from "../../commonComponent/liveStreamComponent";
import CustomModal from "../../commonComponent/modal";
import NewLoader from "../../commonComponent/newLoader";
import Bookmaker from "../../gameDetails/bookmaker";
import MyBet from "../../gameDetails/desktop/myBet";
import PlacedBet from "../../gameDetails/desktop/placeBet";
import ManualMarket from "../../gameDetails/manulMarkets";
import MatchOdd from "../../gameDetails/matchOdd";
import Tournament from "../../gameDetails/tournament";
import BetTable from "../../otherGameDetaills/betTable/index";
import HtFt from "../htft";

const FootballDesktopGameDetail = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showContactAdmin, setShowContactAdmin] = useState(false);
  const [showScoreboard, setShowScoreboard] = useState<boolean>(false);
  const [tvData, setTvData] = useState<any>(null);

  const { matchDetails, loading } = useSelector(
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
    <Container fluid className="mt-1 pe-0 ps-1">
      <Row>
        <Col md={8}>
          {!loading ? (
            <Container className="p-0">
              <>
                <Col md={12}>
                  <BetTableHeader
                    customClass="py-1"
                    title={matchDetails?.title}
                    setShowScoreboard={(e) => {
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
                    }}
                    rightComponent={
                      <span className="title-16 fbold text-white">
                        {/* {formatDate(matchDetails?.startAt)} */}
                        {matchDetails?.startAt &&
                          formatDate(matchDetails?.startAt)}
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
                {matchDetails?.matchOdd?.activeStatus === "live" &&
                  matchDetails?.matchOdd?.isActive && (
                    <Col md={12} style={{ marginTop: "8px" }}>
                      {matchDetails?.matchOdd?.runners?.[0]?.ex?.availableToBack
                        ?.length > 2 ? (
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
                      />
                    </Col>
                  )}
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
                      // data={matchDetails?.matchOdd}
                      />
                    </Col>
                  )}
                {matchDetails?.quickBookmaker?.length > 0 &&
                  matchDetails?.quickBookmaker
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
                            detail={matchDetails}
                          />
                        </Col>
                      </div>
                    ))}
                {matchDetails?.tournament?.length > 0 &&
                  matchDetails?.tournament?.map((item: any, index: number) => (
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
                            // data={matchDetails?.matchOdd}
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
                {matchDetails?.setWinner?.length > 0 &&
                  matchDetails?.setWinner
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
                {matchDetails?.firstHalfGoal?.length > 0 &&
                  matchDetails?.firstHalfGoal
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

                {matchDetails?.halfTime?.isActive && (
                  <Col md={12}>
                    <BetTable
                      title={matchDetails?.halfTime?.name}
                      type={MatchType.HALF_TIME}
                      data={matchDetails?.halfTime}
                    />
                  </Col>
                )}

                {matchDetails?.overUnder?.length > 0 &&
                  matchDetails?.overUnder
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

              {matchDetails?.eventId && (
                <Col md={12} className="px-1 pt-1">
                  <LiveStreamComponent
                    url={
                      import.meta.env.VITE_NODE_ENV == "production"
                        ? tvData?.tvData?.iframeUrl
                        : `${liveStreamPageUrl}${matchDetails?.eventId}/${matchDetails?.matchType}`
                    }
                    eventId={matchDetails?.eventId}
                    marketType={matchDetails?.matchType}
                    setTvData={setTvData}
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
