import { Table } from "react-bootstrap";
import isMobile from "../../../../utils/screenDimension";
import BackLayBox from "../../../commonComponent/betComponents/backLayBox";
import BetStatusOverlay from "../../../commonComponent/betComponents/betStatusOverlay";
import "../style.scss";
import "./style.scss";

interface BookmakerTableProps {
  minMax?: any;
  data: any;
  backLayCount?: number;
}
function BookmakerTable({
  minMax,
  data,
  backLayCount = 6,
}: BookmakerTableProps) {
  const handleClick = () => {
    alert("5555");
  };
  // const overLayStatus = <h1>fhdsjkfj</h1>;
  // const overlayString = ReactDOMServer.renderToString(overLayStatus);
  // console.log(overlayString);
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
            <th className="text-center bg-blue3 bookmaker-bet-place">Back</th>
            <th className="text-center bg-red1 bookmaker-bet-place">Lay</th>
            {backLayCount === 6 && (
              <th
                colSpan={isMobile ? 3 : 1}
                className="border-0 bookmaker-bet-place"
              ></th>
            )}
            {!isMobile && <th className="border-0 bookmaker-bet-place"></th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, i: number) => (
            <tr key={i} className="">
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
              <td colSpan={backLayCount === 6 ? 6 : 2}>
                <BetStatusOverlay title="Lock">
                  {item?.ex?.availableToBack?.map(
                    (back: any, index: number) => (
                      <BackLayBox
                        key={index}
                        customClass="bookmaker-bet-place"
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
                      key={index}
                      customClass="bookmaker-bet-place"
                      // overlay={true}
                      bgColor={`red${index + 1}`}
                      rate={red?.price}
                      percent={red?.size}
                      onClick={handleClick}
                    />
                  ))}
                </BetStatusOverlay>
              </td>

                <td colSpan={2} style={{ borderLeft: 0 }}></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BookmakerTable;
