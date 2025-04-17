import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { HandleCards2 } from "../../../cardsComponent2";

const TeenPattiTableRow = ({
  player,
  pairPlus,
  handleBet,
  indx,
  cardsA,
}: any) => {
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  return (
    <div className="teenPatti-table-row" style={{ lineHeight: 1 }}>
      <div
        className="ps-2 py-2"
        style={{
          width: "40%",
          borderBottom: "0.1px solid #c7c8ca",
          borderLeft: "0.1px solid #c7c8ca",
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          minHeight: "46px",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
          {player.nation}
        </span>
        <span className="d-flex row ps-2 gap-1">
          <HandleCards2 card={cardsA[indx] !== "1" ? cardsA[indx] : ""} />

          <HandleCards2
            card={cardsA[9 + indx] !== "1" ? cardsA[indx + 9] : ""}
          />
          <HandleCards2
            card={cardsA[18 + indx] !== "1" ? cardsA[indx + 18] : ""}
          />
        </span>
      </div>
      <div
        style={{
          width: "60%",
          backgroundColor: "#72bbef",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          className={
            player.gstatus === "0"
              ? "teenPatti-table-itemo suspended-box2"
              : "teenPatti-table-itemo"
          }
          style={{ width: "50%" }}
          onClick={() => (player.gstatus === "0" ? null : handleBet(player))}
        >
          <span className="f12-b">{player.rate}</span>
          <span
            className={`title-12 ${"profit-loss-class"} ${
              dragonTigerDetail?.profitLoss
                ? dragonTigerDetail?.profitLoss[
                    `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                  ]
                  ? dragonTigerDetail?.profitLoss[
                      `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : dragonTigerDetail?.profitLoss[
                        `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
            style={{ zIndex: "100" }}
          >
            {" "}
            {dragonTigerDetail?.profitLoss
              ? dragonTigerDetail?.profitLoss[
                  `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                ]
                ? dragonTigerDetail?.profitLoss[
                    `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                  ]
                : 0
              : 0}
          </span>
        </div>
        <div
          className={
            player.gstatus === "0"
              ? "teenPatti-table-itemo suspended-box2"
              : "teenPatti-table-itemo"
          }
          style={{ width: "50%" }}
          onClick={() =>
            pairPlus.gstatus === "0" ? null : handleBet(pairPlus)
          }
        >
          <span className="f12-b">{pairPlus.nation}</span>
          <span
            className={`title-12 ${"profit-loss-class"} ${
              dragonTigerDetail?.profitLoss
                ? dragonTigerDetail?.profitLoss[
                    `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                  ]
                  ? dragonTigerDetail?.profitLoss[
                      `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : dragonTigerDetail?.profitLoss[
                        `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
            style={{ zIndex: "100" }}
          >
            {dragonTigerDetail?.profitLoss
              ? dragonTigerDetail?.profitLoss[
                  `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                ]
                ? dragonTigerDetail?.profitLoss[
                    `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                  ]
                : 0
              : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeenPattiTableRow;
