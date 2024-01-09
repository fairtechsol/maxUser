import { Table } from "react-bootstrap";

import RightPanelContainer from "../rightPanelContainer";
import "./style.scss";
import { useState } from "react";
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
  const [show, setShow] = useState(false);
  return (
    <>
      <RightPanelContainer title={"My Bet"}>
        <Table className="w-full">
          <thead>
            <tr className="bg-darkGrey">
              {placeBetHeader?.map((item) => (
                <th key={item?.id} className="title-12 text-start bg-darkGrey">
                  {item?.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <td></td>
            <td></td>
            <td></td>
          </tbody>
        </Table>
      </RightPanelContainer>
      
    </>
  );
};

export default MyBet;
