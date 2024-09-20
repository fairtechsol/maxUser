import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import RightPanelContainer from "../rightPanelContainer";
import "./style.scss";
import DeleteBetOverlay from "../../../betComponents/deleteBetRow";
import { RootState } from "../../../../../store/store";

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

const DesktopMyBet = () => {
  const { placedBets } = useSelector((state: RootState) => state.bets);
  return (
    <RightPanelContainer title={"My Bet"}>
      <div className="betList " style={{ maxHeight: "30vh", overflow: "auto" }}>
        <Table className="w-full">
          <thead>
            <tr >
              {placeBetHeader?.map((item) => (
                <th
                style={{backgroundColor: "#f7f7f7"}}
                  key={item?.id}
                  className="title-12 text-start f500 lh-1"
                >
                  {item?.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {placedBets?.length < 1 && (
              <tr>
                <th className="lh-1" colSpan={3} style={{ textAlign: "center" }}>
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
                      className={`title-12 text-start f500 ${
                        bet?.betType === "NO" || bet?.betType === "LAY"
                          ? "bg-red1"
                          : "bg-blue3"
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

export default DesktopMyBet;
