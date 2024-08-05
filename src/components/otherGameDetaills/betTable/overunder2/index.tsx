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

const MarketRow = ({ title, odds, data, matchDetails, team }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handlePlaceBet = (team: any, data: any) => {
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  return (
    <div className="market-row-o" data-title="ACTIVE">
      <div className="market-nation-detail-o">
        <span className="market-nation-name-o ">{title}</span>
        <div
          className={`market-nation-book-o ${
            team === "teamA"
              ? matchDetails?.profitLossDataMatch[
                  profitLossDataForMatchConstants[data?.type]?.A
                ] < 0
                ? "color-red"
                : "color-green"
              : matchDetails?.profitLossDataMatch[
                  profitLossDataForMatchConstants[data?.type]?.B
                ] < 0
              ? "color-red"
              : "color-green"
          }`}
        >
          {team === "teamA"
            ? matchDetails?.profitLossDataMatch[
                profitLossDataForMatchConstants[data?.type]?.A
              ] ?? 0
            : matchDetails?.profitLossDataMatch[
                profitLossDataForMatchConstants[data?.type]?.B
              ] ?? 0}
        </div>
      </div>
      {odds?.map((odd: any) => (
        <div
          key={odd?.id}
          className={`market-odd-box-o ${odd.className}`}
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
    </div>
  );
};

const OverUnderMarket2 = ({ minMax, data, matchDetails }: any) => {
  return (
    <div className="game-market-o market-4-o">
      <div className="market-header-o d-flex">
        <div className="market-nation-detail-o">
          <span className="market-nation-name-o">
            Max: {minMax.max} / Min: {minMax.min}
          </span>
        </div>
        {!isMobile && (
          <>
            <div className="market-odd-box-o"></div>
            <div className="market-odd-box-o"></div>
          </>
        )}
        <div className="market-odd-box-o back">
          <b>BACK</b>
        </div>
        <div className="market-odd-box-o lay">
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
          odds={[
            {
              id: 1,
              className: "back2",
              value: data?.runners?.[0]?.ex?.availableToBack?.[2]?.price,
              volume: data?.runners?.[0]?.ex?.availableToBack?.[2]?.size,
              pI: 2,
              type: "back",
            },
            {
              id: 2,
              className: "back1",
              value: data?.runners?.[0]?.ex?.availableToBack?.[1]?.price,
              volume: data?.runners?.[0]?.ex?.availableToBack?.[1]?.size,
              pI: 1,
              type: "back",
            },
            {
              id: 3,
              className: "back",
              value: data?.runners?.[0]?.ex?.availableToBack?.[0]?.price,
              volume: data?.runners?.[0]?.ex?.availableToBack?.[0]?.size,
              pI: 0,
              type: "back",
            },
            {
              id: 4,
              className: "lay",
              value: data?.runners?.[0]?.ex?.availableToLay?.[0]?.price,
              volume: data?.runners?.[0]?.ex?.availableToLay?.[0]?.size,
              pI: 0,
              type: "lay",
            },
            {
              id: 5,
              className: "lay1",
              value: data?.runners?.[0]?.ex?.availableToLay?.[1]?.price,
              volume: data?.runners?.[0]?.ex?.availableToLay?.[1]?.size,
              pI: 1,
              type: "lay",
            },
            {
              id: 6,
              className: "lay2",
              value: data?.runners?.[0]?.ex?.availableToLay?.[2]?.price,
              volume: data?.runners?.[0]?.ex?.availableToLay?.[2]?.size,
              pI: 2,
              type: "lay",
            },
          ]}
        />
        <MarketRow
          title="Over"
          data={data}
          matchDetails={matchDetails}
          team="teamB"
          odds={[
            {
              id: 1,
              className: "back2",
              value: data?.runners?.[1]?.ex?.availableToBack?.[2]?.price,
              volume: data?.runners?.[1]?.ex?.availableToBack?.[2]?.size,
              pI: 2,
              type: "back",
            },
            {
              id: 2,
              className: "back1",
              value: data?.runners?.[1]?.ex?.availableToBack?.[1]?.price,
              volume: data?.runners?.[1]?.ex?.availableToBack?.[1]?.size,
              pI: 1,
              type: "back",
            },
            {
              id: 3,
              className: "back",
              value: data?.runners?.[1]?.ex?.availableToBack?.[0]?.price,
              volume: data?.runners?.[1]?.ex?.availableToBack?.[0]?.size,
              pI: 0,
              type: "back",
            },
            {
              id: 4,
              className: "lay",
              value: data?.runners?.[1]?.ex?.availableToLay?.[0]?.price,
              volume: data?.runners?.[1]?.ex?.availableToLay?.[0]?.size,
              pI: 0,
              type: "lay",
            },
            {
              id: 5,
              className: "lay1",
              value: data?.runners?.[1]?.ex?.availableToLay?.[1]?.price,
              volume: data?.runners?.[1]?.ex?.availableToLay?.[1]?.size,
              pI: 1,
              type: "lay",
            },
            {
              id: 6,
              className: "lay2",
              value: data?.runners?.[1]?.ex?.availableToLay?.[2]?.price,
              volume: data?.runners?.[1]?.ex?.availableToLay?.[2]?.size,
              pI: 2,
              type: "lay",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default OverUnderMarket2;
