import { Table } from "react-bootstrap";
import RightPanelContainer from "../rightPanelContainer";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

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
          {placedBets &&
            placedBets?.map((bet: any) => {
              return (
                <tr key={bet?.id} className="bg-darkGrey">
                  <th className="title-12 text-start bg-darkGrey">
                    {bet?.eventName}
                  </th>
                  <th className="title-12 text-start bg-darkGrey">
                    {bet?.odds}
                  </th>
                  <th className="title-12 text-start bg-darkGrey">
                    {bet?.amount}
                  </th>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </RightPanelContainer>
  );
};

export default MyBet;
