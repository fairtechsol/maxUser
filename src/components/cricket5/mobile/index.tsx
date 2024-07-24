import { useEffect, useState } from "react";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { handleRoundId } from "../../../utils/formatMinMax";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Crick5Result from "../desktop/cric5Card";
import MarketComponent from "./betTable";
import ScoreBoard from "../../commonComponent/scoreBoard";
import { cardData, cardGamesId, cardUrl } from "../../../utils/constants";
import { crick5rules } from "../../../assets/images";
import { Table } from "react-bootstrap";
import InnerLoader from "../../commonComponent/customLoader/InnerLoader";

const Cricket5Mobile = ({fancyData}: any) => {

  const [activeTab, setActiveTab] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId?.cricketv3}`
  );
  const { dragonTigerDetail, scoreBoardData ,loading} = useSelector(
    (state: RootState) => state.card
  );
  const { placedBets } = useSelector((state: RootState) => state.bets);
  const [showFancy, setShowFancy] = useState(false);
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
  return (
    <>
      <div>
        <div className="dt20header">
          <PlacedBet show={show1} setShow={setShow1} />
          <div className="dt20subheader1">
            <div
              style={{
                height: "100%",
                borderTop: !activeTab ? "2px solid white" : "none",
                padding: "5px",
              }}
            >
              <span
                style={{ fontSize: "12px", fontWeight: "bold" }}
                onClick={() => setActiveTab(false)}
              >
                GAME
              </span>
            </div>
            <span style={{ fontSize: "18px" }}> | </span>
            <div
              style={{
                height: "100%",
                borderTop: activeTab ? "2px solid white" : "none",
                padding: "5px",
              }}
            >
              <span
                style={{ fontSize: "12px", fontWeight: "bold" }}
                onClick={() => setActiveTab(true)}
              >
                PLACED BET({placedBets?.length || 0})
              </span>
            </div>
          </div>
          <div className="dt20subheader2">
            <span
              style={{ textDecoration: "underline" }}
              onClick={() => setShowInactivityModal(true)}
            >
              Rules
            </span>
            <span>
              {dragonTigerDetail?.videoInfo
                ? `Round ID:  ${handleRoundId(
                    dragonTigerDetail?.videoInfo?.mid
                  )}`
                : ""}{" "}
            </span>
          </div>
        </div>

        {!activeTab ? (
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "100%", height:scoreBoardData?.data?"225px":"150px" }}>
              <div className="horseRacingTabHeader-m">
                <div>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {dragonTigerDetail?.name}
                  </span>
                </div>
              </div>
              <div>
                {scoreBoardData?.data && (
                  <ScoreBoard data={scoreBoardData?.data} />
                )}
              </div>
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
                  result={<Crick5Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? <InnerLoader /> :<div style={{ height: "900px" }}>
              <div style={{ marginTop: "10.5rem" }}>
                <MarketComponent
                  odds={dragonTigerDetail?.odds}
                  fancyData={fancyData}
                  data={dragonTigerDetail}
                  min={dragonTigerDetail?.videoInfo?.min}
                  max={dragonTigerDetail?.videoInfo?.max}
                  showFancy={showFancy}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                {" "}
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["A", "I", "T"]}
                  type={"cricketv3"}
                />
              </div>
              <div className="casino-title" style={{ position: "relative" }}>
                <span>Rules</span>
              </div>
              <div className="table-responsive rules-table d-flex">
                {cardData?.map((teamData, index) => (
                  <Table bordered key={index} className="mb-4">
                    <thead>
                      <tr>
                        <th colSpan={2} className="text-center">
                          {teamData.team}
                        </th>
                      </tr>
                      <tr>
                        <th>Cards</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamData.cards.map((card, cardIndex) => (
                        <tr key={cardIndex}>
                          <td className=" d-flex text-start">
                            <div className="d-flex justify-content-center align-items-center gap-2">
                              <img
                                src={
                                  typeof card.imgSrc === "string"
                                    ? card.imgSrc
                                    : ""
                                }
                                alt="s"
                                className="img-cards"
                              />
                              X 10
                            </div>
                          </td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              {card.value}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ))}
              </div>
            </div>}
          </div>
        ) : (
          <>
            <MyBet />
          </>
        )}
      </div>
      <RulesModal
        show={showInactivityModal}
        setShow={setShowInactivityModal}
        rule={crick5rules}
      />
    </>
  );
};

export default Cricket5Mobile;
