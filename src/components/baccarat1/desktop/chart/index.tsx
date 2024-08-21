import { Chart } from "react-google-charts";

const PieChart = ({ data, options }: any) => {
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
          marginLeft:"15px"
        }}
      >
        <div className="chartContainer" style={{
    background: `conic-gradient(#086cb8 0% ${data?.[0]}%, #ae2130 ${data?.[0]}% ${data?.[0]+data?.[1]}%, #279532 ${100-data?.[2]}% 100%)`
  }}>
          <div className="sliceText">
          <span>{data?.[0]}%</span>
          <span>{data?.[1]}%</span>
          </div>
          
        </div>
        <div className="secondCiecle" style={{
    background: `conic-gradient(#06518a 0% ${data?.[0]-1}%, #831924 ${data?.[0]-1}% ${data?.[0]+data?.[1]}%, #0b6714 ${100-data?.[2]}% 100%)`
  }}></div>
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

////////////////////////////////////////////////
// body {
//   background: transparent; /* Make it white if you need */
//   padding: 0 24px;
//   margin: 0;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
//     Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
// }

// .App {
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   position: absolute;
//   bottom: 319px;
//   right: 450px;
//   z-index: 999;
//   background: conic-gradient(
//     #086cb8 0% 50%,
//     #ae2130 50% 76.66%,
//     #279532 76.66% 100%
//   );
// }
// .slice1 {
//   clip-path: polygon(50% 50%, 0% 0%, 100% 0%);
//   background: #ff9999;
// }

// .slice2 {
//   clip-path: polygon(50% 50%, 100% 0%, 100% 100%);
//   background: #99ccff;
// }

// .slice3 {
//   clip-path: polygon(50% 50%, 100% 100%, 0% 100%);
//   background: #ffcc99;
// }
// .secondCiecle {
//   /* background-color: #831924; */
//   width: 198px;
//   height: 200px;
//   border-radius: 50%;
//   position: relative;
//   background: conic-gradient(
//     #06518a 0% 51%,
//     #831924 50% 76.66%,
//     #279532 76.66% 100%
//   );
//   /* bottom: 320px; */
//   /* left: 100px; */
// }

{
  /* <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div className="App">
        <div className="slice slice1"></div>
        <div className="slice slice2"></div>
        <div className="slice slice3"></div>
      </div>
      <div className="secondCiecle"></div>
    </div> */
}
