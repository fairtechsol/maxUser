import { Table } from "react-bootstrap";
import { IoInformationCircle } from "react-icons/io5";
// import { useDispatch } from "react-redux";
// import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { 
  // AppDispatch, 
  RootState } from "../../../../store/store";
// import { teamStatus } from "../../../../utils/constants";
import {isMobile} from "../../../../utils/screenDimension";
// import BackLayBox from "../../../commonComponent/betComponents/backLayBox";
// import BetStatusOverlay from "../../../commonComponent/betComponents/betStatusOverlay";
import BetTableHeader from "../../../commonComponent/betTableHeader";
import "../../../gameDetails/betTable/apiSessionMarket/style.scss";
import CustomModal from "../../../commonComponent/modal";
import RunBoxTable from "../runBoxTable";
import { useState } from "react";
// import { getRunAmount } from "../../../../store/actions/betPlace/betPlaceActions";
import { useSelector } from "react-redux";
import Desktop from "../../../rules/categoryRules/desktop";
import Mobile from "../../../rules/mobile";
import "../style.scss";
interface SessionMarketTableProps {
  data: any;
  title?: any;
  matchDetails: any;
}
function PeriodMarketTable({
  // data,
  title,
  // matchDetails,
}: SessionMarketTableProps) {
  const { runAmount } = useSelector((state: RootState) => state.bets);
  // State for the "Run Position" modal
  const [showRunModal, setShowRunModal] = useState(false);

  // State for the "Rules" modal
  const [showRulesModal, setShowRulesModal] = useState(false);
  // const dispatch: AppDispatch = useDispatch();

  // const handleClick = (team: any, data: any) => {
  //   dispatch(
  //     selectedBetAction({
  //       team,
  //       data,
  //     })
  //   );
  // };

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
                        className={`${
                          isMobile
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

            <th className="text-center bg-red1 bet-place-box">No</th>
            <th className="text-center bg-blue3 bet-place-box">Yes</th>
            {!isMobile && <th className="border-0"></th>}
          </tr>
        </thead>
        <tbody>
          {/* {data?.map((item: any, index: number) => {
            if (!JSON.parse(item).selectionId) {
              return (
                // <BetStatusOverlay
                //   key={index}
                //   title={JSON.parse(item)?.active}
                //   active={JSON.parse(item)?.active != teamStatus.active}
                // >
                <tr key={index}>
                  <td>
                    <div className="backLayRunner d-flex flex-column px-1">
                      <div>
                        <span
                          onClick={() => {
                            setShowRunModal(true);
                            dispatch(getRunAmount(JSON.parse(item)?.id));
                          }}
                          className="backLayRunner-country session-country title-12"
                        >
                          {JSON.parse(item)?.name}
                        </span>
                      </div>
                      <span
                        className={`title-14 ${
                          matchDetails?.profitLossDataSession?.length > 0
                            ? matchDetails?.profitLossDataSession?.reduce(
                                (accumulator: any, bet: any) => {
                                  const maxLossToAdd =
                                    bet?.betId === JSON.parse(item)?.id
                                      ? +bet?.maxLoss
                                      : 0;
                                  return accumulator + maxLossToAdd;
                                },
                                0
                              ) < 0
                              ? "color-red"
                              : "color-green"
                            : ""
                        }`}
                      >
                        {matchDetails?.profitLossDataSession?.length > 0
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
                          const percent = parseInt(
                            JSON.parse(item)?.yesPercent
                          );
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
                            <span className="">
                              Min:{JSON.parse(item)?.minBet}
                            </span>
                            <span>Max:{JSON.parse(item)?.maxBet}</span>
                          </div>
                        </div>
                      )}
                    </BetStatusOverlay>
                  </td>
                </tr>
                // </BetStatusOverlay>
              );
            } else return null;
          })} */}
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

export default PeriodMarketTable;
