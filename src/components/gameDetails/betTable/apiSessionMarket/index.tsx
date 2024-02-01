import { Table } from "react-bootstrap";

import { IoInformationCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import isMobile from "../../../../utils/screenDimension";
import BackLayBox from "../../../commonComponent/betComponents/backLayBox";
import BetStatusOverlay from "../../../commonComponent/betComponents/betStatusOverlay";
import BetTableHeader from "../../../commonComponent/betTableHeader";
import "../style.scss";
import "./style.scss";
import { useState } from "react";
import CustomModal from "../../../commonComponent/modal";
import RunBoxTable from "../runBoxTable";
import { getRunAmount } from "../../../../store/actions/betPlace/betPlaceActions";
import { useSelector } from "react-redux";
import { teamStatus } from "../../../../utils/constants";

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

  const { runAmount } = useSelector((state: RootState) => state.bets);
  const [show, setShow] = useState(false);
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
                  <span
                    onClick={() => {
                      setShow(true);
                      dispatch(getRunAmount(JSON.parse(item)?.id));
                    }}
                    className="backLayRunner-country session-country title-12"
                  >
                    {JSON.parse(item)?.name}
                  </span>
                  <span className="title-14">
                    {matchDetails?.profitLossDataSession.length > 0
                      ? matchDetails?.profitLossDataSession?.reduce(
                          (accumulator: any, bet: any) => {
                            const maxLossToAdd =
                              bet?.betId === JSON.parse(item)?.id
                                ? +bet?.maxLoss
                                : 0;
                            return accumulator + maxLossToAdd;
                          },
                          0
                        )
                      : 0}
                  </span>
                </div>
              </td>

              <td colSpan={isMobile ? 2 : 3}>
                <BetStatusOverlay
                  title={JSON.parse(item)?.status}
                  active={JSON.parse(item)?.status !== "active" ? true : false}
                >
                  <BackLayBox
                    customClass="bet-place-box"
                    // overlay={true}
                    bgColor="red1"
                    rate={JSON.parse(item)?.noRate}
                    percent={JSON.parse(item)?.noPercent}
                    onClick={() => {
                      const rate = parseFloat(JSON.parse(item)?.noRate);
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
                    active={
                      JSON.parse(item)?.status !== "active" ? true : false
                    }
                  />
                  <BackLayBox
                    customClass="bet-place-box"
                    bgColor="blue3"
                    rate={JSON.parse(item)?.yesRate}
                    percent={JSON.parse(item)?.yesPercent}
                    onClick={() => {
                      const rate = parseFloat(JSON.parse(item)?.yesRate);
                      const percent = parseFloat(JSON.parse(item)?.yesPercent);
                      if (
                        rate > 0 &&
                        JSON.parse(item)?.status == teamStatus.active
                      ) {
                        handleClick(
                          {
                            name: JSON.parse(item)?.name,
                            rate: rate,
                            type: "yes",
                            stake: 0,
                            betId: JSON.parse(item)?.id,
                            percent: percent,
                            eventType: matchDetails?.matchType,
                            matchId: matchDetails?.id,
                          },
                          JSON.parse(item)
                        );
                      }
                    }}
                    active={
                      JSON.parse(item)?.status !== "active" ? true : false
                    }
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
      <CustomModal
        customClass="runAmountBetModal"
        title={"Run Position"}
        show={show}
        setShow={setShow}
      >
        <RunBoxTable runAmount={{ betPlaced: runAmount }} />
      </CustomModal>
    </div>
  );
}

export default ApiSessionMarketTable;
