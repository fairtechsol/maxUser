import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { formatNumber } from "../../../../helpers";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import "./style.scss";

const MarketComponent = ({ odds, data, min, max }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet = (item: any, type: any) => {
    let team = {
      bettingType: type === "back" ? "BACK" : "LAY",
      matchId: data?.id,
      odd: type === "back" ? item?.b1 : item?.l1,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: (item?.sid).toString(),
      min: data?.videoInfo?.min,
      max: data?.videoInfo?.max,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  const team1 = odds?.[0];
  const team2 = odds?.[1];

  useEffect(() => {
    if (
      team1?.status === "SUSPENDED" ||
      team1?.status === "CLOSED" ||
      team1?.b1 === "0.00"
    ) {
      dispatch(selectedBetAction(""));
    }
  }, [team1?.status, team1?.b1]);

  return (
    <div
      className="casino-detail detail-page-container-c position-relative w-100"
      style={{ background: "#f7f7f7" }}
    >
      <div className="game-market-c market-2" style={{ background: "f7f7f7" }}>
        <div className="marketHeader">
          <span
            style={{
              color: "#FFF",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Bookmaker
          </span>
        </div>
        <div className="market-header-c">
          <div className="market-nation-detail-b">
            <span
              className="f600"
              style={{ fontSize: "12px", color: "#097c93" }}
            >
              Min: {min} Max: {formatNumber(max)}
            </span>
          </div>
          <div className="market-odd-box-cd back" style={{ border: "0px" }}>
            <b style={{ color: "#333333" }}>Back</b>
          </div>
          <div className="market-odd-box-cd lay">
            <b style={{ color: "#333333" }}>Lay</b>
          </div>
        </div>
        <div className="market-body-c" data-title="OPEN">
          <div className={`market-row-c`}>
            <div className="market-nation-detail-b">
              <span
                className="market-nation-name-c"
                style={{ color: "#333333" }}
              >
                {team1?.nat}
              </span>
              <div className="market-nation-book-c" />
              <span
                className={`${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${team1?.sid}_card`
                      ]
                      ? JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${team1?.sid}_card`
                          ]
                        )["aus"] > 0
                        ? "color-green"
                        : JSON.parse(
                            data?.profitLoss[
                              `${data?.videoInfo?.mid}_${team1?.sid}_card`
                            ]
                          )["aus"] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${team1?.sid}_card`
                    ]
                    ? JSON.parse(
                        data?.profitLoss[
                          `${data?.videoInfo?.mid}_${team1?.sid}_card`
                        ]
                      )["aus"]
                    : ""
                  : ""}
              </span>
            </div>
            <div
              className={`market-row-c ${
                team1?.status === "SUSPENDED" || team1?.status === "CLOSED"
                  ? "suspended-row"
                  : ""
              }`}
              data-title={
                team1?.status === "SUSPENDED" || team1?.status === "CLOSED"
                  ? "SUSPENDED"
                  : "ACTIVE"
              }
            >
              <div
                className="market-odd-box-cd back lh-1"
                onClick={() =>
                  team1?.status === "SUSPENDED" ||
                  team1?.status === "CLOSED" ||
                  team1?.b1 === "0.00"
                    ? null
                    : handleBet(team1, "back")
                }
              >
                <span
                  className="market-odd-c f600"
                  style={{ color: "#333333" }}
                >
                  {team1?.status === "SUSPENDED" || team1?.status === "CLOSED"
                    ? "-"
                    : team1?.b1}
                </span>
                <span className="market-volume-c" style={{ color: "#333333" }}>
                  {team1?.bs1}
                </span>
              </div>
              <div
                className="market-odd-box-cd lay lh-1"
                onClick={() =>
                  team1?.status === "SUSPENDED" ||
                  team1?.status === "CLOSED" ||
                  team1?.l1 === "0.00"
                    ? null
                    : handleBet(team1, "lay")
                }
              >
                <span className="market-odd-c f600">
                  {team1?.status === "SUSPENDED" ||
                  team1?.status === "CLOSED" ||
                  team1?.l1 === "0.00"
                    ? "-"
                    : team1?.l1}
                </span>
                <span className="market-volume">{team1?.ls1}</span>
              </div>
            </div>
          </div>
          <div className={`market-row-c`}>
            <div className="market-nation-detail-b">
              <span
                className="market-nation-name-c"
                style={{ color: "#333333" }}
              >
                {team2?.nat}
              </span>
              <div className="market-nation-book-c" />
              <span
                className={`${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${team1?.sid}_card`
                      ]
                      ? JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${team1?.sid}_card`
                          ]
                        )["ind"] > 0
                        ? "color-green"
                        : JSON.parse(
                            data?.profitLoss[
                              `${data?.videoInfo?.mid}_${team1?.sid}_card`
                            ]
                          )["ind"] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${team1?.sid}_card`
                    ]
                    ? JSON.parse(
                        data?.profitLoss[
                          `${data?.videoInfo?.mid}_${team1?.sid}_card`
                        ]
                      )["ind"]
                    : ""
                  : ""}
              </span>
            </div>
            <div
              className={`market-row-c ${
                team2?.status === "SUSPENDED" || team2?.status === "CLOSED"
                  ? "suspended-row"
                  : ""
              }`}
              data-title={
                team2?.status === "SUSPENDED" || team2?.status === "CLOSED"
                  ? "SUSPENDED"
                  : "ACTIVE"
              }
            >
              <div
                className="market-odd-box-cd back lh-1"
                onClick={() =>
                  team2?.status === "SUSPENDED" ||
                  team2?.status === "CLOSED" ||
                  team2?.b1 === "0.00"
                    ? null
                    : handleBet(team2, "back")
                }
              >
                <span
                  className="market-odd-c f600"
                  style={{ color: "#333333" }}
                >
                  {team2?.status === "SUSPENDED" || team2?.status === "CLOSED"
                    ? "-"
                    : team2?.b1}
                </span>
                <span className="market-volume-c" style={{ color: "#333333" }}>
                  {team2?.bs1}
                </span>
              </div>
              <div
                className="market-odd-box-cd lay lh-1"
                onClick={() =>
                  team2?.status === "SUSPENDED" ||
                  team2?.status === "CLOSED" ||
                  team2?.l1 === "0.00"
                    ? null
                    : handleBet(team2, "lay")
                }
              >
                <span className="market-odd-c f600">
                  {team2?.status === "SUSPENDED" ||
                  team2?.status === "CLOSED" ||
                  team2?.l1 === "0.00"
                    ? "-"
                    : team2?.l1}
                </span>
                <span className="market-volume">{team2?.ls1}</span>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>

      {/* {showFancy && (
        <div
          className="game-market market-6 mt-2"
          style={{ background: "#f7f7f7" }}
        >
          <div className="market-title">
            <span
              style={{
                color: "#FFF",
                //fontSize: "16px",
                fontWeight:"bold",
                fontSize: "calc(11px + 0.46vw)", 
              }}
            >
              Fancy
            </span>
          </div>
          <div className="market-header-c" style={{ width: "100%" }}>
            <div
              className="market-nation-detail-c"
              style={{ width: "55%" }}
             />
            <div style={{ width: "45%", display: "flex" }}>
              <div className="market-odd-box-cd lay">
                <b>No</b>
              </div>
              <div className="market-odd-box-cd back">
                <b>Yes</b>
              </div>
              <div className="fancy-min-max-box ">
                <b style={{ color: "rgb(247, 247, 247)" }}>Yes</b>
              </div>
            </div>
          </div>
          <div className="market-body-c" data-title="OPEN">
            {showFancy?.length > 0 &&
              showFancy?.map((row: any, index: any) => (
                <div className={`fancy-market`}>
                  <div className="market-row-" style={{ display: "flex" }}>
                    <div
                      className="market-nation-detail-c"
                      style={{ width: "55%" }}
                    >
                      <span className="market-nation-name-c pointer">
                        {row.nation}
                      </span>
                      <div className="market-nation-book-c" />
                    </div>
                    <div
                      className={`market-row- ${
                        row.suspended ? "suspended-row" : ""
                      }`}
                      data-title={row.suspended ? "SUSPENDED" : "ACTIVE"}
                      key={index}
                      style={{ display: "flex", width: "45%" }}
                    >
                      <div className="market-odd-box-cd lay">
                        <span
                          className="market-odd-c"
                          style={{ fontWeight: "bold" }}
                        >
                          {row?.b1}
                        </span>
                        <span className="market-volume">{row?.bs1}</span>
                      </div>
                      <div className="market-odd-box-cd back">
                        <span
                          className="market-odd-c"
                          style={{ fontWeight: "bold" }}
                        >
                          {row.l1}
                        </span>
                        <span className="market-volume">{row?.ls1}</span>
                      </div>
                      <div className="fancy-min-max-box">
                        <div className="fancy-min-max">
                          <span
                            className="w-100 d-block"
                            style={{
                              fontSize: "12px",
                              color: "#097c93",
                              fontWeight: "bold",
                            }}
                          >
                            Min: 100.00
                          </span>
                          <span
                            className="w-100 d-block"
                            style={{
                              fontSize: "12px",
                              color: "#097c93",
                              fontWeight: "bold",
                            }}
                          >
                            Max: 1L
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MarketComponent;
