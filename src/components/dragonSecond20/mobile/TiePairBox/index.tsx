import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";

const TiePairBox = ({ data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = 100;
  const max = 10000;

  return (
    <div className="tiePairContainer-m">
      <div className="tiePairRateBoxMain">
        <CommonButtonBox
          value1={10.0}
          value2={"Dragon"}
          value3={15}
          width={"35%"}
        />
        <CommonButtonBox
          value1={20.0}
          value2={"Tie"}
          value3={15}
          width={"20%"}
        />
        <CommonButtonBox
          value1={30.0}
          value2={"Tiger"}
          value3={15}
          width={"35%"}
        />
      </div>
      <CommonButtonBox
          value1={40.0}
          value2={"Pair"}
          value3={15}
          width={"95%"}
        />
      <div style={{ textAlign: "end",width:"100%" }}>
        <span style={{fontSize:"14px" }}>Min:</span>
        <span style={{fontSize:"14px" }}>{min}</span>
        <span style={{ marginLeft: "10px",fontSize:"14px" }}>Max:</span>
        <span style={{fontSize:"14px" }}>{max}</span>
      </div>
    </div>
  );
};

export default TiePairBox;
