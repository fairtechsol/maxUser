import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { crick5rules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { cardGamesId, cardUrl } from "../../../utils/constants";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Crick5Result from "../desktop/cric5Card";
import MarketComponent from "./betTable";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import CasinoHead from "../../commonComponent/casinoGameHeader";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import NewLoader from "../../commonComponent/newLoader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import Iframe from "../../iframe/iframe";

const Cricket5Mobile = ({ fancyData }: any) => {
  const [activeTab, setActiveTab] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail, scoreBoardData, loading } = useSelector(
    (state: RootState) => state.card
  );


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

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.cricketv3}`);
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
            <div
              style={{
                width: "100%",
              }}
            >
             
              <div
                style={{
                  width: "100%",
                  height: "90%",
                  backgroundColor: "#000",
                }}
              >
                {scoreBoardData?.balls?.length>0 && (
              <div style={{marginBottom:"2px"}}>
                <Iframe data={scoreBoardData} />
              </div>
            )}
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<Crick5Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div>
                <div>
                  <MarketComponent
                    odds={dragonTigerDetail?.odds}
                    fancyData={fancyData}
                    data={dragonTigerDetail}
                    min={dragonTigerDetail?.videoInfo?.min}
                    max={dragonTigerDetail?.videoInfo?.max}
                    showFancy={dragonTigerDetail?.fancy}
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
                {/* <div
                  className="casino-title mt-2"
                  style={{ position: "relative" }}
                >
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
                </div> */}
              </div>
            )}
          </div>
        ) : (
          <>
            <MobileMyBet />
          </>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={crick5rules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default Cricket5Mobile;
