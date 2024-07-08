// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../../store/store";
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
  title,
  min,
  max
}: any) => {
  // const dispatch: AppDispatch = useDispatch();

  return (
    <div className="commonButtonBoxContainer" style={{ width: width }}>
      <div>
        
      </div>
      {/* <div className="tiePairbtn-theme suspended" onClick={handleBet}> */}
      <div
        className={`tiePairbtn-theme d-flex justify-content-between ${lock ? "suspended" : ""}`}
        onClick={() => (!lock ? handleBet(data) : null)}
      >
        <span>
          {value2 === "icon1" ? (
            <>
              <ImDiamonds color="#ff0000" />
              <BiSolidHeart color="#ff0000" />
            </>
          ) : value2 === "icon2" ? (
            <>
              <ImClubs color="#000000" />
              <GiSpades color="#000000" />
            </>
          ) : (
            value2
          )}
        </span>
        <span style={{ fontSize: "16px", fontWeight: "bolder" }}>
          {parseFloat(isNaN(value1) ? 0 : value1).toFixed(2)}
        </span>
      </div>
      <div className="d-flex justify-content-between w-100">
        <div
          style={{ fontSize: "16px" }}
          className={` ${
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
        </div>
        <div>
        <span style={{ fontWeight: "bolder" }}>Min:</span>
        <span>{min}</span>
        <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
        <span>{max}</span>
      </div>
      </div>
    </div>
  );
};

export default CommonButtonBox;
