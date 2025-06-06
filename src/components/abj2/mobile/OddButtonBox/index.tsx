import { BiSolidHeart } from "react-icons/bi";
import { GiSpades } from "react-icons/gi";
import { ImClubs, ImDiamonds } from "react-icons/im";

const OddButtonBox = ({
  profitLoss,
  value1,
  value2,
  lock,
  handleBet,
  data,
}: any) => {
  return (
    <div className="commonButtonBoxContainerOdd">
      <div>
        <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
          {value2 === "icon1" ? (
            <>
              <ImClubs size={20} color="#000000" />
            </>
          ) : value2 === "icon2" ? (
            <>
              <GiSpades size={20} color="#000000" />
            </>
          ) : value2 === "icon3" ? (
            <>
              <BiSolidHeart size={20} color="#ff0000" />
            </>
          ) : value2 === "icon4" ? (
            <>
              <ImDiamonds size={20} color="#ff0000" />
            </>
          ) : (
            value2
          )}
        </span>
      </div>
      {/* <div className="tiePairbtn-theme suspended" onClick={handleBet}> */}
      <div
        className={`evenOddbtn-theme-m ${lock ? "suspended" : ""}`}
        style={{ width: "95%" }}
        onClick={() => (!lock ? handleBet(data) : null)}
      >
        <span> {parseFloat(isNaN(value1) ? 0 : value1).toFixed(2)}</span>
      </div>
      <div>
        <span
          style={{ fontSize: "14px" }}
          className={`${
            profitLoss && profitLoss > 0
              ? "color-green"
              : profitLoss < 0
              ? "color-red"
              : ""
          }`}
        >
          {profitLoss ||  <br></br>}
        </span>
      </div>
    </div>
  );
};

export default OddButtonBox;
