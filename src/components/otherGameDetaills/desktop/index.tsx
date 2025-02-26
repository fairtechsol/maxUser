import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import BetTableHeader from "../../commonComponent/betTableHeader";
// import "./style.scss";
import { IoInformationCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { customSortOnName } from "../../../helpers";
import { formatDate } from "../../../utils/dateUtils";
import { MatchType } from "../../../utils/enum";
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
// import service from "../../../service";
import { liveStreamPageUrl, scoreBoardUrlMain } from "../../../utils/constants";
import { getTvData } from "../../../utils/tvUrlGet";
// import Iframe from "../../iframe/iframe";

const FootballDesktopGameDetail = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showContactAdmin, setShowContactAdmin] = useState(false);
  const [showScoreboard, setShowScoreboard] = useState<boolean>(false);
  // const [_, setChannelId] = useState<string>("");
  // const [liveScoreBoardData, setLiveScoreBoardData] = useState(null);
  // const [errorCount, setErrorCount] = useState<number>(0);
  const [tvData, setTvData] = useState<any>(null);

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
    if (otherMatchDetails?.eventId) {
      getTvData(
        otherMatchDetails?.eventId,
        setTvData,
        otherMatchDetails?.matchType,
        true
      );
    }
  }, [otherMatchDetails?.id]);

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
                    setShowScoreboard={(e) => {
                      if (e) {
                        getTvData(
                          otherMatchDetails?.eventId,
                          setTvData,
                          otherMatchDetails?.matchType,
                          false,
                          true
                        );
                      }
                      setShowScoreboard(e);
                    }}
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
                      src={
                        import.meta.env.VITE_NODE_ENV == "production"
                          ? tvData?.scoreData?.iframeUrl
                          : `${scoreBoardUrlMain}${otherMatchDetails?.eventId}/${otherMatchDetails?.matchType}`
                      }
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
                    url={
                      import.meta.env.VITE_NODE_ENV == "production"
                        ? tvData?.tvData?.iframeUrl
                        : `${liveStreamPageUrl}${otherMatchDetails?.eventId}/${otherMatchDetails?.matchType}`
                    }
                    eventId={otherMatchDetails?.eventId}
                    marketType={otherMatchDetails?.matchType}
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
