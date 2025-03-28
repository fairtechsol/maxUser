import { Table } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tprules } from "../../../assets/images";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { cardGamesId, cardUrl } from "../../../utils/constants";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import CasinoHead from "../../commonComponent/casinoGameHeader";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import NewLoader from "../../commonComponent/newLoader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import TeenOpenResult from "../desktop/teenCard";
import "./style.scss";
import TeenPattiTableRow from "./tableRow";

const TeenPattiMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
  const { players, pairsPlus } = dragonTigerDetail;
  const rules = [
    { label: "Pair (Double)", value: "1 To 1" },
    { label: "Flush (Color)", value: "1 To 4" },
    { label: "Straight (Rown)", value: "1 To 6" },
    { label: "Trio (Teen)", value: "1 To 35" },
    { label: "Straight Flush (Pakki Rown)", value: "1 To 45" },
  ];
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: dragonTigerDetail?.id,
      odd: item?.rate,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nation,
      name: item?.nation,
      bettingName: "Match odds",
      selectionId: item?.sid,
      min: item?.min,
      max: item?.max,
    };
    dispatch(
      selectedBetAction({
        team,
        dragonTigerDetail,
      })
    );
  };

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
  const extractCardAndPlayerInfo = (cardsString: any) => {
    let cardsPart = cardsString;
    let playersPart = "";

    if (cardsString?.includes("#")) {
      [cardsPart, playersPart] = cardsString.split("#");
    }

    const cardsArray = cardsPart?.split(",");

    const playersArray = playersPart
      ? playersPart?.match(/\d+/g)?.map(Number)
      : [];

    return {
      cardsArray,
      playersArray,
    };
  };
  const { cardsArray: cardsArray1, playersArray: playersArray1 } =
    extractCardAndPlayerInfo(dragonTigerDetail?.videoInfo?.cards);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.teenOpen}`);
  }, []);

  useEffect(() => {
    if (
      players?.player1?.gstatus === "0" ||
      players?.player1?.rate === "0.00"
    ) {
      dispatch(selectedBetAction(""));
    }
  }, [players?.player1?.gstatus, players?.player1?.rate]);

  return (
    <>
      <div>
        <MobilePlacedBet show={show1} setShow={setShow1} />
        <CasinoHead
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setShow={setShow}
        />

        {!activeTab ? (
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  width: "100%",
                  height: "20%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<TeenOpenResult data={cardsArray1} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div>
                <div style={{ width: "100%" }}>
                  <div className="teenPatti-table-container-open">
                    <div className="teenPatti-table-row">
                      <div
                        style={{
                          width: "40%",
                          borderLeft: "0.1px solid #c7c8ca",
                          borderBottom: "0.1px solid #c7c8ca",
                          textAlign: "left",
                        }}
                      ></div>
                      <div
                        style={{
                          width: "60%",

                          textAlign: "left",
                          display: "flex",
                        }}
                      >
                        <div
                          className="teen-back-m"
                          style={{
                            border: "0.5px solid #dee2e6",
                            width: "50%",
                            padding: "2px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <span className="f5-b title-12">Odds</span>
                        </div>
                        <div
                          className="teen-back-m"
                          style={{
                            width: "50%",
                            border: "0.5px solid #dee2e6",
                          }}
                        >
                          <span className="f5-b title-12">Pair Plus</span>
                        </div>
                      </div>
                    </div>

                    {players &&
                      Object?.keys(players)?.map((key, index) => (
                        <TeenPattiTableRow
                          key={key}
                          indx={index}
                          player={players[key]}
                          pairPlus={pairsPlus[`pairPlus${index + 1}`]}
                          handleBet={handleBet}
                          cardsA={cardsArray1}
                          playersA={playersArray1}
                        />
                      ))}
                  </div>
                </div>

                <div style={{ width: "100%", marginTop: "15px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["R", "R", "R"]}
                    type={"teen8"}
                  />
                </div>
                <div>
                  <div
                    className="casino-title mt-2"
                    style={{ position: "relative" }}
                  >
                    <span>Rules</span>
                  </div>
                  <div className="table-responsive rules-table">
                    <Table bordered>
                      <thead>
                        <tr>
                          <th colSpan={2} className="box-10 text-center">
                            Pair Plus
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rules.map((item, index) => (
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
          <MobileMyBet />
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={tprules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default TeenPattiMobile;
