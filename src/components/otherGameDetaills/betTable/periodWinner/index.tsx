import { useState } from "react";
import { Table } from "react-bootstrap";
import { IoInformationCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import {
  RootState
} from "../../../../store/store";
import { isMobile } from "../../../../utils/screenDimension";
import BetTableHeader from "../../../commonComponent/betTableHeader";
import CustomModal from "../../../commonComponent/modal";
import "../../../gameDetails/betTable/apiSessionMarket/style.scss";
import Desktop from "../../../rules/desktop";
import Mobile from "../../../rules/mobile";
import RunBoxTable from "../runBoxTable";
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

            <th className="text-center bg-red1 bet-place-box">No</th>
            <th className="text-center bg-blue3 bet-place-box">Yes</th>
            {!isMobile && <th className="border-0"></th>}
          </tr>
        </thead>
        <tbody>
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
