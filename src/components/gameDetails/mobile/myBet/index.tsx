import { Table } from "react-bootstrap";

import "./style.scss";
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
          <tbody></tbody>
        </Table>
  );
};

export default MyBet;
