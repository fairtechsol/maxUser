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

const DesktopGameDetail = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showContactAdmin, setShowContactAdmin] = useState(false);

  const { matchDetails } = useSelector(
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
                    <span className="title-16 f500">
                      {formatDate(matchDetails?.startAt)}
                    </span>
                  }
                />
              </Col>

              {matchDetails?.matchOdd?.isActive && (
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

              {matchDetails?.quickBookmaker.length > 0 &&
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
                )}
              {matchDetails?.apiTideMatch?.isActive && (
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

              {matchDetails?.apiSessionActive && (
                <Col md={6}>
                  <BetTable
                    title={"Session Market"}
                    type={MatchType.API_SESSION_MARKET}
                    data={matchDetails?.sessionBettings}
                  />
                </Col>
              )}
              {matchDetails?.manualSessionActive?.isActive && (
                <Col md={6}>
                  <BetTable
                    title={"Quick Session Market"}
                    type={MatchType.SESSION_MARKET}
                    data={[]}
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
        <Col md={4} className="ps-0">
          <Container className="p-0" fluid ref={placeBetRef}>
            <Row
              className={` ${isSticky ? "position-fixed top-0 pe-3" : ""}`}
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
                    className="fs-5 text-decoration-underline cursor-pointer"
                  >
                    Ball by Ball
                  </h6>
                </div>
              </Col>
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

export default DesktopGameDetail;
