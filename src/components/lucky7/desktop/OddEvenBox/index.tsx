import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";

const OddEven = ({ card }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = 100;
  const max = 10000;
  return (
    <>
      <div className="oddEvenContainer">
        {card ? <> <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
          <CommonButtonBox
            value1={10.0}
            value2={"EVEN"}
            value3={15}
            width={"40%"}
          />
          <CommonButtonBox
            value1={40.0}
            value2={"ODD"}
            value3={15}
            width={"40%"}
          />
        </div>
        <div style={{ textAlign: "end" }}>
        <span style={{ fontWeight: "bolder" }}>Min:</span>
        <span>{min}</span>
        <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
        <span>{max}</span>
      </div></>:<><div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
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
        <span style={{ fontWeight: "bolder" }}>Min:</span>
        <span>{min}</span>
        <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
        <span>{max}</span>
      </div></>}
       
      
      </div>
    </>
  );
};

export default OddEven;
