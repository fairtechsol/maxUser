import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import {
  profitLossDataForMatchConstants,
  teamStatus,
} from "../../../../utils/constants";
import { isMobile } from "../../../../utils/screenDimension";
import Overlay from "../overlay";
import "../style.scss";

const MatchMarketRow = ({
  title,
  odds,
  data,
  matchDetails,
  team,
  indexForOverlay,
}: any) => {
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
      : team === "teamB"
      ? matchDetails?.profitLossDataMatch?.[
          profitLossDataForMatchConstants[data.type]?.B
        ]
      : matchDetails?.profitLossDataMatch?.[
          profitLossDataForMatchConstants[data.type]?.C
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
            style={{ width: "100%" }}
            className={`market-odd-box-o ${odd.className} `}
            onClick={() => {
              if (
                odd.value > 0 &&
                data?.runners?.[
                  team === "teamA" ? 0 : 1
                ]?.status?.toLowerCase() == teamStatus.active?.toLowerCase()
              ) {
                handlePlaceBet(
                  {
                    betOnTeam: title,
                    rate: odd.value,
                    type: odd.type,
                    stake: 0,
                    teamA: matchDetails?.teamA,
                    teamB: matchDetails?.teamB,
                    teamC: matchDetails?.teamC,
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

const FootballMatchOdds2 = ({ minMax, data, matchDetails }: any) => {
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
      <div className="market-body-o w-100" data-title="OPEN">
        <MatchMarketRow
          title={matchDetails?.["teamA"]}
          data={data}
          matchDetails={matchDetails}
          team="teamA"
          odds={getOdds(0)}
          indexForOverlay={0}
        />
        <MatchMarketRow
          title={matchDetails?.["teamB"]}
          data={data}
          matchDetails={matchDetails}
          team="teamB"
          odds={getOdds(1)}
          indexForOverlay={1}
        />
        {matchDetails?.teamC && (
          <MatchMarketRow
            title={matchDetails?.["teamC"]}
            data={data}
            matchDetails={matchDetails}
            team="teamC"
            odds={getOdds(2)}
            indexForOverlay={2}
          />
        )}
      </div>
    </div>
  );
};

export default FootballMatchOdds2;
