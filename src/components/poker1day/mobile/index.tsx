import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { p6rules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import "../../horseRacing/mobile/betTable/style.scss";
import "./style.scss";
import DynamicTable from "../desktop/betTable";
import { Table } from "react-bootstrap";
import Poker1DayResult from "../desktop/poker1DayCard";
import PairBox from "../desktop/pairBox";
// import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import CasinoHead from "../../commonComponent/casinoGameHeader";
import NewLoader from "../../commonComponent/newLoader";
const Poker1dayMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
  const { placedBets } = useSelector((state: RootState) => state.bets);

  const bonus1 = [
    { label: "Pair (2-10)", value: "1 To 3" },
    { label: "A/Q or A/J Off Suited", value: "1 TO 5" },
    { label: "Pair (JQK)", value: "1 TO 10" },
    { label: "A/K Off Suited", value: "1 TO 15" },
    { label: "A/Q or A/J Suited", value: "1 TO 20" },
    { label: "A/K Suited", value: "1 TO 25" },
    { label: "A/A", value: "1 TO 30" },
  ];

  const bonus2 = [
    { label: "Three of a Kind", value: "1 To 3" },
    { label: "Straight", value: "1 TO 4" },
    { label: "Flush", value: "1 TO 6" },
    { label: "Full House", value: "1 TO 8" },
    { label: "Four of a Kind", value: "1 TO 30" },
    { label: "Straight Flush", value: "1 TO 50" },
    { label: "Royal Flush", value: "1 TO 100" },
  ];

  const handleClose = () => {
    setShowInactivityModal(false);
  };

  useEffect(() => {
    const resetTimer = () => {
      setLastActivityTime(Date.now());
    };

    const checkInactivity = () => {
      if (Date.now() - lastActivityTime > 5 * 60 * 1000) {
        setShowInactivityModal(true);
        setVideoFrameId("");
      }
    };

    const activityEvents = ["mousemove", "keydown", "scroll", "click"];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    const intervalId = setInterval(checkInactivity, 1000);

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearInterval(intervalId);
    };
  }, [lastActivityTime, showInactivityModal]);

  // const handleBet = (item: any) => {
  //   let team = {
  //     bettingType: "BACK",
  //     matchId: dragonTigerDetail?.id,
  //     odd: item?.rate,
  //     stake: 0,
  //     matchBetType: "matchOdd",
  //     betOnTeam: item?.nat,
  //     name: item?.nat,
  //     bettingName: "Match odds",
  //     selectionId: item?.sid,
  //   };
  //   dispatch(
  //     selectedBetAction({
  //       team,
  //       dragonTigerDetail,
  //     })
  //   );
  //   // console.log('team',team)
  // };

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.poker1Day}`);
  }, []);

  return (
    <>
      <div>
          <MobilePlacedBet show={show1} setShow={setShow1} />
          <CasinoHead activeTab={activeTab} setActiveTab={setActiveTab} setShow={setShow} />

        {!activeTab ? (
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  width: "100%",
                  height: "90%",
                  backgroundColor: "#000",
                }}
              >
                {" "}
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={
                    <Poker1DayResult data={dragonTigerDetail?.videoInfo} />
                  }
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div>
                <div>
                  <DynamicTable
                    back={true}
                    odds={dragonTigerDetail?.oddsData}
                    data={dragonTigerDetail}
                    min={dragonTigerDetail?.videoInfo?.min}
                    max={dragonTigerDetail?.videoInfo?.max}
                    playerNum={dragonTigerDetail?.oddsData?.[0]}
                  />
                  <DynamicTable
                    back={true}
                    odds={dragonTigerDetail?.oddsData}
                    data={dragonTigerDetail}
                    min={dragonTigerDetail?.videoInfo?.min}
                    max={dragonTigerDetail?.videoInfo?.max}
                    playerNum={dragonTigerDetail?.oddsData?.[1]}
                  />
                </div>
                {/* <div className="horseRacingTabHeader-m mt-1">
                  <div>
                    <span style={{ fontSize: "14px", fontWeight: "600" }}>
                      Bonus Bet
                    </span>
                  </div>
                </div> */}
                    <div className="mt-2" style={{ width: "100%" }}>
                <PairBox
                  odds={dragonTigerDetail?.playersBonusPair}
                  data={dragonTigerDetail}
                  min={dragonTigerDetail?.videoInfo?.min}
                  max={dragonTigerDetail?.videoInfo?.max}
                />
                </div>
                <div style={{ marginTop: "10px" }}>
                  {" "}
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["A", "B", "T"]}
                    type={cardGamesType.poker1Day}
                  />
                </div>
                <div>
                  <div
                    className="casino-title mt-2 bg-primary text-white"
                    style={{ position: "relative" }}
                  >
                    <span>Rules</span>
                  </div>
                  <div className="table-responsive rules-table">
                    <Table bordered>
                      <thead>
                        <tr>
                          <th colSpan={2} className="box-10 text-center lh-1">
                            Bonus 1 (2 Cards Bonus)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {bonus1.map((item, index) => (
                          <tr key={index} style={{ lineHeight: 1 }}>
                            <td
                              className="box-7"
                              style={{
                                backgroundColor: "#eee",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              {item.label}
                            </td>
                            <td
                              className="box-3"
                              style={{
                                backgroundColor: "#eee",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              {item.value}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <th colSpan={2} className="box-10 text-center lh-1">
                            Bonus 2 (7 Cards Bonus)
                          </th>
                        </tr>
                        {bonus2.map((item, index) => (
                          <tr key={index} style={{ lineHeight: 1 }}>
                            <td
                              className="box-7"
                              style={{
                                backgroundColor: "#eee",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              {item.label}
                            </td>
                            <td
                              className="box-3"
                              style={{
                                backgroundColor: "#eee",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              {item.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <MobileMyBet />
          </>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={p6rules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default Poker1dayMobile;
