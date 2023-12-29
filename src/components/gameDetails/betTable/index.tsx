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

  return (
    <>
      {loading && <Loader />}

      {isMobile && type === MatchType.SESSION_MARKET ? (
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
                className={`${
                  isMobile ? "text-black title-16" : "text-white title-20"
                }`}
              >
                <IoInformationCircle />
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
