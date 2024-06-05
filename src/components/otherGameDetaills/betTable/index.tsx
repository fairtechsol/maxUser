import { IoInformationCircle } from "react-icons/io5";
import isMobile from "../../../utils/screenDimension";
import BetTableHeader from "../../commonComponent/betTableHeader";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Loader from "../../commonComponent/loader";

import { useState } from "react";
import CustomModal from "../../commonComponent/modal";
import FootballBookmakerTable from "./bookMaker";
import FootballMatchOdds from "./matchOdds";
import HTFTMarketTable from "./htftmarket";
import { MatchType } from "../../../utils/enum";
import { formattedMinMax } from "../../../utils/formatMinMax";
import OverUnderMarket from "./overUnder";
import SetWinner from "./setWinner";
interface BetTableProps {
  title: string;
  type: string;
  data: any;
  backLayCount?: number;
}

const BetTable = ({ title, type, data, backLayCount }: BetTableProps) => {
  const { otherMatchDetails, loading } = useSelector(
    (state: RootState) => state.otherGames.matchDetail
  );
  const [show, setShow] = useState(false);
  // const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // const handleInfoClick = () => {
  //   // Your condition to check whether to show the modal or not
  //   const shouldShowModal = true; // Example condition
  //   if (shouldShowModal) {
  //     setShowModal(true);
  //   }
  // };
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
              {[MatchType.MATCH_ODDS, MatchType.UNDER_OVER].includes(type) &&
                !isMobile && (
                  <span className="f600 title-14">
                    Maximum Bet {data?.maxBet}
                  </span>
                )}
              <span
                className={`${
                  isMobile ? "text-black title-16" : "text-white title-20"
                }`}
              >
                <IoInformationCircle
                  onClick={() => {
                    setShow(true);
                  }}
                />

                <CustomModal
                  customClass="modalFull-90 rule-popup"
                  show={show}
                  setShow={setShow}
                  title={"Rules"}
                >
                  {/* {!isMobile ? <Desktop /> : <Mobile />} */}
                </CustomModal>
              </span>
            </div>
          }
        />
      )}
      {type === MatchType.BOOKMAKER ? (
        <FootballBookmakerTable
          minMax={formattedMinMax(data?.minBet, data?.maxBet)}
          data={data}
          backLayCount={backLayCount}
          matchDetails={otherMatchDetails}
        />
      ) : type === MatchType.MATCH_ODDS ? (
        <FootballMatchOdds
          minMax={formattedMinMax(data?.minBet, data?.maxBet)}
          data={data}
          backLayCount={backLayCount}
          matchDetails={otherMatchDetails}
        />
      ) : type === MatchType.UNDER_OVER ? (
        <OverUnderMarket
          minMax={formattedMinMax(data?.minBet, data?.maxBet)}
          data={data}
          backLayCount={backLayCount}
          matchDetails={otherMatchDetails}
          title={title}
        />
      ) : type === MatchType.SET_WINNER ? (
        <SetWinner
          minMax={formattedMinMax(data?.minBet, data?.maxBet)}
          data={data}
          backLayCount={backLayCount}
          matchDetails={otherMatchDetails}
        />
      ) :  (
        <HTFTMarketTable
        //   data={data}
        //   title={title}
        //   matchDetails={matchDetails}
        />
      )}
    </>
  );
};

export default BetTable;
