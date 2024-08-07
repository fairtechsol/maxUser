import { useDispatch } from "react-redux";
import { seven } from "../../../../assets/images";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";
import { useEffect } from "react";
const TiePairBox = ({ lowHigh, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = lowHigh?.[0]?.min;
  const max = lowHigh?.[0]?.max;

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
  };

  useEffect(() => {
    if (lowHigh?.[0]?.gstatus === "0" ||lowHigh?.[0]?.rate === "0.00") {
      dispatch(selectedBetAction(""));
    } 
    
  }, [lowHigh?.[0]?.gstatus,lowHigh?.[0]?.rate]);

  return (
    <div className="tiePairContainer-l7a">
      <div className="tiePairRateBoxMainlucky">
        <CommonButtonBox
          value1={lowHigh?.[0]?.rate}
          value2={"LOW Card"}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.[0]?.sid}_card`
                ]
              : 0
          }
          width={"40%"}
          handleBet={handleBet}
          lock={lowHigh?.[0]?.gstatus === "0" ? true : false}
          data={lowHigh?.[0]}
        />
        <div>
          <img
            src={seven}
            width={"55px"}
            height={"70px"}
            style={{ marginTop: "22px" }}
          />
        </div>

        <CommonButtonBox
          value1={lowHigh?.[1]?.rate}
          value2={"HIGH Card"}
          value3={
            data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.[1]?.sid}_card`
                ]
              : 0
          }
          width={"40%"}
          handleBet={handleBet}
          lock={lowHigh?.[1]?.gstatus === "0" ? true : false}
          data={lowHigh?.[1]}
        />
      </div>
      <div style={{ textAlign: "end", width: "100%" }}>
        <span style={{ fontWeight: "bolder" }}>Min:</span>
        <span>{min}</span>
        <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default TiePairBox;
