import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { IoInformationCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import { teamStatus } from "../../../../utils/constants";
import isMobile from "../../../../utils/screenDimension";
import BackLayBox from "../../../commonComponent/betComponents/backLayBox";
import BetStatusOverlay from "../../../commonComponent/betComponents/betStatusOverlay";
import BetTableHeader from "../../../commonComponent/betTableHeader";
import "../style.scss";
import "./style.scss";

interface SessionMarketTableProps {
  data: any;
  title?: any;
  matchDetails: any;
}
function SessionMarketTable({
  data,
  title,
  matchDetails,
}: SessionMarketTableProps) {
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
                      {JSON.parse(item)?.name}
                    </Link>
                  </div>
                  <span className="title-14">{0}</span>
                </div>
              </td>

              <td colSpan={isMobile ? 2 : 3}>
                <BetStatusOverlay
                  title={JSON.parse(item)?.status}
                  active={JSON.parse(item)?.status != teamStatus.active}
                >
                  <BackLayBox
                    customClass="bet-place-box"
                    // overlay={true}
                    bgColor="red1"
                    rate={JSON.parse(item)?.noRate}
                    percent={JSON.parse(item)?.noPercent}
                    onClick={() => {
                      const rate = parseInt(JSON.parse(item)?.noRate);
                      const percent = parseInt(JSON.parse(item)?.noPercent);

                      if (
                        rate > 0 &&
                        JSON.parse(item)?.status == teamStatus.active
                      ) {
                        handleClick(
                          {
                            betId: JSON.parse(item)?.id,
                            name: JSON.parse(item)?.name,
                            rate: rate,
                            type: "no",
                            stake: 0,
                            percent: percent,
                            eventType: matchDetails?.matchType,
                            matchId: matchDetails?.id,
                          },
                          JSON.parse(item)
                        );
                      }
                    }}
                    active={JSON.parse(item)?.status != teamStatus.active}
                  />
                  <BackLayBox
                    customClass="bet-place-box"
                    bgColor="blue3"
                    rate={JSON.parse(item)?.yesRate}
                    percent={JSON.parse(item)?.yesPercent}
                    onClick={() => {
                      const rate = parseInt(JSON.parse(item)?.yesRate);
                      const percent = parseInt(JSON.parse(item)?.yesPercent);
                      if (
                        rate > 0 &&
                        JSON.parse(item)?.status == teamStatus.active
                      ) {
                        handleClick(
                          {
                            betId: JSON.parse(item)?.id,
                            name: JSON.parse(item)?.name,
                            rate: rate,
                            type: "yes",
                            stake: 0,
                            percent: percent,
                            eventType: matchDetails.matchType,
                            matchId: matchDetails?.id,
                          },
                          JSON.parse(item)
                        );
                      }
                    }}
                    active={JSON.parse(item)?.status != teamStatus.active}
                  />
                  {!isMobile && (
                    <div className="minMax">
                      <div className="minMaxBox d-flex flex-column justify-content-end text-end px-2 title-12">
                        <span className="">Min:{JSON.parse(item)?.minBet}</span>
                        <span>Max:{JSON.parse(item)?.maxBet}</span>
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

export default SessionMarketTable;
