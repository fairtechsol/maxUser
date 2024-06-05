import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";

const TiePairBox = ({ data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = 100;
  const max = 10000;

  return (
    <div className="tiePairContainer">
      <div className="tiePairRateBoxMain">
        <CommonButtonBox
          value1={10.0}
          value2={"Dragon"}
          value3={15}
          width={"30%"}
        />
        <CommonButtonBox
          value1={20.0}
          value2={"Tie"}
          value3={15}
          width={"10%"}
        />
        <CommonButtonBox
          value1={30.0}
          value2={"Tiger"}
          value3={15}
          width={"30%"}
        />
        <div style={{ width: "0.5%", backgroundColor: "#ffc742" }}></div>
        <CommonButtonBox
          value1={40.0}
          value2={"Pair"}
          value3={15}
          width={"20%"}
        />
      </div>
      <div style={{ textAlign: "end" }}>
        <span style={{ fontWeight: "bolder" }}>Min:</span>
        <span>{min}</span>
        <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default TiePairBox;
