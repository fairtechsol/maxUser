import { HandleGameCards } from "../../desktop/card";
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
  // console.log(data, "data")
  return (
    <div className="poker6-container" style={{ width: width }}>
      <div
        className={`tiePairbtnMob-theme-poker back py-1 d-flex row ${
          lock ? "suspended" : ""
        }`}
        onClick={() => (!lock ? handleBet(data) : null)}
      >
        <div className="d-flex column justify-content-between align-center">
          <div className="d-flex flex-column">
            <div className="text-black">{data?.nation}</div>
            <div className="d-flex">
              {card1 != "1" && (
                <span className="ps-1">
                  <HandleGameCards card={card1} />
                </span>
              )}
              {card2 != "1" && (
                <span className="ps-1">
                  <HandleGameCards card={card2} />
                </span>
              )}
            </div>
          </div>
          <div className="d-flex text-black flex-column align-center">
            <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
              {parseFloat(isNaN(value1) ? 0 : value1).toFixed(2)}
            </span>
            <span
              style={{
                fontSize: "12px",
                zIndex: 99,
                color: value3 && (value3 < 0) ? "#BD1828" : "#28a745",
              }}
            >
              {value3}
            </span>
          </div>
        </div>
        <div className="d-flex column p-1">
          <span
            className=""
            style={{ fontSize: "12px", overflow: "auto", marginLeft: "10px" }}
          >
            {value2}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommonButtonBox;
