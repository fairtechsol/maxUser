import React from "react";
import "../style.scss";
import isMobile from "../../../../utils/screenDimension";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import {
  profitLossDataForMatchConstants,
  teamStatus,
} from "../../../../utils/constants";
import BetStatusOverlay from "../../../commonComponent/betComponents/betStatusOverlay";
import Overlay from "../overlay";
interface MarketTableProps {
  data: any;
  title?: any;
  matchDetails: any;
  minMax?: any;
  odds?: any;
  team?: any;
  indexForOverlay?: any;
}
const MarketRow = ({
  title,
  odds,
  data,
  matchDetails,
  team,
  indexForOverlay,
}: MarketTableProps) => {
  const dispatch: AppDispatch = useDispatch();
  const handlePlaceBet = (team: any, data: any) => {
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  const profitLoss =
    team === "teamA"
      ? matchDetails?.profitLossDataMatch?.[
          profitLossDataForMatchConstants[data.type]?.A
        ]
      : matchDetails?.profitLossDataMatch?.[
          profitLossDataForMatchConstants[data.type]?.B
        ];

  return (
    <div className="market-row-o" data-title="ACTIVE">
      <div className="market-nation-detail-o">
        <span className="market-nation-name-o ">{title}</span>
        <div
          className={`market-nation-book-o ${
            team === "teamA"
              ? profitLoss < 0
                ? "color-red"
                : "color-green"
              : profitLoss < 0
              ? "color-red"
              : "color-green"
          } `}
        >
          {profitLoss}
        </div>
      </div>

      <Overlay
        title={data?.runners?.[indexForOverlay]?.status.toLowerCase()}
        active={data?.activeStatus == "live" ? false : true}
      >
        {odds?.map((odd: any) => (
          <div
            key={odd?.id}
            className={`market-odd-box-o ${odd.className} `}
            style={{ width: "100%" }}
            onClick={() => {
              if (
                odd.value > 0 &&
                data?.runners?.[
                  team === "teamA" ? 0 : 1
                ]?.status?.toLowerCase() == teamStatus.active?.toLowerCase()
              ) {
                handlePlaceBet(
                  {
                    betOnTeam: team === "teamA" ? "UNDER" : "OVER",
                    rate: odd.value,
                    type: odd.type,
                    stake: 0,
                    teamA: "UNDER",
                    teamB: "OVER",
                    betId: data?.id,
                    eventType: matchDetails?.matchType,
                    matchId: matchDetails?.id,
                    placeIndex: odd.pI,
                    matchBetType: data?.type,
                    gameType: "other",
                  },
                  data
                );
              }
            }}
          >
            <span className="market-odd-o">{odd.value ?? "-"}</span>
            <span className="market-volume-o">{odd.volume}</span>
          </div>
        ))}
      </Overlay>
    </div>
  );
};

const OverUnderMarket2 = ({ minMax, data, matchDetails }: any) => {
  const getOdds = (teamIndex: number) => [
    {
      id: 1,
      className: "bg-blue1",
      value: data?.runners?.[teamIndex]?.ex?.availableToBack?.[2]?.price,
      volume: data?.runners?.[teamIndex]?.ex?.availableToBack?.[2]?.size,
      pI: 2,
      type: "back",
    },
    {
      id: 2,
      className: "bg-blue2",
      value: data?.runners?.[teamIndex]?.ex?.availableToBack?.[1]?.price,
      volume: data?.runners?.[teamIndex]?.ex?.availableToBack?.[1]?.size,
      pI: 1,
      type: "back",
    },
    {
      id: 3,
      className: "bg-blue3",
      value: data?.runners?.[teamIndex]?.ex?.availableToBack?.[0]?.price,
      volume: data?.runners?.[teamIndex]?.ex?.availableToBack?.[0]?.size,
      pI: 0,
      type: "back",
    },
    {
      id: 4,
      className: "bg-red1",
      value: data?.runners?.[teamIndex]?.ex?.availableToLay?.[0]?.price,
      volume: data?.runners?.[teamIndex]?.ex?.availableToLay?.[0]?.size,
      pI: 0,
      type: "lay",
    },
    {
      id: 5,
      className: "bg-red2",
      value: data?.runners?.[teamIndex]?.ex?.availableToLay?.[1]?.price,
      volume: data?.runners?.[teamIndex]?.ex?.availableToLay?.[1]?.size,
      pI: 1,
      type: "lay",
    },
    {
      id: 6,
      className: "bg-red3",
      value: data?.runners?.[teamIndex]?.ex?.availableToLay?.[2]?.price,
      volume: data?.runners?.[teamIndex]?.ex?.availableToLay?.[2]?.size,
      pI: 2,
      type: "lay",
    },
  ];
  return (
    <div className="game-market-o market-4-o">
      <div className="market-header-o d-flex">
        <div className="market-nation-detail-o">
          <span className="market-nation-name-o mt-1">{minMax}</span>
        </div>
        {!isMobile && (
          <>
            <div className="market-odd-box-o"></div>
            <div className="market-odd-box-o"></div>
          </>
        )}
        <div className="market-odd-box-o bg-blue3">
          <b>BACK</b>
        </div>
        <div className="market-odd-box-o bg-red1">
          <b>LAY</b>
        </div>
        <div className="market-odd-box-o"></div>
        <div className="market-odd-box-o"></div>
      </div>
      <div className="market-body-o" data-title="OPEN">
        <MarketRow
          title="Under"
          data={data}
          matchDetails={matchDetails}
          team="teamA"
          odds={getOdds(0)}
          indexForOverlay={0}
        />
        <MarketRow
          title="Over"
          data={data}
          matchDetails={matchDetails}
          team="teamB"
          odds={getOdds(1)}
          indexForOverlay={1}
        />
      </div>
    </div>
  );
};

export default OverUnderMarket2;
