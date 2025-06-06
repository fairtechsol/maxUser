import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import DeleteBetOverlay from "../../../commonComponent/betComponents/deleteBetRow";
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

const MyBet = () => {
  const { placedBets } = useSelector((state: RootState) => state.bets);
  return (
    <Table className="w-full lh-1" bordered>
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
              <tr
                key={bet?.id}
                className={`position-relative ${bet?.betType === "NO" || bet?.betType === "LAY"
                    ? "bg-red1"
                    : "bg-blue3"
                  }`}
              >
                <th
                  className={`title-12 text-start ${bet?.betType === "NO" || bet?.betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                    }`}
                >
                  {bet?.marketBetType === "SESSION"
                    ? bet?.eventName
                    : bet?.bettingName}
                </th>
                <th
                  className={`title-12 text-start ${bet?.betType === "NO" || bet?.betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                    }`}
                >
                  {bet?.odds}
                </th>
                <th
                  className={`title-12 text-start ${bet?.betType === "NO" || bet?.betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
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

export default MyBet;
