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
import Card32Result from "../desktop/poker20";
import DynamicTable from "./betTable";
import "./style.scss";
// import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";

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
    setVideoFrameId(`${cardUrl}${cardGamesId?.poker20}`);
  }, []);

  return (
    <>
      <div>
        <div className="dt20header">
          <MobilePlacedBet show={show1} setShow={setShow1} />
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
              onClick={() => setShow(true)}
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
            <div style={{ width: "100%"}}>
              <div className="horseRacingTabHeader-m">
                <div>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {dragonTigerDetail?.name}
                  </span>
                </div>
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
                  result={<Card32Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <LoaderOnRefresh />
            ) : (
              <div>
                <div>
                  <DynamicTable
                    back={true}
                    odds={dragonTigerDetail?.odds}
                    data={dragonTigerDetail}
                    playerNum={[0, 10]}
                  />

                  <DynamicTable
                    back={false}
                    odds={dragonTigerDetail?.odds}
                    data={dragonTigerDetail}
                    playerNum={[10, 18]}
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
