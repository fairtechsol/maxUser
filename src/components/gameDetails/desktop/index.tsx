import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { sessionBettingType } from "../../../utils/constants";
import { formatDate } from "../../../utils/dateUtils";
import { MatchType } from "../../../utils/enum";
import BetTableHeader from "../../commonComponent/betTableHeader";
import BetTable from "../betTable";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";

const DesktopGameDetail = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const { matchDetails } = useSelector(
    (state: RootState) => state.match.matchList
  );

  console.log(matchDetails);

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

  return (
    <Container fluid>
      <Row>
        <Col md={9}>
          <Container fluid className="p-0">
            <Row>
              <Col md={12}>
                <BetTableHeader
                  customClass="mt-2 py-2"
                  title={matchDetails?.title}
                  rightComponent={
                    <span className="title-16 f500">
                      {formatDate(matchDetails?.startAt)}
                    </span>
                  }
                />
              </Col>

              {matchDetails?.matchOdd && matchDetails?.matchOdd?.isActive && (
                <Col md={12}>
                  <BetTable
                    title={matchDetails?.matchOdd?.name}
                    type={MatchType.MATCH_ODDS}
                    data={matchDetails?.matchOdd}
                  />
                </Col>
              )}

              {matchDetails?.bookmaker && matchDetails?.bookmaker?.isActive && (
                <Col md={12}>
                  <BetTable
                    title={matchDetails?.bookmaker?.name}
                    type={MatchType.BOOKMAKER}
                    data={matchDetails?.bookmaker}
                  />
                </Col>
              )}

              {matchDetails?.quickBookmaker?.map((item: any, index: number) => (
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
              ))}
              {matchDetails?.apiTideMatch &&
                matchDetails?.apiTideMatch?.isActive && (
                  <Col md={12}>
                    <BetTable
                      title={matchDetails?.apiTideMatch?.name}
                      type={MatchType.BOOKMAKER}
                      data={matchDetails?.apiTideMatch}
                    />
                  </Col>
                )}
              {matchDetails?.manualTiedMatch &&
                matchDetails?.manualTiedMatch?.isActive && (
                  <Col md={12}>
                    <BetTable
                      title={matchDetails?.manualTiedMatch?.name}
                      type={MatchType.BOOKMAKER}
                      data={matchDetails?.manualTiedMatch}
                    />
                  </Col>
                )}

              {(matchDetails?.apiSessionActive ||
                matchDetails?.manualSessionActive) && (
                <Col md={6}>
                  <BetTable
                    title={"Session Market"}
                    type={MatchType.SESSION_MARKET}
                    data={matchDetails?.sessionBettings?.filter(
                      (item: any) =>
                        JSON.parse(item)?.type ==
                          sessionBettingType?.manualSession ||
                        JSON.parse(item)?.type ==
                          sessionBettingType?.marketSession
                    )}
                  />
                </Col>
              )}
              {(matchDetails?.apiSessionActive ||
                matchDetails?.manualSessionActive) && (
                <Col md={6}>
                  <BetTable
                    title={"Over by Over Session Market"}
                    type={MatchType.SESSION_MARKET}
                    data={matchDetails?.sessionBettings?.filter(
                      (item: any) =>
                        JSON.parse(item)?.type == sessionBettingType?.overByOver
                    )}
                  />
                </Col>
              )}
              {(matchDetails?.apiSessionActive ||
                matchDetails?.manualSessionActive) && (
                <Col md={6}>
                  <BetTable
                    title={"Ball by Ball Session Market"}
                    type={MatchType.SESSION_MARKET}
                    data={matchDetails?.sessionBettings?.filter(
                      (item: any) =>
                        JSON.parse(item)?.type == sessionBettingType?.ballByBall
                    )}
                  />
                </Col>
              )}
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
        <Col md={3} className="ps-0">
          <Container className="p-0" fluid ref={placeBetRef}>
            <Row className={`${isSticky ? "position-fixed top-0 pe-3 " : ""}`}>
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
    </Container>
  );
};

export default DesktopGameDetail;
