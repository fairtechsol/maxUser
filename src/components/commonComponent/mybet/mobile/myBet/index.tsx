import { Table } from "react-bootstrap";

import "./style.scss";
// import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
// import DeleteBetOverlay from "../../../commonComponent/betComponents/deleteBetRow";
import { RootState } from "../../../../../store/store";
import DeleteBetOverlay from "../../../betComponents/deleteBetRow";


const placeBetHeader = [
  {
    id: "matchedBet",
    name: "Matched Bet",
  },
  {
    id: "odds",
    name: "Odds",
  },
  {
    id: "stake",
    name: "Stake",
  },
];

const MobileMyBet = () => {
  const { placedBets } = useSelector((state: RootState) => state.bets);

  return (
    <Table className="w-full" bordered>
      <thead>
        <tr>
          {placeBetHeader?.map((item) => (
            <th key={item?.id} className="title-12 text-start">
              {item?.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {placedBets &&
          Array.from(new Set(placedBets))?.map((bet: any) => {
            return (
              <tr key={bet?.id} className={`position-relative bg-`}>
                <th
                  className={`title-12 text-start ${
                    bet?.betType === "BACK" ? "bg-blue3" : "bg-red1"
                  }`}
                >
                  {bet?.teamName}
                </th>
                <th
                  className={`title-12 text-start ${
                        bet?.betType === "BACK" ? "bg-blue3" : "bg-red1"
                      }`}
                >
                  {bet?.odds}
                </th>
                <th
                  className={`title-12 text-start ${
                        bet?.betType === "BACK" ? "bg-blue3" : "bg-red1"
                      }`}
                >
                  {bet?.amount}
                </th>
                <DeleteBetOverlay title={bet?.deleteReason} />
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default MobileMyBet;
