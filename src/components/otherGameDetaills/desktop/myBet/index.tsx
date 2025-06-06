import { Table } from "react-bootstrap";

import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import RightPanelContainer from "../../../gameDetails/desktop/rightPanelContainer";

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

const MyBetFootball = () => {
  const { placedBets } = useSelector((state: RootState) => state.bets);

  return (
    <RightPanelContainer title={"My Bet"}>
      <div style={{ maxHeight: "70vh", overflow: "auto" }}>
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
              Array.from(new Set(placedBets))?.map((bet: any) => {
                return (
                  <tr
                    key={bet?.id}
                    className={` ${bet?.betType === "NO" || bet?.betType === "LAY"
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
                      {bet?.teamName}
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
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </RightPanelContainer>
  );
};

export default MyBetFootball;
