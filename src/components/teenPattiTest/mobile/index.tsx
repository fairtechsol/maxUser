import { Table } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tprules } from "../../../assets/images";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { cardGamesId, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import TeenTestResult from "../desktop/teenCard";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";

const TeenPattiMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId.teenTest}`
  );
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const { playerA } = dragonTigerDetail;
  const { sections, videoInfo } = dragonTigerDetail;
  const { placedBets } = useSelector((state: RootState) => state.bets);
  const rules = [
    { label: "Pair (Double)", value: "1 To 1" },
    { label: "Flush (Color)", value: "1 To 4" },
    { label: "Straight (Rown)", value: "1 To 6" },
    { label: "Trio (Teen)", value: "1 To 35" },
    { label: "Straight Flush (Pakki Rown)", value: "1 To 45" },
  ];
  
  const handleBet = (item: any, rateType: string, sectionId: string) => {
    const rate =
      rateType === "drate"
        ? item.drate
        : rateType === "lrate"
        ? item.lrate
        : item.trate;

    let team = {
      bettingType: "BACK",
      matchId: dragonTigerDetail?.id,
      odd: rate,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: sectionId,
    };

    dispatch(
      selectedBetAction({
        team,
        dragonTigerDetail,
      })
    );
  };
  

  useEffect(() => {
    const resetTimer = () => {
      setLastActivityTime(Date.now());
    };

    const checkInactivity = () => {
      if (Date.now() - lastActivityTime > 5 * 60 * 1000) {
        setShow(true);
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
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "100%", height: "250px" }}>
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
                  height: "20%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<TeenTestResult data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            <div style={{  }}>
              <div className="mt-2" style={{ width: "100%" }}>
                <div className="teenPatti-table-container-m">
                  <div className="teenPatti-table-row">
                    <div
                      style={{
                        width: "40%",
                        border: "0.1px solid #dee2e6",
                        textAlign: "left",
                      }}
                    >
                      <span className="f12-b">
                        Min: {dragonTigerDetail?.videoInfo?.min} Max:{" "}
                        {dragonTigerDetail?.videoInfo?.max}
                      </span>
                    </div>
                    <div className="teen-back-m"  style={{
                        width: "60%",}}>BACK</div>
                  </div>
                 
                  <div className="teenPatti-table-row" style={{ lineHeight: 1 }}>
                  <div
                    style={{
                      width: "40%",
                      padding: "10px",
                      border: "0.1px solid #fff",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
                      {playerA?.[0]?.nat}
                    </span>
                  </div>

                  <div
                    className="teenPatti-table-item"
                    style={{ width: "20%", backgroundColor: "#72bbef" }}
                   
                  >
                    <span className="f12-b">{"LION"}</span>
                  </div>
                  <div
                    className={`teenPatti-table-item ${
                      playerA?.[0]?.gstatus != "0" &&
                      playerA?.[1]?.gstatus === "0"
                        ? "suspended"
                        : ""
                    }`}
                    style={{ width: "20%", backgroundColor: "#72bbef" }}
                   
                  >
                    <span className="f12-b">{"TIGER"}</span>
                  </div>
                  <div
                    className={`teenPatti-table-item ${
                      playerA?.[0]?.gstatus != "0" &&
                      playerA?.[1]?.gstatus === "0"
                        ? "suspended"
                        : ""
                    }`}
                    style={{ width: "20%", backgroundColor: "#72bbef" }}
                   
                  >
                    <span className="f12-b">{"DRAGON"}</span>
                  </div>
                </div>

                {sections &&
                  sections.map((section: any, index: any) => (
                    <div
                      className="teenPatti-table-row"
                      style={{ lineHeight: 1 }}
                      key={index}
                    >
                      <div
                        style={{
                          width: "40%",
                          padding: "10px",
                          border: "0.1px solid #fff",
                        }}
                      >
                        <span
                          style={{ fontSize: "14px", fontWeight: "bolder" }}
                        >
                          {section.nat}
                        </span>
                      </div>

                      <div
                        className={`${
                          section.dstatus !== true ? "suspended" : ""
                        }`}
                        style={{
                          width: "60%",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          className={`teenPatti-table-item`}
                          style={{ width: "33.3%", backgroundColor: "#72bbef" }}
                          onClick={() =>
                            section.dstatus === false
                              ? null
                              : handleBet(section, "drate", section.dsectionid)
                          }
                        >
                          <span className="f12-b">{section.drate}</span>
                          <span className="f10-b">0</span>
                        </div>

                        <div
                          className={`teenPatti-table-item`}
                          style={{ width: "33.3%", backgroundColor: "#72bbef" }}
                          onClick={() =>
                            section.lstatus === false
                              ? null
                              : handleBet(section, "lrate", section.lsection)
                          }
                        >
                          <span className="f12-b">{section.lrate}</span>
                          <span className="f10-b">0</span>
                        </div>

                        <div
                          className={`teenPatti-table-item`}
                          style={{ width: "33.3%", backgroundColor: "#72bbef" }}
                          onClick={() =>
                            section.tstatus === false
                              ? null
                              : handleBet(section, "trate", section.tsection)
                          }
                        >
                          <span className="f12-b">{section.trate}</span>
                          <span className="f10-b">0</span>
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="ticker-container">
                  <div className="ticker-wrap">
                    <div
                      className="ticker-move"
                      style={{ color: "#8b0000", fontWeight: "700" }}
                    >
                      {videoInfo && videoInfo.remark}
                    </div>
                  </div>
                </div>

                 
                </div>
              </div>

              <div style={{ width: "100%", marginTop: "15px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["A", "T", "B"]}
                  type={"teen9"}
                />
              </div>
              <div>
                <div className="casino-title" style={{ position: "relative" }}>
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
          </div>
        ) : (
          <>
            <MyBet />
          </>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={tprules} />
    </>
  );
};

export default TeenPattiMobile;
