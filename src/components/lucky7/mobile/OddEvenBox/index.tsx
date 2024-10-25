import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const OddEven = ({ card, odds, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet=(item:any)=>{
    let team ={
      "bettingType": "BACK",
      "matchId": data?.id,
      "odd": item?.rate,
      "stake": 0,
      "matchBetType": "matchOdd",
      "betOnTeam":item?.nation,
      "name":item?.nation,
      "bettingName": "Match odds",
      "selectionId": item?.sid,
      "min":item?.min,
      "max":item?.max
    }
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  }
  return (
    <>
      <div className="oddEvenContainerlucky">
        {card ? <> <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
          <CommonButtonBox
            value1={odds?.[0]?.rate || 0}
            value2={"Even"}
            value3={data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                ]
              : 0}
            width={"45%"}
            handleBet={handleBet}
            lock={odds?.[0]?.gstatus==="0"?true:false}
            data={odds?.[0]}
          />
          <CommonButtonBox
            value1={odds?.[1]?.rate || 0}
            value2={"Odd"}
            value3={data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                ]
              : 0}
            width={"45%"}
            handleBet={handleBet}
            lock={odds?.[1]?.gstatus==="0"?true:false}
            data={odds?.[1]}
          />
        </div>
      </>:<><div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
          <CommonButtonBox
            value1={odds?.[0]?.rate || 0}
            value2={"icon1"}
            value3={data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                ]
              : 0}
            width={"45%"}
            handleBet={handleBet}
            lock={odds?.[0]?.gstatus==="0"?true:false}
            data={odds?.[0]}
          />
          <CommonButtonBox
            value1={odds?.[1]?.rate || 0}
            value2={"icon2"}
            value3={data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                ]
              : 0}
            width={"45%"}
            handleBet={handleBet}
            lock={odds?.[1]?.gstatus==="0"?true:false}
            data={odds?.[1]}
          />
        </div>
     </>}
       
      
      </div>
    </>
  );
};

export default OddEven;
