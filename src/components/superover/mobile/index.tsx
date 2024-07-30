import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { card32rules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import PlacedBet from "./placeBet";
import "./style.scss";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import { cardGamesId, cardUrl, rulesData } from "../../../utils/constants";
import Bookmaker from "../desktop/bookmaker";
import ScoreBoard from "../../commonComponent/scoreBoard";
import { Table } from "react-bootstrap";
import SuperoverResult from "../desktop/superOver";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";

const SuperoverMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [show, setShow] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const [show1, setShow1] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);

  const { dragonTigerDetail, scoreBoardData, loading } = useSelector(
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.superover}`);
  }, []);

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
              onClick={() => setShow(true)}
            >
              Rules
            </span>
            <span>
              {" "}
              {dragonTigerDetail?.videoInfo
                ? `Round ID:  ${handleRoundId(
                    dragonTigerDetail?.videoInfo?.mid
                  )}`
                : ""}{" "}
            </span>
          </div>
        </div>

        {!activeTab ? (
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "100%",
                  // height: scoreBoardData?.data ? "280px" : "250px",
                }}
              >
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
                   {scoreBoardData?.data && (
                    <ScoreBoard data={scoreBoardData?.data} />
                  )}
                  <VideoFrame
                    time={dragonTigerDetail?.videoInfo?.autotime}
                    result={
                      <SuperoverResult data={dragonTigerDetail?.videoInfo} />
                    }
                    id={videoFrameId}
                  />
                </div>
              </div>
            </div>

            {loading ? (
              <InnerLoader />
            ) : (
              <div>
                <div className="" style={{ width: "100%", gap: "10px" }}>
                  <div className="w-100">
                    <Bookmaker
                      title={"Bookmaker"}
                      min={dragonTigerDetail?.videoInfo?.min}
                      max={dragonTigerDetail?.videoInfo?.max}
                      matchOddsData={dragonTigerDetail?.bookmaker}
                      data={dragonTigerDetail}
                    />
                  </div>
                </div>

                <div style={{ width: "100%", marginTop: "5px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["E", "R", "T"]}
                    type={"superover"}
                  />
                </div>
                <div className="sidebar-box place-bet-container super-over-rule">
                  <div className="marketHeader">
                    ENGLAND vs RSA Inning's Card Rules
                  </div>
                  <div className="table-responsive">
                    <Table className="table-over">
                      <thead>
                        <tr>
                          <th>Cards</th>
                          <th className="text-center">Count</th>
                          <th className="text-end">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rulesData?.map((rule, index) => (
                          <tr key={index}>
                            <td>
                              <img
                                src={rule.cardImage}
                                alt="Card"
                                className="ms-2"
                              />
                              <span className="ms-2">X</span>
                            </td>
                            <td className="text-center">{rule.count}</td>
                            <td className="text-end">
                              {rule.valueText ? (
                                <span>
                                  {rule.valueText}
                                  <img src={rule.valueImage} alt="Value" />
                                </span>
                              ) : (
                                <img src={rule.valueImage} alt="Value" />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
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

      <RulesModal show={show} setShow={setShow} rule={card32rules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default SuperoverMobile;
