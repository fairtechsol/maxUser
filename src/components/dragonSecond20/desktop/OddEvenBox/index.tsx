import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const OddEven = ({ name, data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.rate,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: item?.sid,
      min:item?.min,
      max:item?.max
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
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "20px",fontWeight:"bold" }}>{name}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <CommonButtonBox
            value1={odds?.[0]?.rate}
            value2={"EVEN"}
            value3={
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                  ]
                : 0
            }
            width={"45%"}
            handleBet={handleBet}
            lock={odds?.[0]?.gstatus === "0" ? true : false}
            data={odds?.[0]}
          />
          <CommonButtonBox
            value1={odds?.[1]?.rate}
            value2={"ODD"}
            value3={
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                  ]
                : 0
            }
            width={"45%"}
            handleBet={handleBet}
            lock={odds?.[1]?.gstatus === "0" ? true : false}
            data={odds?.[1]}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <CommonButtonBox
            value1={odds?.[2]?.rate}
            value2={"icon1"}
            value3={
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                  ]
                : 0
            }
            width={"45%"}
            handleBet={handleBet}
            lock={odds?.[2]?.gstatus === "0" ? true : false}
            data={odds?.[2]}
          />
          <CommonButtonBox
            value1={odds?.[3]?.rate}
            value2={"icon2"}
            value3={
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                  ]
                : 0
            }
            width={"45%"}
            handleBet={handleBet}
            lock={odds?.[3]?.gstatus === "0" ? true : false}
            data={odds?.[3]}
          />
        </div>
      </div>
    </>
  );
};

export default OddEven;
