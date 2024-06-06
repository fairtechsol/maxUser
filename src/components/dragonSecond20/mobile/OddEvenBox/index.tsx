import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";

const OddEven = ({data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = 100;
  const max = 10000;
  return (
    <>
      <div className="oddEvenContainerMob">
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
          <CommonButtonBox
            value1={10.0}
            value2={"Even"}
            value3={15}
            width={"40%"}
          />
          <CommonButtonBox
            value1={40.0}
            value2={"Odd"}
            value3={15}
            width={"40%"}
          />
        </div>
        <div style={{ textAlign: "end" }}>
        <span style={{fontSize:"12px"}}>Min:</span>
        <span style={{fontSize:"12px"}}>{min}</span>
        <span style={{fontSize:"12px",marginLeft: "10px" }}>Max:</span>
        <span style={{fontSize:"12px"}}>{max}</span>
      </div>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
          <CommonButtonBox
            value1={10.0}
            value2={"icon1"}
            value3={15}
            width={"40%"}
          />
          <CommonButtonBox
            value1={40.0}
            value2={"icon2"}
            value3={15}
            width={"40%"}
          />
        </div>
        <div style={{ textAlign: "end" }}>
        <span style={{fontSize:"12px"}}>Min:</span>
        <span style={{fontSize:"12px"}}>{min}</span>
        <span style={{fontSize:"12px",marginLeft: "10px" }}>Max:</span>
        <span style={{fontSize:"12px"}}>{max}</span>
      </div>
      </div>
    </>
  );
};

export default OddEven;
