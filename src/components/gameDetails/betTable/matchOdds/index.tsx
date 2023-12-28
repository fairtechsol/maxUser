import { Table } from "react-bootstrap";
import isMobile from "../../../../utils/screenDimension";
import BackLayBox from "../../../commonComponent/betComponents/backLayBox";
import BetStatusOverlay from "../../../commonComponent/betComponents/betStatusOverlay";
import "../style.scss";
import "./style.scss";

interface MatchOddsProps {
  minMax?: any;
  data: any;
  matchDetails?: any;
}
function MatchOdds({ minMax, data, matchDetails }: MatchOddsProps) {
  const handleClick = () => {};

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
            <th className="text-center bg-blue3 match-odd-bet-place">Back</th>
            <th className="text-center bg-red1 match-odd-bet-place">Lay</th>
            {!isMobile && (
              <>
                <th className="border-0 match-odd-bet-place"></th>
                <th className="border-0 match-odd-bet-place"></th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {["A", "B", "C"]
            ?.filter((item) => matchDetails?.[`team${item}`] != null)
            ?.map((matchs, indexes) => {
              return (
                <tr key={indexes}>
                  <td>
                    <div className="backLayRunner d-flex flex-column px-1">
                      <span
                        className={`backLayRunner-country title-12  ${
                          isMobile ? "f900" : "f600"
                        } `}
                      >
                        {matchDetails?.[`team${matchs}`]}
                      </span>
                      {/* <span className="title-14">{item?.lastPriceTraded}</span> */}
                    </div>
                  </td>
                  <td colSpan={6}>
                    <BetStatusOverlay title="Lock">
                      {new Array(3).fill(0)?.map((_: any, index: number) => (
                        <BackLayBox
                          key={index}
                          customClass="match-odd-bet-place"
                          bgColor={`blue${index + 1}`}
                          rate={data[`backTeam${matchs}`] - 2 + index}
                          onClick={handleClick}
                        />
                      ))}
                      {new Array(3).fill(0)?.map((_: any, index: number) => (
                        <BackLayBox
                          key={index}
                          customClass="match-odd-bet-place"
                          bgColor={`red${index + 1}`}
                          rate={data[`layTeam${matchs}`] + index}
                          onClick={handleClick}
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

export default MatchOdds;
