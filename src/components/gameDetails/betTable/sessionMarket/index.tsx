import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { IoInformationCircle } from "react-icons/io5";
import isMobile from "../../../../utils/screenDimension";
import BackLayBox from "../../../commonComponent/betComponents/backLayBox";
import BetTableHeader from "../../../commonComponent/betTableHeader";
import "../style.scss";
import "./style.scss";

interface SessionMarketTableProps {
  data: any;
  title?: any;
  matchDetails?: any;
}
function SessionMarketTable({
  data,
  title,
  matchDetails,
}: SessionMarketTableProps) {
  const handleClick = () => {};
  return (
    <div className={`gameTable sessionFancyTable borderTable border `}>
      <Table className="mb-0">
        <thead>
          <tr>
            <th className="border-0">
              {isMobile && (
                <BetTableHeader
                  title={title}
                  rightComponent={
                    <div>
                      <IoInformationCircle />
                    </div>
                  }
                />
              )}
            </th>

            <th className="text-center bg-red1 bet-place-box">No</th>
            <th className="text-center bg-blue3 bet-place-box">Yes</th>
            {!isMobile && <th className="border-0"></th>}
          </tr>
        </thead>
        <tbody>
          {data
            ?.filter(
              (item: any) =>
                (JSON.parse(item)?.isManual &&
                  matchDetails?.manualSessionActive) ||
                (!JSON.parse(item)?.isManual && matchDetails?.apiSessionActive)
            )
            ?.map((item: any, index: number) => (
              <tr key={index}>
                <td>
                  <div className="backLayRunner d-flex flex-column px-1">
                    <div>
                      <Link
                        to=""
                        className="backLayRunner-country session-country title-12"
                      >
                        {JSON.parse(item)?.name}
                      </Link>
                    </div>
                    <span className="title-14">{0}</span>
                  </div>
                </td>
                <td>
                  <BackLayBox
                    customClass="bet-place-box"
                    // overlay={true}
                    bgColor="red1"
                    rate={JSON.parse(item)?.yesRate}
                    percent={JSON.parse(item)?.yesPercent}
                    onClick={handleClick}
                  />
                </td>
                <td>
                  <BackLayBox
                    customClass="bet-place-box"
                    bgColor="blue3"
                    rate={JSON.parse(item)?.noRate}
                    percent={JSON.parse(item)?.noPercent}
                    onClick={handleClick}
                  />
                </td>

                {!isMobile && (
                  <td className="minMax align-middle">
                    <div className="minMaxBox d-flex flex-column justify-content-center text-end px-2 title-12">
                      <span className="">Min:{JSON.parse(item)?.minBet}</span>
                      <span>Max:{JSON.parse(item)?.maxBet}</span>
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SessionMarketTable;
