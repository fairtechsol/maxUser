import { Table } from "react-bootstrap";

import "./style.scss";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
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
            <th key={item?.id} className="title-12 text-start">
              {item?.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {placedBets &&
          placedBets?.map((bet: any) => {
            return (
              <tr key={bet?.id}>
                <th className="title-12 text-start">{bet?.eventName}</th>
                <th className="title-12 text-start">{bet?.odds}</th>
                <th className="title-12 text-start">{bet?.amount}</th>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default MyBet;
