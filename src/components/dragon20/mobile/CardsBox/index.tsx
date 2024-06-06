import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonCardImg from "../CommonCardImg";

const CardBox = ({ name, rate }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = 100;
  const max = 10000;
  return (
    <>
      <div className="cardContainerMob">
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "12px",fontWeight:"bolder" }}>
             {parseFloat(rate).toFixed(2)}
          </span>
        </div>
        <div>
          <CommonCardImg/>
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

export default CardBox;
