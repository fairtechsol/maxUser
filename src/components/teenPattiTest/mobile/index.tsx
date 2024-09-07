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
import "./style.scss";
// import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import CasinoHead from "../../commonComponent/casinoGameHeader";

const TeenPattiMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [videoFrameId, setVideoFrameId] = useState("");
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
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

  const handleClose = () => {
    setShowInactivityModal(false);
  };

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
      betOnTeam:
        (rateType == "drate"
          ? "Dragon"
          : rateType == "lrate"
          ? "Lion"
          : "Tiger") +
        " " +
        item?.nation,
      name:
        (rateType == "drate"
          ? "Dragon"
          : rateType == "lrate"
          ? "Lion"
          : "Tiger") +
        " " +
        item?.nation,
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.teenTest}`);
  }, []);

  useEffect(() => {
    if (
      !(sections?.[0]?.dstatus === "True") ||
      sections?.[0]?.drate === "0.00"
    ) {
      dispatch(selectedBetAction(""));
    }
  }, [sections?.[0]?.dstatus, sections?.[0]?.drate]);

  return (
    <>
      <div>
          <MobilePlacedBet show={show1} setShow={setShow1} />
          <CasinoHead activeTab={activeTab} setActiveTab={setActiveTab} setShow={setShow} />

        {!activeTab ? (
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "100%", height: "250px" }}>
              <div
                style={{
                  width: "100%",
                  height: "20%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={
                    <TeenTestResult data={dragonTigerDetail?.videoInfo} />
                  }
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <LoaderOnRefresh />
            ) : (
              <div>
                <div style={{ width: "100%" }}>
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
                      <div
                        className="teen-back-m"
                        style={{
                          width: "60%",
                        }}
                      >
                        BACK
                      </div>
                    </div>

                    <div
                      className="teenPatti-table-row"
                      style={{ lineHeight: 1 }}
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
                          {playerA?.[0]?.nation}
                        </span>
                      </div>

                      <div
                        className="teenPatti-table-item"
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
                              {section.nation}
                            </span>
                          </div>

                          <div
                            style={{
                              width: "60%",
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <div
                             className={`${
                              section.dstatus !== "True" ? "teenPatti-table-item suspended" : "teenPatti-table-item"
                            }`}
                              style={{
                                width: "33.3%",
                                backgroundColor: "#72bbef",
                              }}
                              onClick={() =>
                                section.tstatus === "False"
                                  ? null
                                  : handleBet(
                                      section,
                                      "trate",
                                      section.tsection
                                    )
                              }
                            >
                              <span className="f12-b">{section.trate}</span>
                              <span
                                className={
                                  dragonTigerDetail?.profitLoss
                                    ? dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${section?.tsection}_card`
                                      ]
                                      ? dragonTigerDetail?.profitLoss[
                                          `${dragonTigerDetail?.videoInfo?.mid}_${section?.tsection}_card`
                                        ] > 0
                                        ? "color-green"
                                        : dragonTigerDetail?.profitLoss[
                                            `${dragonTigerDetail?.videoInfo?.mid}_${section?.tsection}_card`
                                          ] < 0
                                        ? "color-red"
                                        : ""
                                      : ""
                                    : ""
                                }
                                style={{ zIndex: "100" }}
                              >
                                {dragonTigerDetail?.profitLoss
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${section?.tsection}_card`
                                    ]
                                    ? dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${section?.tsection}_card`
                                      ]
                                    : ""
                                  : ""}
                              </span>
                            </div>

                            <div
                               className={`${
                                section.dstatus !== "True" ? "teenPatti-table-item suspended" : "teenPatti-table-item"
                              }`}
                              style={{
                                width: "33.3%",
                                backgroundColor: "#72bbef",
                              }}
                              onClick={() =>
                                section.lstatus === "False"
                                  ? null
                                  : handleBet(
                                      section,
                                      "lrate",
                                      section.lsection
                                    )
                              }
                            >
                              <span className="f12-b">{section.lrate}</span>
                              <span
                                className={
                                  dragonTigerDetail?.profitLoss
                                    ? dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${section?.lsection}_card`
                                      ]
                                      ? dragonTigerDetail?.profitLoss[
                                          `${dragonTigerDetail?.videoInfo?.mid}_${section?.lsection}_card`
                                        ] > 0
                                        ? "color-green"
                                        : dragonTigerDetail?.profitLoss[
                                            `${dragonTigerDetail?.videoInfo?.mid}_${section?.lsection}_card`
                                          ] < 0
                                        ? "color-red"
                                        : ""
                                      : ""
                                    : ""
                                }
                              >
                                {dragonTigerDetail?.profitLoss
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${section?.lsection}_card`
                                    ]
                                    ? dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${section?.lsection}_card`
                                      ]
                                    : ""
                                  : ""}
                              </span>
                            </div>

                            <div
                               className={`${
                                section.dstatus !== "True" ? "teenPatti-table-item suspended" : "teenPatti-table-item"
                              }`}
                              style={{
                                width: "33.3%",
                                backgroundColor: "#72bbef",
                              }}
                              onClick={() =>
                                section.dstatus === "False"
                                  ? null
                                  : handleBet(
                                      section,
                                      "drate",
                                      section.dsectionid
                                    )
                              }
                            >
                              <span className="f12-b">{section.drate}</span>
                              <span
                                className={
                                  dragonTigerDetail?.profitLoss
                                    ? dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${section?.dsectionid}_card`
                                      ]
                                      ? dragonTigerDetail?.profitLoss[
                                          `${dragonTigerDetail?.videoInfo?.mid}_${section?.dsectionid}_card`
                                        ] > 0
                                        ? "color-green"
                                        : dragonTigerDetail?.profitLoss[
                                            `${dragonTigerDetail?.videoInfo?.mid}_${section?.dsectionid}_card`
                                          ] < 0
                                        ? "color-red"
                                        : ""
                                      : ""
                                    : ""
                                }
                                style={{ zIndex: "100" }}
                              >
                                {dragonTigerDetail?.profitLoss
                                  ? dragonTigerDetail?.profitLoss[
                                      `${dragonTigerDetail?.videoInfo?.mid}_${section?.dsectionid}_card`
                                    ]
                                    ? dragonTigerDetail?.profitLoss[
                                        `${dragonTigerDetail?.videoInfo?.mid}_${section?.dsectionid}_card`
                                      ]
                                    : ""
                                  : ""}
                              </span>
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
                    name={["D", "T", "L"]}
                    type={"teen9"}
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
          <>
            <MobileMyBet />
          </>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={tprules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default TeenPattiMobile;
