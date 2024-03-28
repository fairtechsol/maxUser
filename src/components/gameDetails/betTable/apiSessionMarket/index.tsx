import { Table } from "react-bootstrap";

import { IoInformationCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import isMobile from "../../../../utils/screenDimension";
import BackLayBox from "../../../commonComponent/betComponents/backLayBox";
import BetStatusOverlay from "../../../commonComponent/betComponents/betStatusOverlay";
import BetTableHeader from "../../../commonComponent/betTableHeader";
import "./style.scss";
import { useState } from "react";
import CustomModal from "../../../commonComponent/modal";
import RunBoxTable from "../runBoxTable";
import { getRunAmount } from "../../../../store/actions/betPlace/betPlaceActions";
import { useSelector } from "react-redux";
import { teamStatus } from "../../../../utils/constants";
import Desktop from "../../../rules/categoryRules/desktop";
import Mobile from "../../../rules/mobile";

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

  // State for the "Run Position" modal
  const [showRunModal, setShowRunModal] = useState(false);

  // State for the "Rules" modal
  const [showRulesModal, setShowRulesModal] = useState(false);
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
                      <span
                        className={`${isMobile
                            ? "text-black title-16"
                            : "text-white title-20"
                          }`}
                      >
                        <IoInformationCircle
                          onClick={() => setShowRulesModal(true)}
                        />

                        <CustomModal
                          customClass="modalFull-90 rule-popup"
                          show={showRulesModal}
                          setShow={setShowRulesModal}
                          title={"Rules"}
                        >
                          {!isMobile ? <Desktop /> : <Mobile />}
                        </CustomModal>
                      </span>
                    </div>
                  }
                />
              )}
            </th>

            <th className="text-center bg-red1 bet-place-box f400">No</th>
            <th className="text-center bg-blue3 bet-place-box f400">Yes</th>
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
                      setShowRunModal(true);
                      dispatch(getRunAmount(item?.id));
                    }}
                    className="backLayRunner-country session-country title-12"
                  >
                    {item?.RunnerName}
                  </span>
                  <span
                    className={`title-14 ${matchDetails?.profitLossDataSession
                        ? matchDetails?.profitLossDataSession?.reduce(
                          (accumulator: any, bet: any) => {
                            const maxLossToAdd =
                              bet?.betId === item?.id ? +bet?.maxLoss : 0;
                            return accumulator + maxLossToAdd;
                          },
                          0
                        ) < 0
                          ? "color-red"
                          : "color-green"
                        : ""
                      }`}
                  >
                    {matchDetails?.profitLossDataSession
                      ? matchDetails?.profitLossDataSession?.reduce(
                        (accumulator: any, bet: any) => {
                          const maxLossToAdd =
                            bet?.betId === item?.id ? +bet?.maxLoss : 0;
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
                  title={item?.GameStatus}
                  active={item?.GameStatus !== "" ? true : false}
                >
                  <BackLayBox
                    customClass="bet-place-box"
                    // overlay={true}
                    bgColor="red1"
                    rate={item?.LayPrice1 ?? 0}
                    percent={item?.LaySize1 ?? 0}
                    onClick={() => {
                      const rate = parseFloat(item?.LayPrice1 ?? 0);
                      const percent = parseInt(item?.LaySize1 ?? 0);
                      if (
                        rate > 0 &&
                        item?.GameStatus == teamStatus.apiActive
                      ) {
                        handleClick(
                          {
                            betId: item?.id,
                            name: item?.RunnerName,
                            rate: rate,
                            type: "no",
                            stake: 0,
                            percent: percent,
                            eventType: matchDetails?.matchType,
                            matchId: matchDetails?.id,
                          },
                          item
                        );
                      }
                    }}
                    active={item?.GameStatus !== "" ? true : false}
                  />
                  <BackLayBox
                    customClass="bet-place-box"
                    bgColor="blue3"
                    rate={item?.BackPrice1}
                    percent={item?.BackSize1}
                    onClick={() => {
                      const rate = parseFloat(item?.BackPrice1);
                      const percent = parseFloat(item?.BackSize1);
                      if (
                        rate > 0 &&
                        item?.GameStatus == teamStatus.apiActive
                      ) {
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
                    active={item?.GameStatus !== "" ? true : false}
                  />
                  {!isMobile && (
                    <div className="minMax">
                      <div className="minMaxBox d-flex flex-column justify-content-end text-right px-2 title-12">
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
      <CustomModal
        customClass="runAmountBetModal"
        title={"Run Position"}
        show={showRunModal}
        setShow={setShowRunModal}
      >
        <RunBoxTable runAmount={{ betPlaced: runAmount }} />
      </CustomModal>
    </div>
  );
}

export default ApiSessionMarketTable;
