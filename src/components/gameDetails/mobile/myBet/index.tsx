import { Table } from "react-bootstrap";

import "./style.scss";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
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
    <Table className="w-full" bordered>
      <thead>
        <tr>
          {placeBetHeader?.map((item) => (
            <th key={item?.id} className="title-12 text-start lh-05" style={{backgroundColor:"#f7f7f7"}}>
              {item?.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {placedBets &&
          Array.from(new Set(placedBets))?.map((bet: any) => {
            return (
              <tr key={bet?.id} className={`position-relative ${
                bet?.betType === "NO" || bet?.betType === "LAY"
                  ? "bg-red1"
                  : "bg-blue3"
              }`}>
                <th
                  className={`title-12 text-start f400 lh-1 ${
                    bet?.betType === "NO" || bet?.betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }`}
                >
                   {["horseRacing", "greyHound"].includes(bet?.eventType)
                        ? bet?.teamName?.split(".")?.[1]?.trim()
                          ? bet?.teamName?.split(".")?.[1]?.trim()
                          : bet?.teamName
                        : bet?.teamName ?? bet?.bettingName}
                </th>
                <th
                  className={`title-12 text-start f400 lh-1 ${
                    bet?.betType === "NO" || bet?.betType === "LAY"
                      ? "bg-red1"
                      : "bg-blue3"
                  }`}
                >
                  {bet?.odds}
                </th>
                <th
                  className={`title-12 text-start f400 lh-1 ${
                    bet?.betType === "NO" || bet?.betType === "LAY"
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
