import { memo, useEffect, useState } from "react";
import { Col, Container, Row, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { customSortOnName, getChannelId } from "../../../helpers";
import { RootState } from "../../../store/store";
import { formatDate } from "../../../utils/dateUtils";
import { MatchType } from "../../../utils/enum";
import BetTableHeader from "../../commonComponent/betTableHeader";
import LiveStreamComponent from "../../commonComponent/liveStreamComponent";
import CommonTabs from "../../commonComponent/tabs";
import Bookmaker from "../../gameDetails/bookmaker";
import ManualMarket from "../../gameDetails/manulMarkets";
import MatchOdd from "../../gameDetails/matchOdd";
import PlacedBet from "../../gameDetails/mobile/placeBet";
import "../../gameDetails/mobile/style.scss";
import Tournament from "../../gameDetails/tournament";
import BetTable from "../betTable";
import HtFt from "../htft";
import MyBet from "./myBet";

// import "./style.scss";
// import BetTable from "../../gameDetails/betTable";
// import MyBet from "../../gameDetails/mobile/myBet";
// import PlacedBet from "../../gameDetails/mobile/placeBet";

const FootballMobileGameDetail = () => {
  const [show, setShow] = useState(true);
  const [channelId, setChannelId] = useState<string>("");

  const { otherMatchDetails } = useSelector(
    (state: RootState) => state.otherGames.matchDetail
  );

  const { placedBets } = useSelector((state: RootState) => state.bets);

  useEffect(() => {
    try {
      if (otherMatchDetails?.eventId) {
        const callApiForLiveStream = async () => {
          let result = await getChannelId(otherMatchDetails?.eventId);
          if (result) {
            setChannelId(result?.channelNo);
          }
        };
        callApiForLiveStream();
      }
    } catch (error) {
      console.log(error);
    }
  }, [otherMatchDetails?.id]);

  return (
    <div>
      {/* <FootballPlaceBet show={show} setShow={setShow} /> */}
      <PlacedBet show={show} setShow={setShow} />
      <Col md={12}>
        <BetTableHeader
          customClass="py-1"
          customTextClass="title-12"
          title={otherMatchDetails?.title}
          rightComponent={
            <span className="title-12 lh-1 f500 text-white ">
              {otherMatchDetails?.startAt &&
                formatDate(otherMatchDetails?.startAt)}
            </span>
          }
        />
      </Col>
      <CommonTabs className="color" defaultActive="odds">
        {[
          {
            id: "odds",
            name: <div className="oddstab border-end lh-sm pe-1">ODDS</div>,
          },
          {
            id: "matchedBet",
            name: (
              <div className="ps-5 border-end pe-2">{`MATCHED BET(${
                Array.from(new Set(placedBets))?.length
              })`}</div>
            ),
          },
        ]?.map((item, index) => {
          return (
            <Tab
              key={item?.id}
              eventKey={item?.id}
              tabClassName="m-tab border-0"
              title={
                <div className="font rounded-0 lh-sm py-0 f600">
                  {item?.name}
                </div>
              }
            >
              {index == 0 ? (
                <Container>
                  <Row>
                    {/* <Col className="g-0" md={12}>
                      <BetTableHeader
                        customClass="py-2"
                        customTextClass="title-12"
                        title={otherMatchDetails?.title}
                        rightComponent={
                          <span className="title-12 lh-1 f500">
                            {otherMatchDetails?.startAt &&
                              formatDate(otherMatchDetails?.startAt)}
                          </span>
                        }
                      />
                    </Col> */}
                    {channelId !== "0" && channelId !== "" && (
                      <Col className="g-0" md={12}>
                        <LiveStreamComponent channelId={channelId} />
                      </Col>
                    )}
                    {otherMatchDetails?.matchOdd?.isActive && (
                      <Col className="g-0 mt-2" md={12}>
                        <MatchOdd
                          title={otherMatchDetails?.matchOdd?.name}
                          data={otherMatchDetails?.matchOdd}
                          detail={otherMatchDetails}
                        />
                      </Col>
                    )}
                    {otherMatchDetails?.bookmaker?.isActive && (
                      <Col className="g-0 mt-2" md={12}>
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
                    {otherMatchDetails?.bookmaker2?.isActive && (
                      <Col className="g-0 mt-2" md={12}>
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
                        ?.filter((item: any) => item?.isActive)
                        ?.map((item: any) => (
                          <div key={item?.id} className="p-0">
                            <Col className="g-0 mt-2" md={12}>
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
                          <div key={index} className="pe-0 ps-0">
                            {item?.activeStatus === "live" &&
                              item?.isActive &&
                              (item?.name === "HT/FT" ? (
                                <Col
                                  className="g-0"
                                  md={12}
                                  style={{ marginTop: "10px" }}
                                >
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
                                <Col
                                  className="g-0"
                                  md={12}
                                  style={{ marginTop: "10px" }}
                                >
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

                    {otherMatchDetails?.firstHalfGoal?.length > 0 &&
                      otherMatchDetails?.firstHalfGoal
                        ?.filter((item: any) => item?.isActive)
                        ?.slice()
                        ?.sort(customSortOnName)
                        ?.map((item: any) => (
                          <div key={item?.id} className="p-0">
                            <Col className="g-0" md={12}>
                              <BetTable
                                title={item?.name}
                                type={MatchType.FIRST_HALF_GOAL}
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
                          type={MatchType.HALF_TIME}
                          data={otherMatchDetails?.halfTime}
                          backLayCount={2}
                        />
                      </Col>
                    )}
                    {otherMatchDetails?.overUnder?.length > 0 &&
                      otherMatchDetails?.overUnder
                        ?.filter((item: any) => item?.isActive)
                        ?.slice()
                        ?.sort(customSortOnName)
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
