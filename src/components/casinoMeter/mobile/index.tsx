import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { cardGamesId, cardUrl } from "../../../utils/constants";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import CasinoWarResult from "../desktop/teenCard";
import "./style.scss";
// import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import CasinoHead from "../../commonComponent/casinoGameHeader";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import NewLoader from "../../commonComponent/newLoader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import HighCards from "../desktop/High";
import LowCards from "../desktop/Low";
import Meter from "../desktop/meter";

const CasinoMeterMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [modalType, setModalType] = useState("imageWithContent");
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.cmeter}`);
  }, []);

  useEffect(() => {
    if (
      dragonTigerDetail?.players?.[0]?.[0]?.gstatus === "0" ||
      dragonTigerDetail?.players?.[0]?.[0]?.b1 === "0.00"
    ) {
      dispatch(selectedBetAction(""));
    }
  }, [
    dragonTigerDetail?.players?.[0]?.[0]?.gstatus,
    dragonTigerDetail?.players?.[0]?.[0]?.b1,
  ]);

  return (
    <>
      <div>
          <MobilePlacedBet show={show1} setShow={setShow1} />
          <CasinoHead activeTab={activeTab} setActiveTab={setActiveTab} setShow={setShow} />

        {!activeTab ? (
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "100%"}}>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={
                    <CasinoWarResult data={dragonTigerDetail?.videoInfo} />
                  }
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div>
                {dragonTigerDetail?.videoInfo?.cards?.split(",")[0] !== "1" && (
                  <Meter
                    data={dragonTigerDetail?.videoInfo?.cards}
                    runPosition={
                      dragonTigerDetail?.videoInfo?.mid ==
                      placedBets?.[0]?.runnerId
                        ? placedBets?.[0]?.teamName == "Low"
                          ? "Low"
                          : "High"
                        : ""
                    }
                  />
                )}
                <div
                  style={{
                    width: "98%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems:"center",
                    gap: "10px",
                    paddingTop: "10px",
                    paddingLeft:"7px",
                    
                  }}
                >
                  <LowCards
                    odds={dragonTigerDetail.low}
                    data={dragonTigerDetail}
                    placedLow={
                      dragonTigerDetail?.videoInfo?.mid ==
                      placedBets?.[0]?.runnerId
                        ? placedBets?.[0]?.teamName == "Low"
                          ? true
                          : false
                        : true
                    }
                  />
                  <HighCards
                    odds={dragonTigerDetail.high}
                    data={dragonTigerDetail}
                    placedHigh={
                      dragonTigerDetail?.videoInfo?.mid ==
                      placedBets?.[0]?.runnerId
                        ? placedBets?.[0]?.teamName == "High"
                          ? true
                          : false
                        : true
                    }
                  />
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["R", "R"]}
                    type={"cmeter"}
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
      <RulesModal show={show} setShow={setShow}  type={"imageWithContent"} gameType="cmeter"/>
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default CasinoMeterMobile;
