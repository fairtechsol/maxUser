import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import "./style.scss";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

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

  return (
    <div className="casino-detail detail-page-container-c position-relative">
      <div className="game-market w-100">
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
          <div className="market-odd-box-c back ">
            <b>Back</b>
          </div>
          <div className="market-odd-box-c lay">
            <b>Lay</b>
          </div>
        </div>
        <div className="market-body-c" data-title="OPEN">
          {odds?.map((row: any, index: any) => (
            <div className={`market-row-c`}>
              <div className="market-nation-detail-b">
                <span className="market-nation-name-c">{row?.nat}</span>
                <div className="market-nation-book-c"></div>
                <span
                  className={`${
                    data?.profitLoss
                      ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                        ? JSON.parse(
                            data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                          )[row?.nat?.toLowerCase()] > 0
                          ? "color-green"
                          : JSON.parse(
                              data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                            )[row?.nat?.toLowerCase()] < 0
                          ? "color-red"
                          : ""
                        : ""
                      : ""
                  }`}
                >
                  {data?.profitLoss
                    ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      ? JSON.parse(
                          data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                        )[row?.nat?.toLowerCase()]
                      : 0
                    : 0}
                </span>
              </div>
              <div
                className={`market-row-c ${
                  row?.status === "SUSPENDED" ? "suspended-row" : ""
                }`}
                data-title={
                  row?.status === "SUSPENDED" ? "SUSPENDED" : "ACTIVE"
                }
                key={index}
              >
                <div
                  className="market-odd-box-c back"
                  onClick={() =>
                    row?.status === "SUSPENDED" ? null : handleBet(row, "back")
                  }
                >
                  <span className="market-odd-c">{row?.b1}</span>
                  <span className="market-volume-c">{row?.bs1}</span>
                </div>
                <div
                  className="market-odd-box-c lay"
                  onClick={() =>
                    row?.status === "SUSPENDED" ? null : handleBet(row, "lay")
                  }
                >
                  <span className="market-odd-c">{row?.l1}</span>
                  <span className="market-volume">{row?.ls1}</span>
                </div>
              </div>
            </div>
          ))}
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
