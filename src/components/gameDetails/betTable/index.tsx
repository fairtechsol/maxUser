import { IoInformationCircle } from "react-icons/io5";
import { MatchType } from "../../../utils/enum";
import { formattedMinMax } from "../../../utils/formatMinMax";
import isMobile from "../../../utils/screenDimension";
import BetTableHeader from "../../commonComponent/betTableHeader";
import BookmakerTable from "./bookMaker";
import MatchOdds from "./matchOdds";
import SessionMarketTable from "./sessionMarket";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Loader from "../../commonComponent/loader";
import ApiSessionMarketTable from "./apiSessionMarket";
import { useState } from "react";
import CustomModal from "../../commonComponent/modal";
import Desktop from "../../rules/categoryRules/desktop";
import Mobile from "../../rules/mobile";
interface BetTableProps {
  title: string;
  type: string;
  data: any;
  backLayCount?: number;
}

const BetTable = ({ title, type, data, backLayCount }: BetTableProps) => {
  const { matchDetails, loading } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const handleInfoClick = () => {
    // Your condition to check whether to show the modal or not
    const shouldShowModal = true; // Example condition
    if (shouldShowModal) {
      setShowModal(true);
    }
  };
  return (
    <>
      {loading && <Loader />}

      {isMobile &&
        (type === MatchType.SESSION_MARKET ||
          type === MatchType.API_SESSION_MARKET) ? (
        ""
      ) : (
        <BetTableHeader
          customClass="mt-1"
          title={title}
          rightComponent={
            <div>
              {type === MatchType.MATCH_ODDS && !isMobile && (
                <span className="f600 title-14">
                  Maximum Bet {data?.maxBet}
                </span>
              )}
              <span
                className={`${isMobile ? "text-black title-16" : "text-white title-20"
                  }`}
              >
                <IoInformationCircle onClick={() => { setShow(true) }} />

                <CustomModal customClass="modalFull-90 rule-popup" show={show} setShow={setShow} title={"Rules"}>
                  {!isMobile ? <Desktop /> :
                    <Mobile />}
                </CustomModal>
              </span>
            </div>
          }
        />
      )}
      {type === MatchType.BOOKMAKER ? (
        <BookmakerTable
          minMax={formattedMinMax(data?.minBet, data?.maxBet)}
          data={data}
          backLayCount={backLayCount}
          matchDetails={matchDetails}
        />
      ) : type === MatchType.MATCH_ODDS ? (
        <MatchOdds
          data={data}
          backLayCount={backLayCount}
          matchDetails={matchDetails}
        />
      ) : type === MatchType.API_SESSION_MARKET ? (
        <ApiSessionMarketTable
          data={data}
          title={title}
          matchDetails={matchDetails}
        />
      ) : (
        <SessionMarketTable
          data={data}
          title={title}
          matchDetails={matchDetails}
        />
      )}
    </>
  );
};

export default BetTable;
