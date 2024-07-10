import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";

const OddEven = ({ data, card, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = odds?.[0]?.min;
  const max = odds?.[0]?.max;
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId:  data?.id,
      odd: item?.rate,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: item?.sid,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  
  return (
    <>
      <div className="oddEvenContainer">
        {card ? (
          <>
            {" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems:"center"
              }}
            >
              <CommonButtonBox
                value1={odds?.[0]?.b1}
                value2={odds?.[0]?.nat}
                value3={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                      ]
                    : 0
                }
                width={"80%"}
                handleBet={handleBet}
                lock={odds?.[0]?.gstatus === "SUSPENDED" ? true : false}
                data={odds?.[0]}
              />
              <CommonButtonBox
                value1={odds?.[1]?.b1}
                value2={odds?.[1]?.nat}
                value3={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                      ]
                    : 0
                }
                width={"80%"}
                handleBet={handleBet}
                lock={odds?.[1]?.gstatus === "SUSPENDED" ? true : false}
                data={odds?.[1]}
              />
            </div>
            <div style={{ textAlign: "end" }}>
              <span style={{ fontWeight: "bolder" }}>Min:</span>
              <span>{min}</span>
              <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                Max:
              </span>
              <span>{max}</span>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems:"center"
              }}
            >
              <CommonButtonBox
                value1={odds?.[0]?.b1}
                value2={odds?.[0]?.nat}
                value3={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                      ]
                    : 0
                }
                width={"80%"}
                handleBet={handleBet}
                lock={odds?.[0]?.gstatus === "SUSPENDED" ? true : false}
                data={odds?.[0]}
              />
              <CommonButtonBox
                value1={odds?.[1]?.b1}
                value2={odds?.[1]?.nat}
                value3={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                      ]
                    : 0
                }
                width={"80%"}
                handleBet={handleBet}
                lock={odds?.[1]?.gstatus === "SUSPENDED" ? true : false}
                data={odds?.[1]}
              />
            </div>
            <div style={{ textAlign: "end" }}>
              <span style={{ fontWeight: "bolder" }}>Min:</span>
              <span>{min}</span>
              <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                Max:
              </span>
              <span>{max}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OddEven;
