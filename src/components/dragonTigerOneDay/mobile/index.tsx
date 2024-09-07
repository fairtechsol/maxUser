import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dtrules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import BackLay from "../desktop/BackLay";
import Dragon20Result from "../desktop/dragonCard";
import CardBox from "./CardsBox";
import OddEven from "./OddEvenBox";
import PairBox from "./PairBox";
import "./style.scss";
// import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import CasinoHead from "../../commonComponent/casinoGameHeader";

const DragonTigerMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [show, setShow] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId.dragonTigerOneDay}`
  );
  const [show1, setShow1] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);

  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
  const { placedBets } = useSelector((state: RootState) => state.bets);

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
    setVideoFrameId(`${cardUrl}${cardGamesId?.dragonTigerOneDay}`);
  }, []);

  return (
    <>
      <div>
          <MobilePlacedBet show={show1} setShow={setShow1} />
          <CasinoHead activeTab={activeTab} setActiveTab={setActiveTab} setShow={setShow} />

        {!activeTab ? (
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#000",
              }}
            >
              <div style={{ width: "100%", height: "275px" }}>
                <div
                  style={{
                    width: "100%",
                    height: "90%",
                    backgroundColor: "#000",
                  }}
                >
                  <VideoFrame
                    time={dragonTigerDetail?.videoInfo?.autotime}
                    result={
                      <Dragon20Result data={dragonTigerDetail?.videoInfo} />
                    }
                    id={videoFrameId}
                  />
                </div>
              </div>
            </div>
            {loading ? (
              <LoaderOnRefresh />
            ) : (
              <div style={{ height: "760px" }}>
                <div className="" style={{ width: "97%", gap: "10px" }}>
                  <div className="w-100">
                    <BackLay
                      matchOddsData={dragonTigerDetail?.matchOddsData}
                      data={dragonTigerDetail}
                    />
                  </div>
                  <div className="w-100">
                    <PairBox
                      odds={dragonTigerDetail?.pair}
                      data={dragonTigerDetail}
                    />
                  </div>
                </div>
                <div style={{ width: "97%", gap: "8px" }}>
                  <OddEven
                    title1={"even"}
                    title2={"odd"}
                    dragonData={dragonTigerDetail?.dragonData}
                    tigerData={dragonTigerDetail?.tigerData}
                    data={dragonTigerDetail}
                  />
                  <OddEven
                    title1={"red"}
                    title2={"black"}
                    dragonData={dragonTigerDetail?.dragonData}
                    tigerData={dragonTigerDetail?.tigerData}
                    data={dragonTigerDetail}
                  />
                </div>
                <div style={{ width: "97%" }}>
                  <CardBox
                    dragonData={dragonTigerDetail?.dragonData}
                    tigerData={dragonTigerDetail?.tigerData}
                    data={dragonTigerDetail}
                  />
                </div>
                <div style={{ width: "97%", margin: "5px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["D", "T"]}
                    type={cardGamesType.dragonTigerOneDay}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <MobileMyBet />
          </>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={dtrules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default DragonTigerMobile;
