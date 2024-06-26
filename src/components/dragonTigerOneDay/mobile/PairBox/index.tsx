import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const PairBox = ({ odds, data }: any) => {
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
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
    console.log("team", team);
  };
// console.log('first',odds)
  return (
    <div className="w-100">
       <div
                style={{
                  width: "100%",
                  marginTop: "5%",
                  display: "flex",
                  flexDirection: "column",
                  border: "0.3px solid #c7c8ca",
                  marginLeft: "5px",
                  justifyContent:"center",
                  alignItems:"center",
                }}
              >
                <CommonButtonBox
            value1={odds?.b1}
            value2={"Pair"}
            value3={
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                  ]
                : 0
            }
            width={"90%"}
            handleBet={handleBet}
            lock={odds?.gstatus === "CLOSED" || odds?.b1==="0.00" ? true : false}
            data={odds}
          />
    </div>
    </div>
  );
};

export default PairBox;
