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

interface BookmakerTableProps {
  minMax?: any;
  data: any;
  backLayCount?: number;
  matchDetails?: any;
}
function BookmakerTable({
  minMax,
  data,
  backLayCount = 6,
  matchDetails,
}: BookmakerTableProps) {
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
  if (data?.type === "tiedMatch2") {
    arr = ["A", "B"];
  } else {
    arr = ["A", "B", "C"];
  }

  return (
    <div
      className={`gameTable table-responsive sessionFancyTable borderTable border `}
    >
      <Table className="mb-0">
        <thead>
          <tr>
            <th
              className="border-0 px-2"
              colSpan={isMobile && backLayCount === 6 ? 3 : 0}
            >
              <div className="px-2 text-info">
                {minMax &&
                  (isMobile ? (
                    <span className="f900 title-12 px-2 text-black">
                      {minMax}
                    </span>
                  ) : (
                    <span className="f700 title-16 px-2 text-info ">
                      {minMax}
                    </span>
                  ))}
              </div>
            </th>
            {backLayCount === 6 && !isMobile && (
              <>
                <th className="border-0 bookmaker-bet-place"></th>
                <th className="border-0 bookmaker-bet-place"></th>
              </>
            )}

            {isMobile && backLayCount != 2 ? (
              <>
                <th colSpan={6} className={`text-center d-flex w-100`}>
                  <div className="bookmaker-width-26"></div>
                  <div className="bookmaker-width-26"></div>
                  <div className={`text-center bg-blue3 bookmaker-width-26`}>
                    Back
                  </div>
                  <div className={`text-center bg-red1 bookmaker-width-26`}>
                    Lay
                  </div>
                  <div className="bookmaker-width-26"></div>
                  <div className="bookmaker-width-26"></div>
                </th>
              </>
            ) : (
              <>
                <th className={`text-center bg-blue3 bookmaker-bet-place`}>
                  Back
                </th>
                <th className={`text-center bg-red1 bookmaker-bet-place`}>
                  Lay
                </th>
              </>
            )}

            {backLayCount === 6 && !isMobile && (
              <th
                colSpan={isMobile ? 3 : 1}
                className="border-0 bookmaker-bet-place"
              ></th>
            )}
            {!isMobile && <th className="border-0 bookmaker-bet-place"></th>}
          </tr>
        </thead>
        <tbody>
          {arr
            ?.filter((item) => matchDetails?.[`team${item}`] != null)
            ?.map((item: any, i: number) => (
              <tr key={i}>
                <td>
                  <div className="backLayRunner d-flex flex-column px-1 w-100">
                    <span
                      className={`backLayRunner-country title-12  ${
                        isMobile ? "f900" : "f600"
                      } `}
                    >
                      {data?.type === "tiedMatch2"
                        ? i === 0
                          ? "Yes"
                          : "No"
                        : matchDetails?.[`team${item}`]}
                    </span>
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <span className="title-14">{0}</span>
                      <span
                        className={`title-14 ${
                          Number(
                            calculateProfitLoss(
                              data,
                              selectedBet,
                              matchDetails?.[`team${item}`]
                            ) || 0
                          ) < 0
                            ? "color-red"
                            : Number(
                                calculateProfitLoss(
                                  data,
                                  selectedBet,
                                  matchDetails?.[`team${item}`]
                                ) || 0
                              ) > 0
                            ? "color-green"
                            : ""
                        }`}
                      >
                        {calculateProfitLoss(
                          data,
                          selectedBet,
                          matchDetails?.[`team${item}`]
                        )}
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  colSpan={backLayCount === 2 ? 2 : 6}
                  className={
                    isMobile && backLayCount != 2 ? "bookmaker-block-width" : ""
                  }
                >
                  <BetStatusOverlay
                    title={data?.[`statusTeam${item}`]}
                    active={data?.[`statusTeam${item}`] != teamStatus.active}
                  >
                    {new Array(backLayCount == 2 ? 1 : 3)
                      .fill(0)
                      ?.map((_: any, index: number) => (
                        <BackLayBox
                          key={index}
                          customClass={`bookmaker-bet-place ${
                            isMobile && backLayCount != 2
                              ? "bookmaker-width-26"
                              : ""
                          }`}
                          bgColor={`blue${index + 1}`}
                          rate={data[`backTeam${item}`] - 2 + index}
                          onClick={() => {
                            const rate =
                              parseInt(data[`backTeam${item}`] || 0) -
                              2 +
                              index;
                            if (
                              rate > 0 &&
                              data?.[`statusTeam${item}`] == teamStatus.active
                            ) {
                              handleClick(
                                {
                                  betOnTeam: matchDetails?.[`team${item}`],
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
                                  placeIndex: 2 - index,
                                  matchBetType: data?.type,
                                },
                                data
                              );
                            }
                          }}
                          active={
                            data?.[`statusTeam${item}`] != teamStatus.active
                          }
                        />
                      ))}
                    {new Array(backLayCount == 2 ? 1 : 3)
                      .fill(0)
                      ?.map((_: any, index: number) => (
                        <BackLayBox
                          key={index}
                          customClass={`bookmaker-bet-place ${
                            isMobile && backLayCount != 2
                              ? "bookmaker-width-26"
                              : ""
                          }`}
                          bgColor={`red${index + 1}`}
                          rate={data[`layTeam${item}`] + index}
                          onClick={() => {
                            const rate =
                              parseInt(data[`layTeam${item}`] || 0) + index;
                            if (
                              rate > 0 &&
                              data?.[`statusTeam${item}`] == teamStatus.active
                            ) {
                              handleClick(
                                {
                                  betOnTeam: matchDetails?.[`team${item}`],
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
                                },
                                data
                              );
                            }
                          }}
                          active={
                            data?.[`statusTeam${item}`] != teamStatus.active
                          }
                        />
                      ))}
                  </BetStatusOverlay>
                </td>

                {(!isMobile || backLayCount === 2) && (
                  <td colSpan={2} style={{ borderLeft: 0 }}></td>
                )}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BookmakerTable;
