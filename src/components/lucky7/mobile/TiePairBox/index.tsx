import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";
import { seven } from "../../../../assets/images";

const TiePairBox = ({ data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = 100;
  const max = 10000;

  return (
    <div className="tiePairContainer">
      <div className="tiePairRateBoxMainlucky">
        <CommonButtonBox
          value1={10.0}
          value2={"LOW Card"}
          value3={15}
          width={"40%"}
        />
        <div >
        <img src={seven} width={"55px"} height={"70px"} style={{marginTop:"22px"}}/>
        </div>
         
        <CommonButtonBox
          value1={40.0}
          value2={"HIGH Card"}
          value3={15}
          width={"40%"}
        />
       
      </div>
      <div style={{ textAlign: "end",width:"100%" }}>
        <span style={{ fontWeight: "bolder" }}>Min:</span>
        <span>{min}</span>
        <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default TiePairBox;
