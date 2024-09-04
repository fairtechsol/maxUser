import { HandleGameCards } from "../../desktop/card";
const CommonButtonBox = ({
  value1,
  value2,
  value3,
  width,
  handleBet,
  lock,
  data,
  min,
  max,
  card1,
  card2,
}: any) => {
  // const dispatch: AppDispatch = useDispatch();
// console.log(data, "data")
  return (
    <div className="poker6-container" style={{ width: width }}>
      <div
        className={`tiePairbtnMob-theme-poker back py-1 d-flex row ${lock ? "suspended" : ""}`}
        onClick={() => (!lock ? handleBet(data) : null)}
      >
        <div className="d-flex column justify-content-between">
        <div className="text-black" >{data?.nation}</div>
        <div className="d-flex text-black">
          <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
            {parseFloat(isNaN(value1) ? 0 : value1).toFixed(2)}
          </span>
        </div>
        </div>
        <div className="d-flex column p-1">
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
            <span className=""
            style={{ fontSize: "12px", overflow: "auto", marginLeft: "10px" }}
          >
            {value2}
          </span>
        </div>
        
      </div>

      {/* <div className="d-flex justify-content-between w-100">
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
        <div className="title-10">
            <span>Min:</span>
            <span>{min}</span>
            <span>Max:</span>
            <span>{max}</span>
          </div>
      </div> */}
    </div>
  );
};

export default CommonButtonBox;
