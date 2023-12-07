import { IoInformationCircle } from "react-icons/io5";
import { MatchType } from "../../../utils/enum";
import isMobile from "../../../utils/screenDimension";
import BetTableHeader from "../../commonComponent/betTableHeader";
import BookmakerTable from "./bookMaker";
import MatchOdds from "./matchOdds";
import SessionMarketTable from "./sessionMarket";

interface BetTableProps {
  title: string;
  type: string;
  data: any;
  backLayCount?: number;
}
const BetTable = ({ title, type, data, backLayCount }: BetTableProps) => {
  return (
    <>
      {isMobile && type === MatchType.SESSION_MARKET ? (
        ""
      ) : (
        <BetTableHeader
          customClass="mt-1"
          title={title}
          rightComponent={
            <div>
              {type === MatchType.MATCH_ODDS && !isMobile && (
                <span className="f600 title-14">Maximum Bet 1</span>
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
        <BookmakerTable minMax={100} data={data} backLayCount={backLayCount} />
      ) : type === MatchType.MATCH_ODDS ? (
        <MatchOdds data={data} />
      ) : (
        <SessionMarketTable data={data} title={title} />
      )}
    </>
  );
};

export default BetTable;
