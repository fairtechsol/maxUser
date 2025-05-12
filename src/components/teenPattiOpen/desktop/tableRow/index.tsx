import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { HandleCards2 } from "../../../cardsComponent2";

const TeenPattiTableRow = ({
  player,
  pairPlus,
  indx,
  cardsA,
  handleBet,
}: any) => {
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  return (
    <div className="teenPatti-table-row" style={{ lineHeight: 1 }}>
      <div
        style={{
          width: "40%",
          height: "60px",
          padding: "10px",
          borderBottom: "0.1px solid #c7c8ca",
          borderLeft: "0.1px solid #c7c8ca",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          background: "#f2f2f2",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
          {player?.nation}
        </span>

        <HandleCards2 card={cardsA[indx] !== "1" ? cardsA[indx] : ""} />

        <HandleCards2 card={cardsA[9 + indx] !== "1" ? cardsA[indx + 9] : ""} />
        <HandleCards2
          card={cardsA[18 + indx] !== "1" ? cardsA[indx + 18] : ""}
        />
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
              ? "teenPatti-table-itemo suspended"
              : "teenPatti-table-itemo"
          }
          style={{ width: "50%" }}
          onClick={() => (player.gstatus === "0" ? null : handleBet(player))}
        >
          <span className={player.gstatus === "0" ? "f12-b mb-4" : "f12-b"}>
            {player.rate}
          </span>
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
              ? "teenPatti-table-itemo suspended "
              : "teenPatti-table-itemo"
          }
          style={{ width: "50%" }}
          onClick={() =>
            pairPlus.gstatus === "0" ? null : handleBet(pairPlus)
          }
        >
          <span className={player.gstatus === "0" ? "f12-b mb-4" : "f12-b"}>
            {pairPlus.nation}
          </span>
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
