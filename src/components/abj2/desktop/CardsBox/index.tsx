import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonCardImg from "../CommonCardImg";

const CardBox = ({ name, rate }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = 100;
  const max = 10000;
  return (
    <>
      <div className="cardContainer">
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "16px"}}>
            {rate}
          </span>
        </div>
        <div>
          <CommonCardImg/>
        </div>
       
      </div>
    </>
  );
};

export default CardBox;
