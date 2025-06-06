import { useState } from "react";
import { Table } from "react-bootstrap";
import { IoInformationCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  getRunAmount,
  resetRunAmountModal,
} from "../../../../store/actions/betPlace/betPlaceActions";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { teamStatus } from "../../../../utils/constants";
import { formattedMinMax } from "../../../../utils/formatMinMax";
import { isMobile } from "../../../../utils/screenDimension";
import BackLayBox from "../../../commonComponent/betComponents/backLayBox";
import BetStatusOverlay from "../../../commonComponent/betComponents/betStatusOverlay";
import BetTableHeader from "../../../commonComponent/betTableHeader";
import SmoothDropdownModal from "../../../commonComponent/minMaxModal";
import CustomModal from "../../../commonComponent/modal";
import Desktop from "../../../rules/desktop";
import Mobile from "../../../rules/mobile";
import RunBoxTable from "../runBoxTable";
import "../style.scss";
import "./style.scss";

interface SessionMarketTableProps {
  data: any;
  title?: any;
  matchDetails: any;
  minMax?: any;
}
function SessionMarketTable({
  data,
  title,
  matchDetails,
}: SessionMarketTableProps) {
  const { runAmount, runAmountModal } = useSelector(
    (state: RootState) => state.bets
  );
  const [modalStates, setModalStates] = useState<any>({});
  // State for the "Rules" modal
  const [showRulesModal, setShowRulesModal] = useState(false);
  // const [showMinsModal, setMinModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleClick = (team: any, data: any) => {
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  const handleMinModalToggle = (itemId: any) => {
    setModalStates((prevState: { [x: string]: any }) => ({
      ...prevState,
      [itemId]: !prevState[itemId], // Toggle the modal state for the specific item
    }));
  };
  const handleModal = (event: any) => {
    dispatch(resetRunAmountModal({ showModal: event, id: runAmount?.betId }));
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
          {data?.map((item: any, index: number) => {
            if (!JSON.parse(item).selectionId) {
              return (
                <tr key={index}>
                  <td>
                    <div className="minmaxsession">
                      <span
                        onClick={() => {
                          // setShowRunModal(true);
                          dispatch(
                            resetRunAmountModal({
                              showModal: true,
                              id: item?.id,
                            })
                          );
                          dispatch(getRunAmount(JSON.parse(item)?.id));
                        }}
                        className="backLayRunner-country session-country title-12"
                      >
                        {JSON.parse(item)?.name}
                      </span>
                      {isMobile && (
                        <span className="minmaxi">
                          <IoInformationCircle
                            onClick={(item: any) =>
                              handleMinModalToggle(item.id)
                            }
                          />
                          <SmoothDropdownModal
                            minMax={formattedMinMax(
                              JSON.parse(item)?.minBet,
                              JSON.parse(item)?.maxBet
                            )}
                            show={modalStates[item.id]}
                            setShow={(value: any) =>
                              setModalStates((prevState: any) => ({
                                ...prevState,
                                [item.id]: value,
                              }))
                            }
                          />
                        </span>
                      )}
                    </div>
                    <div className="backLayRunner d-flex flex-column px-1">
                      <span
                        className={`title-14 mt-2 ${matchDetails?.profitLossDataSession?.length > 0
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
          })}
        </tbody>
      </Table>
      {/* <CustomModal
        customClass="runAmountBetModal"
        title={"Run Position"}
        show={runAmountModal}
        setShow={handleModal}
      >
        <RunBoxTable runAmount={{ betPlaced: runAmount?.runAmountData }} />
      </CustomModal> */}
      {/* <div style={{ height: "80px" }}></div> */}
    </div>
  );
}

export default SessionMarketTable;
