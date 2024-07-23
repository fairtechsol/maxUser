

const PlayerButton = ({
  value1,
  value2,
  value3,
  value4,
  width,
  handleBet,
  lock,
  data,
}: any) => {

  return (
    <div className="commonButtonBoxContainer" style={{ width: width }}>
      <div>
        <span style={{ fontSize: "16px", fontWeight: "bolder" }}>
          {value2 && value2}
        </span>
      </div>

      {/* <div
        className={`tiePairbtn-theme ${lock ? "suspended" : ""}`}
        onClick={() => (!lock ? handleBet(data) : null)}
      ></div> */}

      <div className="teenPatti-table-row" style={{ lineHeight: 1 }}>
        <div
          className={lock ? "suspended" : ""}
          style={{
            width: "100%",
            backgroundColor: "#72bbef",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className="teenPatti-table-item"
            style={{ width: "50%" }}
            onClick={() => handleBet(data,"BACK")}
          >
            <span className="f18-b my-2 fw-bold">{parseFloat(value1).toFixed(2)}</span>
            <span className="f10-b">{}</span>
          </div>
          <div
            className={`teenPatti-table-item`}
            style={{ width: "50%", background: "#f9c9d4" }}
            onClick={() => handleBet(data,"LAY")}
          >
            <span className="f18-b my-2 fw-bold">{parseFloat(value4).toFixed(2)}</span> 
            <span className="f10-b">{}</span>
          </div>
        </div>
      </div>

      <div>
        <span
          style={{ fontSize: "16px" }}
          className={`${
            value3 && value3 > 0
              ? "color-green"
              : value3 < 0
              ? " color-red"
              : ""
          }`}
        >
          {value3 || 0}
        </span>
      </div>
    </div>
  );
};

export default PlayerButton;
