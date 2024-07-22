import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import DeleteBetOverlay from "../../../commonComponent/betComponents/deleteBetRow";
import RightPanelContainer from "../rightPanelContainer";
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
  const { placedBets } = useSelector((state: RootState) => state.bets);
  return (
    <RightPanelContainer title={"My Bet"}>
      <div className="betList" style={{ maxHeight: "70vh", overflow: "auto" }}>
        <Table className="w-full">
          <thead>
            <tr className="bg-darkGrey">
              {placeBetHeader?.map((item) => (
                <th
                  key={item?.id}
                  className="title-12 text-start f500 bg-darkGrey"
                >
                  {item?.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {placedBets?.length < 1 && (
              <tr>
                <th colSpan={3} style={{ textAlign: "center" }}>
                  <span className="f400 title-14">No records Found</span>
                </th>
              </tr>
            )}
            {placedBets &&
              Array.from(new Set(placedBets))?.map((bet: any) => {
                return (
                  <tr
                    key={bet?.id}
                    className={`position-relative ${
                      bet?.betType === "BACK" ? "bg-blue3" : "bg-red1"
                    }`}
                  >
                    <th
                      className={`title-12 text-start f500 ${
                        bet?.betType === "BACK" ? "bg-blue3" : "bg-red1"
                      } `}
                    >
                      {bet?.teamName}
                    </th>
                    <th
                      className={`title-12 text-start f500 ${
                        bet?.betType === "BACK" ? "bg-blue3" : "bg-red1"
                      }`}
                    >
                      {bet?.odds}
                    </th>
                    <th
                      className={`title-12 text-start f500 ${
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
      </div>
    </RightPanelContainer>
  );
};

export default MyBet;
