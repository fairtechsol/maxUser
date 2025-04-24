import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { p6rules } from "../../../assets/images";
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
import "../../horseRacing/mobile/betTable/style.scss";
import Card32Result from "../desktop/poker20";
import PlayerTable from "./playerBox";
import "./style.scss";
const Poker20Mobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.poker20}`);
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
                  result={<Card32Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <PlayerTable
                    title={"PlayerA"}
                    odds={dragonTigerDetail?.PlayerA}
                    data={dragonTigerDetail}
                    playerNum={[0, 10]}
                  />
                  <div style={{ width: "10px" }}></div>
                  <PlayerTable
                    title={"PlayerB"}
                    odds={dragonTigerDetail?.PlayerB}
                    data={dragonTigerDetail}
                    playerNum={[0, 10]}
                  />
                </div>
                <div style={{ marginTop: "10px" }}>
                  {" "}
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["A", "B", "T"]}
                    type={cardGamesType.poker20}
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
      <RulesModal show={show} setShow={setShow} rule={p6rules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default Poker20Mobile;
