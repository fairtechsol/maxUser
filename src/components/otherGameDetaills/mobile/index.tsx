import { memo, useState } from "react";
import { Col, Container, Row, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { formatDate } from "../../../utils/dateUtils";
import { MatchType } from "../../../utils/enum";
import BetTableHeader from "../../commonComponent/betTableHeader";
import CommonTabs from "../../commonComponent/tabs";
import BetTable from "../betTable";
import MyBet from "./myBet";
import "../../gameDetails/mobile/style.scss";
import FootballPlaceBet from "./placeBet";

// import "./style.scss";
// import BetTable from "../../gameDetails/betTable";
// import MyBet from "../../gameDetails/mobile/myBet";
// import PlacedBet from "../../gameDetails/mobile/placeBet";

const FootballMobileGameDetail = () => {
  const [show, setShow] = useState(true);

  const { otherMatchDetails } = useSelector(
    (state: RootState) => state.otherGames.matchDetail
  );

  const { placedBets } = useSelector((state: RootState) => state.bets);

  return (
    <div>
      <FootballPlaceBet show={show} setShow={setShow} />

      <CommonTabs className="color" defaultActive="odds">
        {[
          {
            id: "odds",
            name: "ODDS",
          },
          {
            id: "matchedBet",
            name: `MATCHED BET(${Array.from(new Set(placedBets))?.length})`,
          },
        ]?.map((item, index) => {
          return (
            <Tab
              key={item?.id}
              eventKey={item?.id}
              tabClassName="m-tab"
              title={<div className="font p-1 px-2">{item?.name}</div>}
            >
              {index == 0 ? (
                <Container fluid>
                  <Row>
                    <Col className="g-0" md={12}>
                      <BetTableHeader
                        customClass="py-2"
                        customTextClass="title-12"
                        title={otherMatchDetails?.title}
                        rightComponent={
                          <span className="title-12 f500">
                            {otherMatchDetails?.startAt &&
                              formatDate(otherMatchDetails?.startAt)}
                          </span>
                        }
                      />
                    </Col>
                    {otherMatchDetails?.matchOdd?.isActive && (
                      <Col className="g-0" md={12}>
                        <BetTable
                          title={otherMatchDetails?.matchOdd?.name}
                          type={MatchType.MATCH_ODDS}
                          data={otherMatchDetails?.matchOdd}
                          backLayCount={2}
                        />
                      </Col>
                    )}
                    {otherMatchDetails?.setWinner?.length > 0 &&
                      otherMatchDetails?.setWinner
                        ?.filter((item: any) => item?.isActive)
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
                    {/* {otherMatchDetails?.bookmaker?.isActive && (
                      <Col className="g-0" md={12}>
                        <BetTable
                          title={otherMatchDetails?.bookmaker?.name}
                          type={MatchType.MATCH_ODDS}
                          data={otherMatchDetails?.bookmaker}
                          backLayCount={2}
                        />
                      </Col>
                    )} */}

                    {otherMatchDetails?.quickBookmaker?.length > 0 &&
                      otherMatchDetails?.quickBookmaker
                        ?.filter((item: any) => item?.isActive)
                        ?.map((item: any) => (
                          <div key={item?.id} className="p-0">
                            <Col className="g-0" md={12}>
                              <BetTable
                                title={item?.name}
                                type={MatchType.BOOKMAKER}
                                data={item}
                                backLayCount={2}
                              />
                            </Col>
                          </div>
                        ))}
                    {otherMatchDetails?.firstHalfGoal?.length > 0 &&
                      otherMatchDetails?.firstHalfGoal
                        ?.filter((item: any) => item?.isActive)
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
                    {otherMatchDetails?.halfTime?.isActive && (
                      <Col className="g-0" md={12}>
                        <BetTable
                          title={otherMatchDetails?.halfTime?.name}
                          type={MatchType.MATCH_ODDS}
                          data={otherMatchDetails?.halfTime}
                          backLayCount={2}
                        />
                      </Col>
                    )}
                    {otherMatchDetails?.overUnder?.length > 0 &&
                      otherMatchDetails?.overUnder
                        ?.filter((item: any) => item?.isActive)
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

                    {/* <Col className="g-0" md={12}>
                      <CommonTabs
                        customClass="overflow-x-auto overflow-y-hidden no-wrap"
                        defaultActive="fancy"
                      >
                        {[
                          {
                            id: "fancy",
                            name: "Fancy",
                          },
                          // {
                          //   id: "fancy1",
                          //   name: "Fancy 1",
                          // },
                          // {
                          //   id: "meter",
                          //   name: "Meter",
                          // },
                          // {
                          //   id: "khado",
                          //   name: "Khado",
                          // },
                          // {
                          //   id: "oddEven",
                          //   name: "OdeEven",
                          // },
                        ]?.map((item, index) => {
                          return (
                            <Tab
                              key={index}
                              eventKey={item?.id}
                              tabClassName="m-match-list-tabs"
                              title={
                                <div className="title-12 text-uppercase f500">
                                  <span>{item?.name}</span>
                                </div>
                              }
                            >
                              <Row>
                                {otherMatchDetails?.apiSessionActive && (
                                  <Col md={12}>
                                    <BetTable
                                      title={"Session Market"}
                                      type={MatchType.API_SESSION_MARKET}
                                      data={otherMatchDetails?.apiSession}
                                    />
                                  </Col>
                                )}
                                {otherMatchDetails?.manualSessionActive && (
                                  <Col md={12}>
                                    <BetTable
                                      title={"Quick Session Market"}
                                      type={MatchType.SESSION_MARKET}
                                      data={otherMatchDetails?.sessionBettings}
                                    />
                                  </Col>
                                )}
                              </Row>
                            </Tab>
                          );
                        })}
                      </CommonTabs>
                    </Col> */}
                  </Row>
                </Container>
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
