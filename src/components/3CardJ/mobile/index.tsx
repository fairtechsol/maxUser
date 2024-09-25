import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CardBox from "./CardsBox";
import "./style.scss";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import CasinoHead from "../../commonComponent/casinoGameHeader";
import Card3Result from "../desktop/abj1Card";
import NewLoader from "../../commonComponent/newLoader";

const CardJMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId?.cardj}`
  );
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
  const { placedBets } = useSelector((state: RootState) => state.bets);
  const [nat, setNat] = useState("");
  const handleClose = () => {
    setShowInactivityModal(false);
  };

  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );

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
        {selectedBet?.team?.betOnTeam.split(" ")[1].length === 3 && (
          <MobilePlacedBet show={show1} setShow={setShow1} />
        )}
        <CasinoHead
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setShow={setShow}
        />

        {!activeTab ? (
          <div className="horseRacingTab">
            <div style={{ width: "100%" }}>
              <div
                style={{
                  width: "100%",
                  height: "92%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<Card3Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div>
                <div
                  style={{
                    width: "100%",
                    margin: "0px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardBox
                    title="Yes"
                    betType="BACK"
                    bgColor="#72bbef"
                    odds={dragonTigerDetail?.yes}
                    data={dragonTigerDetail}
                    cards={dragonTigerDetail?.cardInfo}
                  />
                  <CardBox
                    title="No"
                    betType="LAY"
                    bgColor="#faa9ba"
                    odds={dragonTigerDetail?.no}
                    data={dragonTigerDetail}
                    cards={dragonTigerDetail?.cardInfo}
                  />

                  <div className="ticker-container">
                    <div className="ticker-wrap">
                      <div
                        className="ticker-move"
                        style={{ color: "#097c93", fontWeight: "700" }}
                      >
                        {dragonTigerDetail?.videoInfo?.remark}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["R", "R", "R"]}
                    type={cardGamesType.cardj}
                  />
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
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default CardJMobile;
