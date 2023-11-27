import { Col, Container, Row, Tab } from "react-bootstrap";
import { MatchType } from "../../../utils/enum";
import BetTableHeader from "../../commonComponent/betTableHeader";
import CommonTabs from "../../commonComponent/tabs";
import BetTable from "../betTable";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";

interface DesktopGameDetailProps {
  data: any;
}

const DesktopGameDetail = ({ data }: DesktopGameDetailProps) => {
  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <Container fluid className="p-0">
            <Row>
              <Col md={12}>
                <BetTableHeader
                  customClass="mt-2 py-2"
                  title={"Bangladesh v New Zealand"}
                  rightComponent={
                    <span className="title-16 f500">11/28/2023 9:00:00 AM</span>
                  }
                />
              </Col>
              {data?.matchOdds?.map((item: any, index: number) => {
                return (
                  <Col md={12} key={index}>
                    <BetTable
                      title={item?.title}
                      type={MatchType.MATCH_ODDS}
                      data={item?.runners}
                    />
                  </Col>
                );
              })}
              {data?.bookmaker?.map((item: any, index: number) => (
                <Col md={6} key={index}>
                  <BetTable
                    title={item?.title}
                    type={MatchType.BOOKMAKER}
                    data={item?.data}
                    backLayCount={item.countRow}
                  />
                </Col>
              ))}
              {data?.session?.map((item: any, index: number) => (
                <Col md={6} key={index}>
                  <BetTable
                    title={item?.title}
                    type={MatchType.SESSION_MARKET}
                    data={item?.data}
                  />
                </Col>
              ))}
              <Col md={12}>
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
              </Col>
            </Row>
          </Container>
        </Col>
        <Col md={4} className="p-0">
          <Container className="p-0" fluid>
            <Row>
              <Col md={12}>
              <PlacedBet/>
              </Col>
              <Col md={12}>
              <MyBet/>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default DesktopGameDetail;
