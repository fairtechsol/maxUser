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
    <div
      className="commonButtonBoxContainer"
      style={{
        width: width,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid #aaa",
        borderLeft: "1px solid #aaa",
        borderRight: "1px solid #aaa",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
        <div>
          {value2 && value2 === "Amar" ? (
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bolder",
                paddingLeft: "4px",
              }}
            >
              A.
            </span>
          ) : (
            ""
          )}
          {value2 && value2 === "Akbar" ? (
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bolder",
                paddingLeft: "4px",
              }}
            >
              B.
            </span>
          ) : (
            ""
          )}
          {value2 && value2 === "Anthony" ? (
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bolder",
                paddingLeft: "4px",
              }}
            >
              C.
            </span>
          ) : (
            ""
          )}
          <span
            style={{
              fontSize: "16px",
              fontWeight: "bolder",
              paddingLeft: "4px",
            }}
          >
            {value2 && value2}
          </span>
        </div>
        <div>
          <span
            style={{ fontSize: "14px", paddingLeft: "4px" }}
            className={`${
              value3 && value3 > 0
                ? "color-green"
                : value3 < 0
                ? " color-red"
                : ""
            }`}
          >
            {value3 || "\u00A0"}
          </span>
        </div>
      </div>

      <div
        className="teenPatti-table-row"
        style={{ lineHeight: 2, display: "flex", width: "30%" }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#72bbef",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
           className={lock ? "suspended teenPatti-table-item" : "teenPatti-table-item"}
            style={{ width: "50%" }}
            onClick={() => handleBet(data, "BACK")}
          >
            <span className="f18-b my-2 fw-bold">
              {parseFloat(value1).toFixed(2)}
            </span>
            <span className="f10-b">{}</span>
          </div>
          <div
           className={lock ? "suspended teenPatti-table-item" : "teenPatti-table-item"}
            style={{ width: "50%", background: "#f9c9d4" }}
            onClick={() => handleBet(data, "LAY")}
          >
            <span className="f18-b my-2 fw-bold">
              {parseFloat(value4).toFixed(2)}
            </span>
            <span className="f10-b">{}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerButton;
