import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { race20rules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import CasinoHead from "../../commonComponent/casinoGameHeader";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import NewLoader from "../../commonComponent/newLoader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import "../../commonStyle.scss";
import Race20Result from "../desktop/race20Card";
import OddBox from "./OddBox";
import TotalsBox from "./TotalBox";
import WinBox from "./win";

const Race20Mobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail, loading } = useSelector(
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.race20}`);
  }, []);

  return (
    <>
      <div>
        <MobilePlacedBet show={show1} setShow={setShow1} />
        <CasinoHead activeTab={activeTab} setActiveTab={setActiveTab} setShow={setShow} />
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
                  result={<Race20Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>

            {loading ? (
              <NewLoader />
            ) : (
              <div>
                <div style={{ width: "100%", paddingBottom: "5px" }}>
                  <OddBox
                    odds={dragonTigerDetail?.cards}
                    data={dragonTigerDetail}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    padding: " 0px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",

                  }}
                >
                  <TotalsBox
                    odds={dragonTigerDetail?.total}
                    data={dragonTigerDetail}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <WinBox
                    odds={dragonTigerDetail?.win}
                    data={dragonTigerDetail}
                  />
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["A", "B"]}
                    type={cardGamesType.race20}
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
      <RulesModal show={show} setShow={setShow} rule={race20rules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default Race20Mobile;
