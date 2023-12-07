import { Table } from "react-bootstrap";
import isMobile from "../../../../utils/screenDimension";
import BackLayBox from "../../../commonComponent/betComponents/backLayBox";
import BetStatusOverlay from "../../../commonComponent/betComponents/betStatusOverlay";
import "../style.scss";
import "./style.scss";

interface MatchOddsProps {
  minMax?: any;
  data: any;
}
function MatchOdds({ minMax, data }: MatchOddsProps) {
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
          {data?.map((item: any, i: number) => (
            <tr key={i}>
              <td>
                <div className="backLayRunner d-flex flex-column px-1">
                  <span
                    className={`backLayRunner-country title-12  ${
                      isMobile ? "f900" : "f600"
                    } `}
                  >
                    {item?.RunnerName}
                  </span>
                  <span className="title-14">{item?.lastPriceTraded}</span>
                </div>
              </td>
              <td colSpan={6}>
                <BetStatusOverlay title="Lock">
                  {item?.ex?.availableToBack?.map(
                    (back: any, index: number) => (
                      <BackLayBox
                        key={index}
                        customClass="match-odd-bet-place"
                        // overlay={true}
                        bgColor={`blue${index + 1}`}
                        rate={back?.price}
                        percent={back?.size}
                        onClick={handleClick}
                      />
                    )
                  )}
                  {item?.ex?.availableToLay?.map((red: any, index: number) => (
                    <BackLayBox
                      customClass="match-odd-bet-place"
                      // overlay={true}
                      bgColor={`red${index + 1}`}
                      rate={red?.price}
                      percent={red?.size}
                      onClick={handleClick}
                      key={index}
                    />
                  ))}
                </BetStatusOverlay>
              </td>

              {!isMobile && <td></td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MatchOdds;
