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
      <div className="betList" style={{ maxHeight: "27vh", overflow: "auto" }}>
        <Table className="w-full">
          <thead>
            <tr className="bg-secondary">
              {placeBetHeader?.map((item) => (
                <th
                  key={item?.id}
                  className={`title-14 ${
                    item?.id === "stake" ? "text-end" : "text-start"
                  } fbold bg-light lh-1`}
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
                      bet?.betType === "NO" || bet?.betType === "LAY"
                        ? "bg-red1"
                        : "bg-blue3"
                    }`}
                  >
                    <th
                      className={`title-14 text-start f400 lh-05 ${
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
                      className={`title-14 text-start f400 lh-05 ${
                        bet?.betType === "NO" || bet?.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
                      }`}
                    >
                      {bet?.odds}
                    </th>
                    <th
                      className={`title-14 text-end f400 lh-05 ${
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
      </div>
    </RightPanelContainer>
  );
};

export default MyBet;
