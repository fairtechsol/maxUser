import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import PlayerButton from "../PlayerButton";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const TiePairBox2 = ({ lowHigh, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = lowHigh?.[0]?.min;
  const max = lowHigh?.[0]?.max;
  // const [modelOpen, setModelOpen] = useState(false);

  const handleBet = (item: any, type: any) => {
    let team = {
      bettingType: type,
      matchId: data?.id,
      odd: type === "BACK" ? item?.b1 : item?.l1,
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
    <div className="tiePairContaine">
      <div
        style={{
          width: "100%",
          textAlign: "end",
          borderBottom: "1px solid #aaa",
          borderLeft: "1px solid #aaa",
          borderRight: "1px solid #aaa",
          display: "flex",
          alignItems: "start",
          justifyContent: "left",
          gap: "2px",
          fontWeight: "600",
          paddingLeft: "4px",
        }}
      >
        <span>Min: {min}</span>
        <span>Max: {max}</span>
      </div>

      {lowHigh &&
        lowHigh?.map((item: any, index: number) => (
          <PlayerButton
            key={index}
            value1={item?.b1}
            value4={item?.l1}
            value2={item?.nat}
            value3={
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${item?.sid}_card`
                  ]
                : 0
            }
            width={"100%"}
            handleBet={handleBet}
            lock={item?.gstatus === "CLOSED"}
            data={item}
          />
        ))}
    </div>
  );
};

export default TiePairBox2;
