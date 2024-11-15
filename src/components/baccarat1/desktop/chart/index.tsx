const PieChart = ({ data}: any) => {
  return (
    <div
      style={{
        width: "250px",
        height: "160px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          width: "140px",
          height: "150px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "15px",
        }}
      >
        <div
          className="chartContainer"
          style={{
            background: `conic-gradient(#086cb8 0% ${data?.[0]}%, #ae2130 ${
              data?.[0]
            }% ${data?.[0] + data?.[1]}%, #279532 ${100 - data?.[2]}% 100%)`,
          }}
        >
          <div className="sliceText">
            <span>{data?.[1]}%</span>
            <span style={{
              position:"absolute",
              top:10,
              left:35
            }}>
              {data?.[2]}%
              </span>
            <span>{data?.[0]}%</span>
          </div>
        </div>
        <div
          className="secondCiecle"
          style={{
            background: `conic-gradient(#06518a 0% ${data?.[0] - 1}%, #831924 ${
              data?.[0] - 1
            }% ${data?.[0] + data?.[1]}%, #0b6714 ${100 - data?.[2]}% 100%)`,
          }}
        ></div>
      </div>
      <div className="legend-Container">
        <div className="d-flex flex-row gap-1 align-items-center">
          <div
            className="legend-circle"
            style={{ backgroundColor: "#086cb8" }}
          ></div>
          <span style={{ fontSize: "12px", textAlign: "left" }}>Player</span>
        </div>
        <div className="d-flex flex-row gap-1 align-items-center">
          <div
            className="legend-circle"
            style={{ backgroundColor: "#ae2130" }}
          ></div>
          <span style={{ fontSize: "12px", textAlign: "left" }}>Banker</span>
        </div>
        <div className="d-flex flex-row gap-1 align-items-center">
          <div
            className="legend-circle"
            style={{ backgroundColor: "#279532" }}
          ></div>
          <span style={{ fontSize: "12px", textAlign: "right" }}>Tie</span>
        </div>
      </div>
    </div>
  );
};
export default PieChart;
