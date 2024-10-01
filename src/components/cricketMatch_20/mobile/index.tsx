
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crick20rules } from "../../../assets/images";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { cardGamesId, cardUrl } from "../../../utils/constants";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import CasinoHead from "../../commonComponent/casinoGameHeader";
import NewLoader from "../../commonComponent/newLoader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Teen20Result from "../desktop/teenCard";
import MyBet from "./myBet";
import ScoreBox from "./scoreBox";
import "./style.scss";
const CricketMatch20Mobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const [show1, setShow1] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
  const { leftBoard, rightBoard } = dragonTigerDetail;
  const [profitLossData, setProfitLossData] = useState<
    Record<string, ProfitLoss>
  >({});
  const handleBet = (item: any, type: any) => {
    let team = {
      bettingType: type,
      matchId: dragonTigerDetail?.id,
      odd: type === "BACK" ? item?.b1 : item.l1,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: item?.sid,
      min:item?.min,
      max:item?.max
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
  }, [lastActivityTime, show]);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.cmatch20}`);
  }, []);

  type ProfitLoss = {
    pl: number;
    run: number | string;
  };

  useEffect(() => {
    if (
      dragonTigerDetail?.profitLoss?.[
        `${dragonTigerDetail?.videoInfo?.mid}_1_card`
      ]
    ) {
      const parsedData = JSON.parse(
        dragonTigerDetail.profitLoss[
          `${dragonTigerDetail.videoInfo.mid}_1_card`
        ]
      );
      setProfitLossData(parsedData);
    } else setProfitLossData({});
  }, [dragonTigerDetail]);

  useEffect(() => {
    if (leftBoard?.[0]?.gstatus === "SUSPENDED" || leftBoard?.[0]?.b1 ==="0.00") {
      dispatch(selectedBetAction(""));
    } else {
    }
  }, [leftBoard?.[0]?.gstatus,leftBoard?.[0]?.b1]);

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
                  result={<Teen20Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                  profitLoss={profitLossData}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div style={{}}>
                <div style={{ width: "100%" }}>
                  <div className="teenPatti-table-container-m">
                    <div
                      style={{
                        width: "100%",

                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          background: "#F2F2F2",
                          padding: "5px",
                        }}
                      >
                        {leftBoard &&
                          rightBoard &&
                          [...leftBoard, ...rightBoard]?.map(
                            (item: any, index: any) => (
                              <div style={{marginBottom:"60px"}}>
                                <ScoreBox
                                  teamA="Team A"
                                  teamAScore={`${dragonTigerDetail?.videoInfo?.C2}/${dragonTigerDetail?.videoInfo?.C3}`}
                                  teamAOver={dragonTigerDetail?.videoInfo?.C4}
                                  teamB="Team B"
                                  teamBScore={`${dragonTigerDetail?.videoInfo?.C5}/${dragonTigerDetail?.videoInfo?.C6}`}
                                  teamBOver={dragonTigerDetail?.videoInfo?.C7}
                                  ballIconUrl={`https://versionobj.ecoassetsservice.com/v13/static/front/img/balls/cricket20/ball${
                                    2 + index
                                  }.png`}
                                  backOdds={item.b1}
                                  layOdds={item.l1}
                                  handleBet={handleBet}
                                  item={item}
                                  runs={
                                    Object.keys(profitLossData).length > 0
                                      ? profitLossData[String(2 + index)]
                                          ?.run ?? 0
                                      : 0
                                  }
                                />
                              </div>
                            )
                          )}
                      </div>
                    </div>
                    <div className="ticker-container">
                      <div className="ticker-wrap">
                        <div
                          className="ticker-move"
                          style={{
                            color: "#097c93",
                            fontWeight: "700",
                            fontSize: "12px",
                          }}
                        >
                          {dragonTigerDetail?.videoInfo &&
                            dragonTigerDetail?.videoInfo.remark}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ width: "100%", marginTop: "15px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                    type={"cmatch20"}
                  />
                </div>
                <div>
                  <div
                    className="casino-title"
                    style={{ position: "relative" }}
                  >
                    <span>Rules</span>
                  </div>
                  {/* <div className="table-responsive rules-table">
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
                  </div> */}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <MyBet />
          </>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={crick20rules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default CricketMatch20Mobile;
