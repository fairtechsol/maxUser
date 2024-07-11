import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import "./style.scss";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
// const bookmakerData = [
//   { nation: 'AUS', backOdd: '1.3', backVolume: '300000.00', layOdd: '1.34', layVolume: '300000.00', suspended: true },
//   { nation: 'IND', backOdd: '-', backVolume: '0.00', layOdd: '-', layVolume: '0.00', suspended: true },
// ];

const fancyData = [
  { nation: "Ind Over 3", backOdd: "-", layOdd: "-", suspended: true },
];

const MarketComponent = ({ showFancy, odds, data, min, max }: any) => {
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
      selectionId: item?.sid,
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

  console.log('first',odds)
  return (
    <div className="casino-detail detail-page-container-c position-relative">
      <div className="game-market-c market-2">
        <div className="market-title">
          <span>Bookmaker</span>
        </div>
        <div className="market-header-c">
          <div className="market-nation-detail-b">
            <span
              className="f600"
              style={{ fontSize: "12px", color: "#097c93" }}
            >
              Min: {min} Max: {max}
            </span>
          </div>
          <div className="market-odd-box-c back">
            <b>Back</b>
          </div>
          <div className="market-odd-box-c lay">
            <b>Lay</b>
          </div>
        </div>
        <div className="market-body-c" data-title="OPEN">
          {/* {odds?.map((row:any, index:any) => ( */}
          <div className={`market-row-c`}>
            <div className="market-nation-detail-b">
              <span className="market-nation-name-c">{team1?.nat}</span>
              <div className="market-nation-book-c"></div>
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
                    : 0
                  : 0}
              </span>
            </div>
            <div
              className={`market-row-c ${
                team1?.status === "SUSPENDED" || team1?.status === "CLOSED" ? "suspended-row" : ""
              }`}
              data-title={
                team1?.status === "SUSPENDED" || team1?.status === "CLOSED" ? "SUSPENDED" : "ACTIVE"
              }
            >
              <div
                className="market-odd-box-c back lh-1"
                onClick={() =>
                  team1?.status === "SUSPENDED" || team1?.status === "CLOSED" || team1?.b1 === "0.00"
                    ? null
                    : handleBet(team1, "back")
                }
              >
                <span className="market-odd-c f600">
                  {team1?.b1 === "0.00" ? "-" : team1?.b1}
                </span>
                <span className="market-volume-c">{team1?.bs1}</span>
              </div>
              <div
                className="market-odd-box-c lay lh-1"
                onClick={() =>
                  team1?.status === "SUSPENDED" || team1?.status === "CLOSED" || team1?.l1 === "0.00" ? null : handleBet(team1, "lay")
                }
              >
                <span className="market-odd-c f600">
                  {team1?.l1 === "0.00" ? "-" : team1?.l1}
                </span>
                <span className="market-volume">{team1?.ls1}</span>
              </div>
            </div>
          </div>
          <div className={`market-row-c`}>
            <div className="market-nation-detail-b">
              <span className="market-nation-name-c">{team2?.nat}</span>
              <div className="market-nation-book-c"></div>
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
                    : 0
                  : 0}
              </span>
            </div>
            <div
              className={`market-row-c ${
                team2?.status === "SUSPENDED" || team2?.status === "CLOSED"? "suspended-row" : ""
              }`}
              data-title={
                team2?.status === "SUSPENDED" || team2?.status === "CLOSED"? "SUSPENDED" : "ACTIVE"
              }
            >
              <div
                className="market-odd-box-c back lh-1"
                onClick={() =>
                  team2?.status === "SUSPENDED" || team2?.status === "CLOSED" || team2?.b1 === "0.00" 
                    ? null
                    : handleBet(team2, "back")
                }
              >
                <span className="market-odd-c f600">
                  {team2?.b1 === "0.00" ? "-" : team2?.b1}
                </span>
                <span className="market-volume-c">{team2?.bs1}</span>
              </div>
              <div
                className="market-odd-box-c lay lh-1"
                onClick={() =>
                  team2?.status === "SUSPENDED" || team2?.status === "CLOSED" || team2?.l1 === "0.00" ? null : handleBet(team2, "lay")
                }
              >
                <span className="market-odd-c f600">
                  {team2?.l1 === "0.00" ? "-" : team2?.l1}
                </span>
                <span className="market-volume">{team2?.ls1}</span>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>

      {showFancy && (
        <div className="game-market market-6 mt-2">
          <div className="market-title">
            <span>Fancy</span>
          </div>
          <div className="market-header-c">
            <div className="market-nation-detail-c"></div>
            <div className="market-odd-box-c lay">
              <b>No</b>
            </div>
            <div className="market-odd-box-c back">
              <b>Yes</b>
            </div>
            <div className="fancy-min-max-box"></div>
          </div>
          <div className="market-body-c" data-title="OPEN">
            {fancyData?.map((row: any, index: any) => (
              <div className={`fancy-market`}>
                <div className="market-row-c">
                  <div className="market-nation-detail-c">
                    <span className="market-nation-name-c pointer">
                      {row.nation}
                    </span>
                    <div className="market-nation-book-c"></div>
                  </div>
                  <div
                    className={`market-row-c ${
                      row.suspended ? "suspended-row" : ""
                    }`}
                    data-title={row.suspended ? "SUSPENDED" : "ACTIVE"}
                    key={index}
                  >
                    <div className="market-odd-box-c lay">
                      <span className="market-odd-c">{row.layOdd}</span>
                    </div>
                    <div className="market-odd-box-c back">
                      <span className="market-odd-c">{row.backOdd}</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100.00</span>
                        <span className="w-100 d-block">Max: 1L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketComponent;
