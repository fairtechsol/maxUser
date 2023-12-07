import { useState } from "react";
import { Col, Container, Row, Tab } from "react-bootstrap";
import { MatchType } from "../../../utils/enum";
import BetTableHeader from "../../commonComponent/betTableHeader";
import CommonTabs from "../../commonComponent/tabs";
import BetTable from "../betTable";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";

interface MobileGameDetailProps {
  data: any;
}

const MobileGameDetail = ({ data }: MobileGameDetailProps) => {
  const [show, setShow] = useState(true);

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
            name: "Matched Bet(0)",
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
                        title={"Bangladesh v New Zealand"}
                        rightComponent={
                          <span className="title-12 f500">
                            11/28/2023 9:00:00 AM
                          </span>
                        }
                      />
                    </Col>
                    {data?.matchOdds?.map((item: any, index: number) => {
                      return (
                        <Col className="g-0" md={12} key={index}>
                          <BetTable
                            title={item?.title}
                            type={MatchType.MATCH_ODDS}
                            data={item?.runners}
                          />
                        </Col>
                      );
                    })}
                    {data?.bookmaker?.map((item: any, index: number) => (
                      <Col className="g-0" md={6} key={index}>
                        <BetTable
                          title={item?.title}
                          type={MatchType.BOOKMAKER}
                          data={item?.data}
                          backLayCount={item.countRow}
                        />
                      </Col>
                    ))}

                    <Col className="g-0" md={12}>
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
                                {data?.session?.map(
                                  (item: any, index: number) => (
                                    <Col md={6} key={index}>
                                      <BetTable
                                        title={item?.title}
                                        type={MatchType.SESSION_MARKET}
                                        data={item?.data}
                                      />
                                    </Col>
                                  )
                                )}
                                {data?.session?.map(
                                  (item: any, index: number) => (
                                    <Col md={6} key={index}>
                                      <BetTable
                                        title={item?.title}
                                        type={MatchType.SESSION_MARKET}
                                        data={item?.data}
                                      />
                                    </Col>
                                  )
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

export default MobileGameDetail;
