import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  profitLossDataForMatchConstants,
  teamStatus,
} from "../../../../utils/constants";
import { calculateProfitLoss } from "../../../../utils/matchDetailsBetCalculation";
import isMobile from "../../../../utils/screenDimension";
import BackLayBox from "../../../commonComponent/betComponents/backLayBox";
import BetStatusOverlay from "../../../commonComponent/betComponents/betStatusOverlay";
import "./style.scss";

interface MatchOddsProps {
  minMax?: any;
  data: any;
  matchDetails?: any;
  backLayCount?: number;
}
function SetWinner({
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
  let arr = ["A", "B", "C"];
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
      if (matchDetails?.profitLossDataMatch?.[`userTeam${matchs}RateSetWinner${data?.name[data?.name?.length-1]}`]) {
        return (
        Number(matchDetails?.profitLossDataMatch?.[`userTeam${matchs}RateSetWinner${data?.name[data?.name?.length-1]}`]) || 0
        );
      } else {
        return (
          Number(matchDetails?.profitLossDataMatch?.[`userTeam${matchs}RateSetWinner${data?.name[data?.name?.length-1]}`]) || 0
        );
      }
    }
  };
  return (
    <div
      className={`gameTable table-responsive sessionFancyTable borderTable border `}
    >
      <Table className="mb-0">
        <thead>
          <tr>
            <th className="border-0">
              {minMax && isMobile && (
                <span className="f700 title-14">{minMax}</span>
              )}
            </th>
            {!isMobile && (
              <>
                <th className="border-0 match-odd-bet-place"></th>
                <th className="border-0 match-odd-bet-place"></th>
              </>
            )}
            <th className="text-center bg-blue3 match-odd-bet-place f400">
              {" "}
              BACK
            </th>
            <th className="text-center bg-red1 match-odd-bet-place f400">
              LAY
            </th>
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
                <tr key={indexes}>
                  <td>
                    <div className="backLayRunner d-flex flex-column px-1 w-100">
                      <span
                        className={`backLayRunner-country title-12  ${
                          isMobile ? "f900" : "f500"
                        } `}
                      >
                        {matchDetails?.[`team${matchs}`]}
                      </span>
                      <div className="d-flex align-items-center justify-content-between w-100">
                        <span
                          className={`title-14  ${
                            matchDetails?.profitLossDataMatch?.[
                              profitLossDataForMatchConstants[data?.type][
                                matchs
                              ]
                            ] < 0
                              ? "color-red"
                              : "color-green"
                          }`}
                        >
                          {matchDetails?.profitLossDataMatch?.[
                            profitLossDataForMatchConstants[data?.type][matchs]
                          ]
                            ? matchDetails?.profitLossDataMatch?.[
                                profitLossDataForMatchConstants[data?.type][
                                  matchs
                                ]
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
                            ? (Number(
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
                              )).toFixed(2)
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
                            customClass="match-odd-bet-place"
                            bgColor={`blue${index + 1}`}
                            rate={
                              +data?.runners?.[indexes]?.ex?.availableToBack?.[
                                (isMobile ? 0 : 2) - index
                              ]?.price || 0
                            }
                            percent={
                              data?.runners?.[indexes]?.ex?.availableToBack?.[
                                (isMobile ? 0 : 2) - index
                              ]?.size
                            }
                            onClick={() => {
                              const rate = parseFloat(
                                data?.runners?.[indexes]?.ex?.availableToBack?.[
                                  (isMobile ? 0 : 2) - index
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
                                    teamA: matchDetails?.teamA,
                                    teamB: matchDetails?.teamB,
                                    teamC: matchDetails?.teamC
                                      ? matchDetails?.teamC
                                      : "",
                                    betId: data?.id,
                                    eventType: matchDetails?.matchType,
                                    matchId: matchDetails?.id,
                                    placeIndex: (isMobile ? 0 : 2) - index,
                                    matchBetType: data?.type,
                                    gameType: "other",
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
                            customClass="match-odd-bet-place"
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
                                    betOnTeam: matchDetails?.[`team${matchs}`],
                                    rate: rate,
                                    type: "lay",
                                    stake: 0,
                                    teamA: matchDetails?.teamA,
                                    teamB: matchDetails?.teamB,
                                    teamC: matchDetails?.teamC
                                      ? matchDetails?.teamC
                                      : "",
                                    betId: data?.id,
                                    eventType: matchDetails?.matchType,
                                    matchId: matchDetails?.id,
                                    placeIndex: index,
                                    matchBetType: data?.type,
                                    gameType: "other",
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

                  {!isMobile && <td></td>}
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default SetWinner;
