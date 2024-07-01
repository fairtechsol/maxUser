import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { ImClubs } from "react-icons/im";
import { GiSpades } from "react-icons/gi";
import { BiSolidHeart } from "react-icons/bi";
import { ImDiamonds } from "react-icons/im";
const CommonButtonBox = ({
  value1,
  value2,
  value3,
  width,
  handleBet,
  lock,
  data,
  min,
  max
}: any) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="commonButtonBoxContainer" style={{ width: width }}>
     
      <div
        className={`tiePairbtnMob-theme d-flex row  ${lock ? "suspended" : ""}`}
        onClick={() => (!lock ? handleBet(data) : null)}
      >
        <span style={{ fontSize: "12px", textAlign: "left", overflow: "auto" }}>
          {value2}
        </span>
        <div className="d-flex justify-content-between"> 
          <span style={{ fontSize: "10px", fontWeight: "bolder" }}>
          {parseFloat(isNaN(value1) ? 0 : value1).toFixed(2)}
        </span>
      <div className="title-10">
        <span >Min:</span>
        <span>{min}</span>
        <span>Max:</span>
        <span>{max}</span>
        </div>
        <div>
      </div>
        </div>
      </div>
         
      <div className="d-flex justify-content-start w-100">
        <span
          style={{ fontSize: "12px", justifyContent: "flex-start" }}
          className={`${
            isNaN(value3)
              ? ""
              : value3 > 0
              ? "color-green"
              : value3 < 0
              ? "color-red"
              : ""
          }`}
        >
          {isNaN(value3) ? 0 : value3}
        </span>
      </div>
    </div>
  );
};

export default CommonButtonBox;
