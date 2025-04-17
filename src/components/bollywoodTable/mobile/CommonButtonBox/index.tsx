import { BiSolidHeart } from "react-icons/bi";
import { GiSpades } from "react-icons/gi";
import { ImClubs, ImDiamonds } from "react-icons/im";

const CommonButtonBox = ({
  value1,
  value2,
  value3,
  width,
  handleBet,
  lock,
  data,
}: any) => {
  return (
    <div className="commonButtonBoxContainer" style={{ width: width }}>
      <div>
        <span style={{ fontSize: "12px", fontWeight: "bolder" }}>
          {parseFloat(value1).toFixed(2)}
        </span>
      </div>
      <div
        className={`tiePairbtn-theme ${lock ? "suspended" : ""}`}
        onClick={() => (!lock ? handleBet(data) : null)}
      >
        {value2 === "Red" ? (
          <>
            <ImDiamonds color="#ff0000" /> <BiSolidHeart color="#ff0000" />
          </>
        ) : value2 === "Black" ? (
          <>
            <ImClubs color="#000000" /> <GiSpades color="#000000" />
          </>
        ) : (
          <span style={{ fontSize: "14px" }}>{value2}</span>
        )}
      </div>
      <div>
        <span
          style={{ fontSize: "12px" }}
          className={`${
            value3 && value3 > 0 ? "color-green" : value3 < 0 ? "color-red" : ""
          }`}
        >
          {value3 || <br></br>}
        </span>
      </div>
    </div>
  );
};

export default CommonButtonBox;
