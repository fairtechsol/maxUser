import { memo, useEffect, useState } from "react";
import { Col, Container, Row, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
// import { formatDate } from "../../../utils/dateUtils";
import { MatchType } from "../../../utils/enum";
// import BetTableHeader from "../../commonComponent/betTableHeader";
import CommonTabs from "../../commonComponent/tabs";
import BetTable from "../betTable";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";
import ContactAdmin from "../../commonComponent/contactAdmin";
import BetTableHeader from "../../commonComponent/betTableHeader";
import { formatDate } from "../../../utils/dateUtils";
import service from "../../../service";

const markets = [
  {
    id: "fancy",
    name: "Fancy",
  },
  {
    id: "fancy1",
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
    name: "OdD Even",
  },
  {
    id: "wicket",
    name: "WICKET",
  },
  {
    id: "four",
    name: "FOUR",
  },
  {
    id: "six",
    name: "SIX",
  },
  {
    id: "cricketcasino",
    name: "CRICKET CASINO",
  },
];

const MobileGameDetail = () => {
  const [show, setShow] = useState(true);
  const [marketActive, setMarketActive] = useState("fancy");
  const [liveScoreBoardData, setLiveScoreBoardData] = useState(null);
  const [errorCount, setErrorCount] = useState<number>(0);

  const { matchDetails } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const { placedBets } = useSelector((state: RootState) => state.bets);
  const handleMarket = (type: string) => {
    setMarketActive(type);
  };

  const getScoreBoard = async (marketId: string) => {
    try {
      const response: any = await service.get(
        `https://devscore.fairgame.club/score/getMatchScore/${marketId}`
        // `https://scoreboard.fairgame7.com/score/getMatchScore/${marketId}`
      );
      if (response) {
        setLiveScoreBoardData(response);
        setErrorCount(0);
      }
    } catch (e: any) {
      console.log("Error:", e?.message);
      setErrorCount((prevCount: number) => prevCount + 1);
    }
  };

  useEffect(() => {
    if (matchDetails?.marketId) {
      let intervalTime = 500;
      if (errorCount >= 5 && errorCount < 10) {
        intervalTime = 60000;
      } else if (errorCount >= 10) {
        intervalTime = 600000;
      }
      const interval = setInterval(() => {
        getScoreBoard(matchDetails?.marketId);
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [matchDetails?.marketId, errorCount]);
  return (
    <div>
      <PlacedBet show={show} setShow={setShow} />

      <CommonTabs defaultActive="odds" className="color">
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
                        title={matchDetails?.title}
                        rightComponent={
                          <span className="title-14 f400">
                            {matchDetails?.startAt && ( formatDate(matchDetails?.startAt))}
                          </span>
                        }
                      />
                       <div style={{width:"100%",height:"auto",backgroundColor:"#000"}} dangerouslySetInnerHTML={{__html: liveScoreBoardData ?liveScoreBoardData:""}}></div>
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
                          backLayCount={6}
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
                    {/* {matchDetails?.apiTideMatch?.isActive && (
                      <Col className="g-0" md={12}>
                        <BetTable
                          title={matchDetails?.apiTideMatch?.name}
                          type={MatchType.MATCH_ODDS}
                          data={matchDetails?.apiTideMatch}
                          backLayCount={2}
                        />
                      </Col>
                    )} */}
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
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          {markets?.map((item, index) => {
                            return (
                              index < 5 && (
                                <div
                                  className={`matchListTab ${
                                    item?.id === marketActive ? "active" : ""
                                  }`}
                                  style={{ width: "20%" }}
                                  onClick={() => handleMarket(item?.id)}
                                >
                                  <span className="title-12 text-uppercase f500">
                                    {item?.name}
                                  </span>
                                </div>
                              )
                            );
                          })}
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          {markets?.map((item, index) => {
                            return (
                              index > 4 && (
                                <div
                                  className={`matchListTab ${
                                    item?.id === marketActive ? "active" : ""
                                  }`}
                                  style={{ width: index==8?"34%":"22%" }}
                                  onClick={() => handleMarket(item?.id)}
                                >
                                  <span className="title-12 text-uppercase f500">
                                    {item?.name}
                                  </span>
                                </div>
                              )
                            );
                          })}
                        </div>
                      </div>
                      {marketActive != "fancy" ? (
                        <>
                          <ContactAdmin />
                        </>
                      ) : (
                        <>
                          {matchDetails?.apiSessionActive && (
                            <Col md={12}>
                              <BetTable
                                title={"Session Market"}
                                type={MatchType.API_SESSION_MARKET}
                                data={matchDetails?.sessionBettings}
                              />
                            </Col>
                          )}
                        </>
                      )}
                      {/* <Row>
                        {matchDetails?.apiSessionActive && (
                          <Col md={12}>
                            <BetTable
                              title={"Session Market"}
                              type={MatchType.API_SESSION_MARKET}
                              data={matchDetails?.sessionBettings}
                            />
                          </Col>
                        )}
                      </Row> */}
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
