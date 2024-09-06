import { memo, useEffect, useState } from "react";
import { Col, Container, Row, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
// import { formatDate } from "../../../utils/dateUtils";
import { MatchType } from "../../../utils/enum";
import CommonTabs from "../../commonComponent/tabs";
import BetTable from "../betTable";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";
import ContactAdmin from "../../commonComponent/contactAdmin";
import BetTableHeader from "../../commonComponent/betTableHeader";
import { formatDate } from "../../../utils/dateUtils";
import service from "../../../service";
import LiveStreamComponent from "../../commonComponent/liveStreamComponent";
import { getChannelId } from "../../../helpers";
import MatchOdd from "../matchOdd";
import Bookmaker from "../bookmaker";
import ManualMarket from "../manulMarkets";
import DynamicMarket from "../dynamicMarkets";
import MobileSessionNormal from "../sessionNormal/mobileSessionNormal";
import MobileSessionOddEven from "../sessionOddEven/mobileSessionOddEven";
import MobileSessionFancy from "../sessionFancy/mobileSessionFancy";
import SessionCricketCasino from "../sessionCricketCasino";
import { FiMonitor } from "react-icons/fi";
import { FaTv } from "react-icons/fa";

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
  const [channelId, setChannelId] = useState<string>("");

  const { matchDetails, marketId } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const { placedBets } = useSelector((state: RootState) => state.bets);
  const handleMarket = (type: string) => {
    setMarketActive(type);
  };

  const getScoreBoard = async (marketId: string) => {
    try {
      const response: any = await service.get(
        // `https://fairscore7.com/score/getMatchScore/${marketId}`
        `https://devscore.fairgame.club/score/getMatchScore/${marketId}`
      );
      if (response) {
        setLiveScoreBoardData(response);
        setErrorCount(0);
      }
    } catch (e: any) {
      console.log("Error:", e?.message);
      setLiveScoreBoardData(null);
      setErrorCount((prevCount: number) => prevCount + 1);
    }
  };

  useEffect(() => {
    if (matchDetails?.marketId === marketId) {
      let intervalTime = 500;
      if (errorCount >= 5 && errorCount < 10) {
        intervalTime = 60000;
      } else if (errorCount >= 10) {
        intervalTime = 600000;
      }
      const interval = setInterval(() => {
        getScoreBoard(matchDetails?.marketId);
      }, intervalTime);

      return () => {
        clearInterval(interval);
        setLiveScoreBoardData(null);
      };
    }
  }, [matchDetails?.id, errorCount, marketId]);

  useEffect(() => {
    try {
      if (matchDetails?.eventId) {
        const callApiForLiveStream = async () => {
          let result = await getChannelId(matchDetails?.eventId);
          if (result) {
            setChannelId(result?.channelNo);
          }
        };
        callApiForLiveStream();
      }
    } catch (error) {
      console.log(error);
    }
  }, [matchDetails?.id]);
  const normalizedData = matchDetails?.sessionBettings?.map((item:any) => JSON.parse(item));
  const manualEntries = normalizedData?.filter((item:any) => item?.isManual);
  // console.log('manualEntries',manualEntries)
  return (
    <div>
      <PlacedBet show={show} setShow={setShow} />
      <BetTableHeader
        customClass=""
        customTextClass="title-12 fbold"
        title={matchDetails?.title}
        rightComponent={
          <span className="title-12 fbold text-white">
            {matchDetails?.startAt && formatDate(matchDetails?.startAt)}
          </span>
        }
        style={{ padding: "5px" }}
      />
      <CommonTabs
        defaultActive="odds"
        className="color" // Update the active tab when clicked
      >
        {[
          {
            id: "odds",
            name: "ODDS",
          },
          {
            id: "matchedBet",
            name: `MATCHED BET(${Array.from(new Set(placedBets))?.length})`,
          },
          channelId !== "0" && channelId
            ? {
                id: "live",
                name: (
                  <div style={{ padding: "0px", fontSize: "11px" }}>
                    <FaTv />
                  </div>
                ),
              }
            : null, // Only show live tab if channelId is valid
        ]
          ?.filter(Boolean) // Filter out null if channelId is invalid
          .map((item, index) => (
            <Tab
              key={item?.id}
              eventKey={item?.id}
              tabClassName="m-tab"
              title={
                <div className="font p-2 lh-1 py-0 f600">{item?.name}</div>
              }
            >
              {index == 0 ? (
                <Container>
                  <Row>
                  {item?.id === "live" ?   <Col className="g-0" md={12}>
                      <LiveStreamComponent channelId={channelId} />
                    </Col> : ""} 
                    {matchDetails?.matchOdd?.isActive && (
                      <Col className="g-0" md={12}>
                        <MatchOdd
                          title={"Match_odd"}
                          data={matchDetails?.matchOdd}
                          detail={matchDetails}
                        />
                      </Col>
                    )}

                    {matchDetails?.bookmaker?.isActive && (
                      <Col className="g-0" md={12}>
                        <Bookmaker
                          title={matchDetails?.bookmaker?.name}
                          box={6}
                          data={matchDetails?.bookmaker}
                          detail={matchDetails}
                          // data={matchDetails?.matchOdd}
                        />
                      </Col>
                    )}
                    {matchDetails?.bookmaker2?.isActive && (
                      <Col className="g-0" md={12}>
                        <Bookmaker
                          title={matchDetails?.bookmaker2?.name}
                          box={2}
                          data={matchDetails?.bookmaker2}
                          detail={matchDetails}
                          // type={MatchType.MATCH_ODDS}
                          // data={matchDetails?.matchOdd}
                        />
                      </Col>
                    )}
                    {matchDetails?.quickBookmaker?.length > 0 &&
                      matchDetails?.quickBookmaker?.map(
                        (item: any, index: number) => (
                          <div key={index} className="p-0">
                            {item?.isActive && (
                              <Col className="g-0" md={12}>
                                <ManualMarket
                                  title={item?.name}
                                  data={item}
                                  detail={matchDetails}
                                  // data={matchDetails?.matchOdd}
                                />
                              </Col>
                            )}
                          </div>
                        )
                      )}
                    
                    {matchDetails?.manualTiedMatch?.isActive && (
                      <Col className="g-0" md={12}>
                        <ManualMarket
                          title={matchDetails?.manualTiedMatch?.name}
                          data={matchDetails?.manualTiedMatch}
                          detail={matchDetails}
                          // data={matchDetails?.matchOdd}
                        />
                      </Col>
                    )}
                    {matchDetails?.marketCompleteMatch?.isActive && (
                      <Col className="g-0" md={12}>
                        <DynamicMarket
                          title={matchDetails?.marketCompleteMatch?.name}
                          data={matchDetails?.marketCompleteMatch}
                          detail={matchDetails}
                        />
                      </Col>
                    )}
                    {matchDetails?.manualCompleteMatch?.isActive && (
                      <Col className="g-0" md={12}>
                        <ManualMarket
                          title={matchDetails?.manualCompleteMatch?.name}
                          data={matchDetails?.manualCompleteMatch}
                          detail={matchDetails}
                          // data={matchDetails?.matchOdd}
                        />
                      </Col>
                    )}
                    {(matchDetails?.apiSession?.session?.section?.length > 0  || manualEntries) && (
                      <Col className="g-0" md={12}>
                        <MobileSessionNormal
                          title={"Normal"}
                          // type={"normal"}
                          data={matchDetails?.apiSession?.session}
                          detail={matchDetails}
                          manual={manualEntries ? manualEntries : []}
                        />
                      </Col>
                    )}
                    {matchDetails?.apiSession?.overByover?.section?.length >
                      0 && (
                      <Col className="g-0" md={12}>
                        <MobileSessionNormal
                          title={"overByover"}
                          // type={"normal"}
                          data={matchDetails?.apiSession?.overByover}
                          detail={matchDetails}
                        />
                      </Col>
                    )}
                    {matchDetails?.apiSession?.ballByBall?.section?.length >
                      0 && (
                      <Col className="g-0" md={12}>
                        <MobileSessionNormal
                          title={"Ballbyball"}
                          // type={"normal"}
                          data={matchDetails?.apiSession?.ballByBall}
                          detail={matchDetails}
                        />
                      </Col>
                    )}
                    
                    {matchDetails?.apiSession?.fancy1?.section?.length > 0 && (
                      <Col className="g-0" md={12}>
                        <MobileSessionFancy
                          title={"fancy1"}
                          data={matchDetails?.apiSession?.fancy1}
                          detail={matchDetails}
                          // data={matchDetails?.matchOdd}
                        />
                      </Col>
                    )}
                    {matchDetails?.apiSession?.oddEven?.section?.length > 0 && (
                      <Col className="g-0" md={12}>
                        <MobileSessionOddEven
                          title={"oddeven"}
                          // type={"fancy"}
                          data={matchDetails?.apiSession?.oddEven}
                          detail={matchDetails}
                          // data={matchDetails?.matchOdd}
                        />
                      </Col>
                    )}
                    {matchDetails?.apiSession?.cricketCasino?.section?.length >
                      0 &&
                      matchDetails?.apiSession?.cricketCasino?.section?.map(
                        (item: any, index: number) => {
                          return (
                            <div
                              key={index}
                              style={{ width: "100%", padding: 0 }}
                            >
                              {item?.activeStatus === "live" && (
                                <Col className="g-0" md={12}>
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
                      {matchDetails?.apiTideMatch?.isActive && (
                      <Col className="g-0" md={12}>
                        <DynamicMarket
                          title={matchDetails?.apiTideMatch?.name}
                          data={matchDetails?.apiTideMatch}
                          detail={matchDetails}
                        />
                      </Col>
                    )}
                    {/* {matchDetails?.matchOdd?.isActive && (
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
                      )} */}
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
                    {/* {matchDetails?.manualTiedMatch?.isActive && (
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
                    {matchDetails?.manualCompleteMatch?.isActive && (
                      <Col className="g-0" md={12}>
                        <BetTable
                          title={matchDetails?.manualCompleteMatch?.name}
                          type={MatchType.BOOKMAKER}
                          data={matchDetails?.manualCompleteMatch}
                          backLayCount={2}
                        />
                      </Col>
                    )} */}
                  </Row>
                </Container>
              ) : item?.id === "live" && channelId !== "0" && channelId ? (
                <Container>
                  <Row>
                    <Col className="g-0" md={12}>
                      <div
                        style={{
                          width: "100%",
                          height: "auto",
                          backgroundColor: "#000",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: liveScoreBoardData ? liveScoreBoardData : "",
                        }}
                      ></div>
                    </Col>
                  </Row>
                </Container>
              ) : (
                <MyBet />
              )}
            </Tab>
          ))}
      </CommonTabs>
    </div>
  );
};

export default memo(MobileGameDetail);
