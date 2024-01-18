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
      <div style={{ height: "75vh", overflow: "auto" }}>
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
                  <tr
                    key={bet?.id}
                    className={` ${
                      bet?.betType === "NO" || bet?.betType === "LAY"
                        ? "bg-red1"
                        : "bg-blue3"
                    }`}
                  >
                    <th
                      className={`title-12 text-start ${
                        bet?.betType === "NO" || bet?.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
                      }`}
                    >
                      {bet?.marketBetType === "SESSION"
                        ? bet?.eventName
                        : bet?.teamName}
                    </th>
                    <th
                      className={`title-12 text-start ${
                        bet?.betType === "NO" || bet?.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
                      }`}
                    >
                      {bet?.odds}
                    </th>
                    <th
                      className={`title-12 text-start ${
                        bet?.betType === "NO" || bet?.betType === "LAY"
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

export default MyBet;
