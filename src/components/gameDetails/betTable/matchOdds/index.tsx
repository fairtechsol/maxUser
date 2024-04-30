import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { teamStatus } from "../../../../utils/constants";
import { calculateProfitLoss } from "../../../../utils/matchDetailsBetCalculation";
import isMobile from "../../../../utils/screenDimension";
import BackLayBox from "../../../commonComponent/betComponents/backLayBox";
import BetStatusOverlay from "../../../commonComponent/betComponents/betStatusOverlay";
import "../style.scss";
import "./style.scss";

interface MatchOddsProps {
  minMax?: any;
  data: any;
  matchDetails?: any;
  backLayCount?: number;
}
function MatchOdds({
  minMax,
  data,
  matchDetails,
  backLayCount,
}: MatchOddsProps) {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = (team: any, data: any) => {
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
  let arr = [];
  if (data?.type === "completeMatch" || data?.type === "tiedMatch1") {
    arr = ["A", "B"];
  } else {
    arr = ["A", "B", "C"];
  }
  const calculateValue = (
    data: any,
    indexs: number,
    matchDetails: any,
    matchs: any
  ) => {
    if (data?.type === "tiedMatch1") {
      if (indexs === 0) {
        return Number(matchDetails?.profitLossDataMatch?.yesRateTie) || 0;
      } else {
        return Number(matchDetails?.profitLossDataMatch?.noRateTie) || 0;
      }
    } else if (data?.type === "completeMatch") {
      if (indexs === 0) {
        return Number(matchDetails?.profitLossDataMatch?.yesRateComplete) || 0;
      } else {
        return Number(matchDetails?.profitLossDataMatch?.noRateComplete) || 0;
      }
    } else {
      if (matchDetails?.profitLossDataMatch?.[`team${matchs}Rate`]) {
        return (
          Number(matchDetails?.profitLossDataMatch?.[`team${matchs}Rate`]) || 0
        );
      } else {
        return (
          Number(matchDetails?.profitLossDataMatch?.[`team${matchs}Rate`]) || 0
        );
      }
    }
  };
  return (
    <div
      className={`gameTable table-responsive sessionFancyTable borderTable border`}
    >
      <Table className="mb-0">
        <thead>
          <tr>
            <th className="border-0 px-2">
              {minMax && isMobile && (
                <span className="f700 title-14">{minMax}</span>
              )}
            </th>
            {/* {isMobile && (
              <>
                <th className="text-center bg-blue1 bet-place-box50 f400">BACK</th>
                <th className="text-center bg-red1 bet-place-box50 f400">LAY</th>
              </>
            )} */}
            {!isMobile && (
              <>
                <th className="border-0 match-odd-bet-place"></th>
                <th className="border-0 match-odd-bet-place"></th>
              </>
            )}
            {!isMobile && (
              <>
                <th className="text-center bg-blue1 match-odd-bet-place f400">
                  BACK
                </th>
                <th className="text-center bg-red1 match-odd-bet-place f400">
                  LAY
                </th>
              </>
            )}
            {isMobile && (
              <>
                {data?.type === "bookmaker" ? (
                  <>
                    <th className="border-0 match-odd-bet-place"></th>
                    <th className="bg-blue1 text-center match-odd-bet-placem f400 w-20 title-14">
                      BACK
                    </th>
                    <th className="bg-red1 text-center match-odd-bet-placem f400 w-20 title-14">
                      LAY
                    </th>
                    <th className="border-0 match-odd-bet-place"></th>
                  </>
                ) : (
                  <>
                    <th className="bg-blue1 text-center match-odd-bet-place f400 title-14">
                      BACK
                    </th>
                    <th className="bg-red1 text-center match-odd-bet-place f400 title-14">
                      LAY
                    </th>
                  </>
                )}
              </>
            )}
            {!isMobile && (
              <>
                <th className="border-0 match-odd-bet-place"></th>
                <th className="border-0 match-odd-bet-place"></th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {arr
            ?.filter((item) => matchDetails?.[`team${item}`] != null)
            ?.map((matchs, indexes) => {
              return (
                <tr className="overlay-trigger" key={indexes}>
                  <td>
                    <div className="backLayRunner d-flex flex-column px-1 w-100 mt-1">
                      <span 
                        className={`backLayRunner-countrytrunc title-12  ${
                          isMobile ? "f500" : "f500"
                        } `}
                      >
                        {data?.type === "completeMatch" ||
                        data?.type === "tiedMatch1"
                          ? indexes === 0
                            ? "YES"
                            : "NO"
                          : matchDetails?.[`team${matchs}`]}
                        {/* {!isMobile && (
                          data?.type === "completeMatch" ||
                            data?.type === "tiedMatch1" ?
                            (indexes === 0 ? "YES" : "NO") :
                            matchDetails?.[`team${matchs}`]
                        )}
                        {isMobile && (data?.type === "completeMatch" || data?.type === "tiedMatch1") && (
                          (indexes === 0 ? "YES" : "NO")
                        )}
                        {isMobile && data?.type !== "bookmaker" && data?.type !== "completeMatch" && data?.type !== "tiedMatch1" && (
                          matchDetails?.[`team${matchs}`]
                        )}
                        {(data?.type === "bookmaker" && isMobile) && (
                          matchDetails?.[`team${matchs}`]?.split(' ').slice(0, 2).join(' ') + (matchDetails?.[`team${matchs}`]?.split(' ').length > 2 ? ' ...' : ''))} */}
                      </span>
                      <div className="d-flex align-items-center justify-content-between w-100 mt-1">
                        <span
                          className={`title-14 mt-1  ${
                            data?.type === "tiedMatch1"
                              ? indexes === 0
                                ? matchDetails?.profitLossDataMatch
                                    ?.yesRateTie < 0
                                  ? "color-red"
                                  : "color-green"
                                : matchDetails?.profitLossDataMatch?.noRateTie <
                                  0
                                ? "color-red"
                                : "color-green"
                              : data?.type === "completeMatch"
                              ? indexes === 0
                                ? matchDetails?.profitLossDataMatch
                                    ?.yesRateComplete < 0
                                  ? "color-red"
                                  : "color-green"
                                : matchDetails?.profitLossDataMatch
                                    ?.noRateComplete < 0
                                ? "color-red"
                                : "color-green"
                              : matchDetails?.profitLossDataMatch?.[
                                  `team${matchs}Rate`
                                ] < 0
                              ? "color-red"
                              : "color-green"
                          }`}
                        >
                          {data?.type === "tiedMatch1"
                            ? indexes === 0
                              ? matchDetails?.profitLossDataMatch?.yesRateTie ??
                                0
                              : matchDetails?.profitLossDataMatch?.noRateTie ??
                                0
                            : data?.type === "completeMatch"
                            ? indexes === 0
                              ? matchDetails?.profitLossDataMatch
                                  ?.yesRateComplete ?? 0
                              : matchDetails?.profitLossDataMatch
                                  ?.noRateComplete ?? 0
                            : matchDetails?.profitLossDataMatch?.[
                                `team${matchs}Rate`
                              ]
                            ? matchDetails?.profitLossDataMatch?.[
                                `team${matchs}Rate`
                              ]
                            : 0}
                        </span>
                        <span
                          className={`title-14 ${
                            Number(
                              calculateProfitLoss(
                                data,
                                selectedBet,
                                data?.type === "completeMatch" ||
                                  data?.type === "tiedMatch1"
                                  ? indexes === 0
                                    ? "YES"
                                    : "NO"
                                  : matchDetails?.[`team${matchs}`]
                              ) || 0
                            ) < 0
                              ? "color-red"
                              : Number(
                                  calculateProfitLoss(
                                    data,
                                    selectedBet,
                                    data?.type === "completeMatch" ||
                                      data?.type === "tiedMatch1"
                                      ? indexes === 0
                                        ? "YES"
                                        : "NO"
                                      : matchDetails?.[`team${matchs}`]
                                  ) || 0
                                ) > 0
                              ? "color-green"
                              : ""
                          }`}
                        >
                          {selectedBet?.team?.stake > 0 &&
                          selectedBet?.data?.type == data.type
                            ? Number(
                                calculateProfitLoss(
                                  data,
                                  selectedBet,
                                  data?.type === "completeMatch" ||
                                    data?.type === "tiedMatch1"
                                    ? indexes === 0
                                      ? "YES"
                                      : "NO"
                                    : matchDetails?.[`team${matchs}`]
                                )
                              ) +
                              Number(
                                calculateValue(
                                  data,
                                  indexes,
                                  matchDetails,
                                  matchs
                                )
                              )
                            : null}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td colSpan={backLayCount === 2 ? 2 : 6}>
                    <BetStatusOverlay
                      title={data?.runners?.[indexes]?.status.toLowerCase()}
                      active={
                        data?.activeStatus == "live" &&
                        data?.runners?.[indexes]?.status.toLowerCase() ===
                          "active"
                          ? false
                          : true
                      }
                    >
                      {new Array(backLayCount == 2 ? 1 : 3)
                        .fill(0)
                        ?.map((_: any, index: number) => (
                          <BackLayBox
                            key={index}
                            // customClass={isMobile ? (data?.type === "bookmaker" ? "bet-place-box50") : (data?.type === "bookmaker" ? "bookmaker-bet-place" : "bookmaker-bet-place")}
                            customClass={
                              isMobile
                                ? data?.type === "bookmaker"
                                  ? "bet-place-box50"
                                  : "bookmaker-bet-place"
                                : data?.type === "bookmaker"
                                ? "match-odd-bet-place"
                                : "match-odd-bet-place"
                            }
                            bgColor={`blue${index + 1}`}
                            rate={
                              +data?.runners?.[indexes]?.ex?.availableToBack?.[
                                (isMobile ? (backLayCount === 6 ? 2 : 0) : 2) -
                                  index
                              ]?.price || 0
                            }
                            percent={
                              data?.runners?.[indexes]?.ex?.availableToBack?.[
                                (isMobile ? (backLayCount === 6 ? 2 : 0) : 2) -
                                  index
                              ]?.size
                            }
                            onClick={() => {
                              const rate = parseFloat(
                                data?.runners?.[indexes]?.ex?.availableToBack?.[
                                  (isMobile
                                    ? backLayCount === 6
                                      ? 2
                                      : 0
                                    : 2) - index
                                ]?.price || 0
                              );

                              if (
                                rate > 0 &&
                                data?.runners?.[
                                  indexes
                                ]?.status?.toLowerCase() ==
                                  teamStatus.active?.toLowerCase()
                              ) {
                                handleClick(
                                  {
                                    betOnTeam:
                                      data?.type === "completeMatch" ||
                                      data?.type === "tiedMatch1"
                                        ? indexes === 0
                                          ? "YES"
                                          : "NO"
                                        : matchDetails?.[`team${matchs}`],
                                    rate: rate,
                                    type: "back",
                                    stake: 0,
                                    teamA:
                                      data?.type === "completeMatch" ||
                                      data?.type === "tiedMatch1"
                                        ? "YES"
                                        : matchDetails?.teamA,
                                    teamB:
                                      data?.type === "completeMatch" ||
                                      data?.type === "tiedMatch1"
                                        ? "NO"
                                        : matchDetails?.teamB,
                                    teamC: matchDetails?.teamC
                                      ? matchDetails?.teamC
                                      : "",
                                    betId: data?.id,
                                    eventType: matchDetails?.matchType,
                                    matchId: matchDetails?.id,
                                    placeIndex:
                                      (isMobile
                                        ? backLayCount === 6
                                          ? 2
                                          : 0
                                        : 2) - index,
                                    matchBetType: data?.type,
                                  },
                                  data
                                );
                              }
                            }}
                            active={
                              data?.runners?.[indexes]?.status
                                .toLowerCase()
                                ?.toLowerCase() !=
                              teamStatus.active?.toLowerCase()
                            }
                          />
                        ))}
                      {new Array(backLayCount == 2 ? 1 : 3)
                        .fill(0)
                        ?.map((_: any, index: number) => (
                          <BackLayBox
                            key={index}
                            // customClass={isMobile ? "bookmaker-bet-place" : "bookmaker-bet-place"}
                            customClass={
                              isMobile
                                ? data?.type === "bookmaker"
                                  ? "bet-place-box50"
                                  : "bookmaker-bet-place"
                                : "match-odd-bet-place"
                            }
                            // customClass={isMobile ? (data?.type === "bookmaker" ? "bet-place-box50" : "bookmaker-bet-place") : (data?.type === "bookmaker" ? "match-odd-bet-place" : "match-odd-bet-place")}
                            bgColor={`red${index + 1}`}
                            rate={
                              +data?.runners?.[indexes]?.ex?.availableToLay?.[
                                index
                              ]?.price || 0
                            }
                            percent={
                              data?.runners?.[indexes]?.ex?.availableToLay?.[
                                index
                              ]?.size
                            }
                            onClick={() => {
                              const rate = parseFloat(
                                data?.runners?.[indexes]?.ex?.availableToLay?.[
                                  index
                                ]?.price || 0
                              );
                              if (
                                rate > 0 &&
                                data?.runners?.[
                                  indexes
                                ]?.status.toLowerCase() == teamStatus.active
                              ) {
                                handleClick(
                                  {
                                    betOnTeam:
                                      data?.type === "completeMatch" ||
                                      data?.type === "tiedMatch1"
                                        ? indexes === 0
                                          ? "YES"
                                          : "NO"
                                        : matchDetails?.[`team${matchs}`],
                                    rate: rate,
                                    type: "lay",
                                    stake: 0,
                                    teamA:
                                      data?.type === "completeMatch" ||
                                      data?.type === "tiedMatch1"
                                        ? "YES"
                                        : matchDetails?.teamA,
                                    teamB:
                                      data?.type === "completeMatch" ||
                                      data?.type === "tiedMatch1"
                                        ? "NO"
                                        : matchDetails?.teamB,
                                    teamC: matchDetails?.teamC
                                      ? matchDetails?.teamC
                                      : "",
                                    betId: data?.id,
                                    eventType: matchDetails?.matchType,
                                    matchId: matchDetails?.id,
                                    placeIndex: index,
                                    matchBetType: data?.type,
                                  },
                                  data
                                );
                              }
                            }}
                            active={
                              data?.runners?.[indexes]?.status
                                .toLowerCase()
                                ?.toLowerCase() !=
                              teamStatus.active?.toLowerCase()
                            }
                          />
                        ))}
                    </BetStatusOverlay>
                  </td>
                  {data?.activeStatus !== "live" ? (
                    <div className="overlay"></div>
                  ) : null}
                  {/* {!isMobile && <td></td>} */}
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default MatchOdds;
