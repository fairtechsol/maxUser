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

      <div className="teenPatti-table-row" style={{ lineHeight: 2 }}>
        <div
          style={{
            width: "100%",
            backgroundColor: "#72bbef",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className={
              lock
                ? "teenPatti-table-item-b suspended"
                : "teenPatti-table-item-b"
            }
            style={{ width: "50%" }}
            onClick={() =>
              data?.gstatus == "SUSPENDED" || data?.gstatus == "CLOSED"
                ? null
                : handleBet(data, "BACK")
            }
          >
            <span className="f18-b my-2 fw-bold">
              {parseFloat(value1).toFixed(2)}
            </span>
            <span className="f10-b">{}</span>
          </div>
          <div
            className={
              lock
                ? "teenPatti-table-item-b suspended"
                : "teenPatti-table-item-b"
            }
            style={{ width: "50%", background: "#f9c9d4" }}
            onClick={() =>
              data?.gstatus == "SUSPENDED" || data?.gstatus == "CLOSED"
                ? null
                : handleBet(data, "LAY")
            }
          >
            <span className="f18-b my-2 fw-bold">
              {parseFloat(value4).toFixed(2)}
            </span>
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
          {value3 || <br/>}
        </span>
      </div>
    </div>
  );
};

export default PlayerButton;
