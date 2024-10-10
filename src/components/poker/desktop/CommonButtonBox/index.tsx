// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../../store/store";

import { HandleGameCards } from "../card";

const CommonButtonBox = ({
  value1,
  value2,
  value3,
  width,
  handleBet,
  lock,
  data,
  card1,
  card2,
}: any) => {
  // const dispatch: AppDispatch = useDispatch();
  return (
    <div className="poker6player" style={{ width: width }}>
      <div
        className={`casino-odds-box-poker back ${lock ? "suspended" : ""}`}
        onClick={() => (!lock ? handleBet(data) : null)}
      >
        <div className="d-flex">
          <span className="text-black ps-2">{data?.nation}</span>
          <div className="d-flex flex-row" style={{ gap: "6px" }}>
            <span>{value2}</span>
            {card1 != "1" && <HandleGameCards card={card1} />}{" "}
            {card2 != "1" && <HandleGameCards card={card2} />}
          </div>
        </div>
        <div className="d-flex flex-column align-center">
          <span
            className="pe-2"
            style={{ fontSize: "16px", fontWeight: "bolder" }}
          >
            {parseFloat(isNaN(value1) ? 0 : value1).toFixed(2)}
          </span>
          <span
            className="pe-2"
            style={{
              fontSize: "12px",
              zIndex: 99,
              color: value3 && value3 < 0 ? "#BD1828" : "#28a745",
            }}
          >
            {value3}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommonButtonBox;
