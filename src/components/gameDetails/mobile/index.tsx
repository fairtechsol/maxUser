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
import PlacedBet from "./placeBet";
import "./style.scss";

const MobileGameDetail = () => {
  const [show, setShow] = useState(true);

  const { matchDetails } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const { placedBets } = useSelector((state: RootState) => state.bets);

  return (
    <div>
      <PlacedBet show={show} setShow={setShow} />

      <CommonTabs
        customClass="overflow-x-auto overflow-y-hidden no-wrap"
        defaultActive="odds"
        fill={true}
      >
        {[
          {
            id: "odds",
            name: "Odds",
          },
          {
            id: "matchedBet",
            name: `Matched Bet(${Array.from(new Set(placedBets))?.length})`,
          },
        ]?.map((item, index) => {
          return (
            <Tab
              key={item?.id}
              eventKey={item?.id}
              tabClassName="m-tab"
              title={<div>{item?.name}</div>}
            >
              {index == 0 ? (
                <Container fluid>
                  <Row>
                    <Col className="g-0" md={12}>
                      <BetTableHeader
                        customClass="py-2"
                        customTextClass="title-12"
                        title={matchDetails?.title}
                        rightComponent={
                          <span className="title-16 f500">
                            {matchDetails?.startAt && ( formatDate(matchDetails?.startAt))}
                          </span>
                        }
                      />
                    </Col>
                    {matchDetails?.matchOdd?.isActive && (
                      <Col className="g-0" md={12}>
                        <BetTable
                          title={matchDetails?.matchOdd?.name}
                          type={MatchType.MATCH_ODDS}
                          data={matchDetails?.matchOdd}
                          backLayCount={2}
                        />
                      </Col>
                    )}

                    {matchDetails?.bookmaker?.isActive && (
                      <Col className="g-0" md={12}>
                        <BetTable
                          title={matchDetails?.bookmaker?.name}
                          type={MatchType.MATCH_ODDS}
                          data={matchDetails?.bookmaker}
                          backLayCount={2}
                        />
                      </Col>
                    )}

                    {matchDetails?.quickBookmaker?.length > 0 &&
                      matchDetails?.quickBookmaker?.map(
                        (item: any, index: number) => (
                          <div key={index} className="p-0">
                            {item?.isActive && (
                              <Col className="g-0" md={12}>
                                <BetTable
                                  title={item?.name}
                                  type={MatchType.BOOKMAKER}
                                  data={item}
                                  backLayCount={2}
                                />
                              </Col>
                            )}
                          </div>
                        )
                      )}
                    {matchDetails?.apiTideMatch?.isActive && (
                      <Col className="g-0" md={12}>
                        <BetTable
                          title={matchDetails?.apiTideMatch?.name}
                          type={MatchType.MATCH_ODDS}
                          data={matchDetails?.apiTideMatch}
                          backLayCount={2}
                        />
                      </Col>
                    )}
                    {matchDetails?.manualTiedMatch?.isActive && (
                      <Col className="g-0" md={12}>
                        <BetTable
                          title={matchDetails?.manualTiedMatch?.name}
                          type={MatchType.BOOKMAKER}
                          data={matchDetails?.manualTiedMatch}
                          backLayCount={2}
                        />
                      </Col>
                    )}
                    {matchDetails?.marketCompleteMatch?.isActive && (
                      <Col className="g-0" md={12}>
                        <BetTable
                          title={matchDetails?.marketCompleteMatch?.name}
                          type={MatchType.MATCH_ODDS}
                          data={matchDetails?.marketCompleteMatch}
                          backLayCount={2}
                        />
                      </Col>
                    )}

                    <Col className="g-0" md={12}>
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
                                {matchDetails?.apiSessionActive && (
                                  <Col md={12}>
                                    <BetTable
                                      title={"Session Market"}
                                      type={MatchType.API_SESSION_MARKET}
                                      data={matchDetails?.apiSession}
                                    />
                                  </Col>
                                )}
                                {matchDetails?.manualSessionActive && (
                                  <Col md={12}>
                                    <BetTable
                                      title={"Quick Session Market"}
                                      type={MatchType.SESSION_MARKET}
                                      data={matchDetails?.sessionBettings}
                                    />
                                  </Col>
                                )}
                              </Row>
                            </Tab>
                          );
                        })}
                      </CommonTabs>
                    </Col>
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

export default memo(MobileGameDetail);
