import { BiSolidHeart } from "react-icons/bi";
import { GiSpades } from "react-icons/gi";
import { ImClubs, ImDiamonds } from "react-icons/im";

const CommonPatternBox = ({
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
      <div className="d-flex justify-content-between">
        <span
          style={{ fontSize: "16px" }}
          className={`${isNaN(value3)
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
        <span
          style={{ fontSize: "16px" }}
          className={`${isNaN(value3)
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

export default CommonPatternBox;
