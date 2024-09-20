import { useDispatch } from "react-redux";
import OddButtonBox from "../OddButtonBox";
import { AppDispatch } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const OddEven = ({ card, odds, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.b1,
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
      <div className="oddEvenContainer-m" style={{ border: "1px solid #c7c8ca"}}>
        {card ? (
          <>
            {" "}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <OddButtonBox
                value1={odds?.[0]?.b1}
                value2={"ODD"}
                profitLoss={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                      ]
                    :  <br></br>
                }
                width={"40%"}
                lock={odds?.[0]?.gstatus === "0" ? true : false}
                data={odds?.[0]}
                handleBet={handleBet}
              />
              <OddButtonBox
                value1={odds?.[1]?.b1}
                value2={"EVEN"}
                profitLoss={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                      ]
                    :  <br></br>
                }
                width={"40%"}
                lock={odds?.[1]?.gstatus === "0" ? true : false}
                data={odds?.[1]}
                handleBet={handleBet}
              />
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <OddButtonBox
                value1={odds?.[1]?.b1}
                value2={"icon1"}
                profitLoss={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                      ]
                    :  <br></br>
                }
                width={"20%"}
                lock={odds?.[1]?.gstatus === "0" ? true : false}
                data={odds?.[1]}
                handleBet={handleBet}
              />
              <OddButtonBox
                value1={odds?.[0]?.b1}
                value2={"icon2"}
                profitLoss={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                      ]
                    :  <br></br>
                }
                width={"20%"}
                lock={odds?.[0]?.gstatus === "0" ? true : false}
                data={odds?.[0]}
                handleBet={handleBet}
              />
              <OddButtonBox
                value1={odds?.[2]?.b1}
                value2={"icon3"}
                profitLoss={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                      ]
                    :  <br></br>
                }
                width={"20%"}
                lock={odds?.[2]?.gstatus === "0" ? true : false}
                data={odds?.[2]}
                handleBet={handleBet}
              />
              <OddButtonBox
                value1={odds?.[3]?.b1}
                value2={"icon4"}
                profitLoss={
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                      ]
                    :  <br></br>
                }
                width={"20%"}
                lock={odds?.[3]?.gstatus === "0" ? true : false}
                data={odds?.[3]}
                handleBet={handleBet}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OddEven;
