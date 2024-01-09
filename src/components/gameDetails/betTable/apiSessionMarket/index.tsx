import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { IoInformationCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import isMobile from "../../../../utils/screenDimension";
import BackLayBox from "../../../commonComponent/betComponents/backLayBox";
import BetStatusOverlay from "../../../commonComponent/betComponents/betStatusOverlay";
import BetTableHeader from "../../../commonComponent/betTableHeader";
import "../style.scss";
import "./style.scss";

interface ApiSessionMarketTableProps {
  data: any;
  title?: any;
  matchDetails: any;
}
function ApiSessionMarketTable({
  data,
  title,
  matchDetails,
}: ApiSessionMarketTableProps) {
  const dispatch: AppDispatch = useDispatch();
  const handleClick = (team: any, data: any) => {
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  return (
    <div className={`gameTable sessionFancyTable borderTable border`}>
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
          {data?.map((item: any, index: number) => (
            // <BetStatusOverlay
            //   key={index}
            //   title={JSON.parse(item)?.active}
            //   active={JSON.parse(item)?.active != teamStatus.active}
            // >
            <tr key={index}>
              <td>
                <div className="backLayRunner d-flex flex-column px-1">
                  <div>
                    <Link
                      to=""
                      className="backLayRunner-country session-country title-12"
                    >
                      {item?.RunnerName}
                    </Link>
                  </div>
                  <span className="title-14">{0}</span>
                </div>
              </td>

              <td colSpan={isMobile ? 2 : 3}>
                <BetStatusOverlay
                  title={item?.GameStatus}
                  active={item?.GameStatus != ""}
                >
                  <BackLayBox
                    customClass="bet-place-box"
                    // overlay={true}
                    bgColor="red1"
                    rate={item?.BackPrice1}
                    percent={item?.BackSize1}
                    onClick={() => {
                      const rate = parseFloat(item?.BackPrice1);
                      const percent = parseInt(item?.BackSize1);
                      if (rate > 0 && item?.GameStatus == "") {
                        handleClick(
                          {
                            name: item?.RunnerName,
                            rate: rate,
                            type: "no",
                            stake: 0,
                            betId: item?.id,
                            percent: percent,
                            eventType: matchDetails?.matchType,
                            matchId: matchDetails?.id,
                          },
                          item
                        );
                      }
                    }}
                    active={item?.GameStatus != ""}
                  />
                  <BackLayBox
                    customClass="bet-place-box"
                    bgColor="blue3"
                    rate={item?.LayPrice1}
                    percent={item?.LaySize1}
                    onClick={() => {
                      const rate = parseFloat(item?.LayPrice1);
                      const percent = parseFloat(item?.LaySize1);
                      if (rate > 0 && item?.GameStatus == "") {
                        handleClick(
                          {
                            name: item?.RunnerName,
                            rate: rate,
                            type: "yes",
                            stake: 0,
                            betId: item?.id,
                            percent: percent,
                            eventType: matchDetails?.matchType,
                            matchId: matchDetails?.id,
                          },
                          item
                        );
                      }
                    }}
                    active={item?.GameStatus != ""}
                  />
                  {!isMobile && (
                    <div className="minMax">
                      <div className="minMaxBox d-flex flex-column justify-content-end text-end px-2 title-12">
                        <span className="">Min:{item?.min}</span>
                        <span>Max:{item?.max}</span>
                      </div>
                    </div>
                  )}
                </BetStatusOverlay>
              </td>
            </tr>
            // </BetStatusOverlay>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ApiSessionMarketTable;
