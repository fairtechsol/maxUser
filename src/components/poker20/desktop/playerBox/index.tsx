import "./style.scss";
import { AppDispatch } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { useEffect } from "react";
const PlayerTable = ({ title,odds, data, playerNum }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.rate,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nation,
      name: item?.nation,
      bettingName: "Match odds",
      selectionId: item?.sid,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
    console.log("team", item);
  };
  const array = odds?.slice(playerNum[0], playerNum[1]);

  const groupedData = (array || [])?.reduce((acc: any, item: any) => {
    const { nation, sid, rate, gstatus } = item;
    if (!acc[nation]) {
      acc[nation] = { nation, entries: [] };
    }
    const suffix = String.fromCharCode(65 + acc[nation].entries.length);
    acc[nation].entries?.push({ nation: `${nation} ${suffix}`, sid, rate, gstatus });
    return acc;
  }, {});

  const result = Object.values(groupedData);

  useEffect(() => {
    if (odds?.[0]?.gstatus === "0" ||odds?.[0]?.rate === "0.00") {
      dispatch(selectedBetAction(""));
    } 
    
  }, [odds?.[0]?.gstatus,odds?.[0]?.rate]);

  return (
    <div className="card32-table-container">
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
      {result &&
        result?.map((item: any, index: number) => {
          return (
            <div
              
              style={{ lineHeight: 1,width:"30%" }}
              key={index + playerNum[0]}
            >
              <div
                style={{
                  width: "100%",
                  padding: "8px",
                  
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  alignItems:"center"
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
                  {item?.nation}
                </span>
              </div>
              <div
                className={
                  item?.entries?.[0]?.gstatus === "0" ? "suspended" : ""
                }
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  cursor: "pointer",
                  height: "40px",
                }}
              >
                <div
                  className="card32-table-item bac"
                  style={{ width: "100%" ,background:"#72BBEF"}}
                  onClick={() =>
                    item?.entries?.[0]?.gstatus === "0"
                      ? null
                      : handleBet(item?.entries?.[0])
                  }
                >
                  <span className="f12-b">{item?.entries?.[0]?.rate}</span>
                  <span
                    className={`f400 title-14 ${
                      data?.profitLoss
                        ? data?.profitLoss[
                            `${data?.videoInfo?.mid}_${item?.entries?.[0]?.sid}_card`
                          ]
                          ? data?.profitLoss[
                              `${data?.videoInfo?.mid}_${item?.entries?.[0]?.sid}_card`
                            ] > 0
                            ? "color-green"
                            : data?.profitLoss[
                                `${data?.videoInfo?.mid}_${item?.entries?.[0]?.sid}_card`
                              ] < 0
                            ? "color-red"
                            : ""
                          : ""
                        : ""
                    }`}
                    style={{zIndex:"111"}}
                  >
                    {data?.profitLoss
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${item?.entries?.[0]?.sid}_card`
                        ]
                        ? data?.profitLoss[
                            `${data?.videoInfo?.mid}_${item?.entries?.[0]?.sid}_card`
                          ]
                        : 0
                      : 0}
                  </span>
                </div>
               
              </div>
            </div>
          );
        })}
     </div>
    </div>
  );
};

export default PlayerTable;
