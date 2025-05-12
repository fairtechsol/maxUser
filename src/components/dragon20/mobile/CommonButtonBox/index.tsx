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
    <div className="commonButtonBoxContainerNew" style={{ width: width }}>
      <div>
        <span style={{ fontSize: "12px", fontWeight: "bolder", paddingTop: "0px" }}>
          {lock ? 0 : parseFloat(isNaN(value1) ? 0 : value1).toFixed(2)}
        </span>
      </div>
      <div
        className={`tiePairbtnMob-theme ${lock ? "lock" : ""}`}
        onClick={() => (!lock ? handleBet(data) : null)}
        style={{ lineHeight: "2.5", width: "100%" }}
      >
        <span style={{ fontSize: "14px" }}>
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
      </div>
      <div>
        <span
          style={{ fontSize: "12px" }}
          className={`${isNaN(value3)
              ? ""
              : value3 > 0
                ? "color-green"
                : value3 < 0
                  ? "color-red"
                  : ""
            }`}
        >
          {isNaN(value3) ? "\u00A0" : value3}
        </span>
      </div>
    </div>
  );
};

export default CommonButtonBox;
