import { Row, Col, Container } from "react-bootstrap";
import { Chart } from "react-google-charts";
import isMobile from "../../../../utils/screenDimension";
import PieChart from "../chart";


export const options = {
  is3D: true,
backgroundColor:"none",
chartArea:{left:0,top:0,width:'170',height:'200'}
};
const BaccaratStatistics = ({ odds,graphsData }: any) => {
  
  const data = [
    ["Task", "Hours per Day"],
    ["Player",graphsData ? graphsData?.P : 45],
    ["Banker", graphsData ? graphsData?.B : 45],
    ["Tie", graphsData ? graphsData?.T : 10]
  ];
  // console.log(odds, "odds");
  return (
    <div
      className={
        isMobile ? "d-flex flex-column w-100" : "d-flex flex-row baccarat"
      }
    >
      <div style={{ width: "25%"}}>
        <Row className="mt-2 justify-content-center baccarat-graph">
          <Col md={3} className="text-center">
            <h4>Statistics</h4>
            <PieChart
              data={data}
              options={options}
            />
          </Col>
        </Row>
      </div>
      <div style={{ width: isMobile ? "100%" : "82%"}} className={isMobile ? "title-12": ""}>
        <Row>
          <div
            className={
              isMobile ? "baccarat-other-odds-m" : "baccarat-other-odds"
            }
          >
            <>
              <Col
                key={"index"}
                md={3}
                className={`baccarat-other-odd-box ${
                  odds?.[5]?.gstatus == "0" ? "suspended-box" : ""
                }`}
              >
                <div>{"Perfect Pair"}</div>
                <div>{parseFloat(odds?.[5]?.b1)}:1</div>
              </Col>
              <Col
                key={"index"}
                md={3}
                className={`baccarat-other-odd-box ${
                  odds?.[6]?.gstatus == "0" ? "suspended-box" : ""
                }`}
              >
                <div>{"Big"}</div>
                <div>{parseFloat(odds?.[6]?.b1)}:1</div>
              </Col>
              <Col
                key={"index"}
                md={3}
                className={`baccarat-other-odd-box ${
                  odds?.[7]?.gstatus == "0" ? "suspended-box" : ""
                }`}
              >
                <div>{"Small"}</div>
                <div>{parseFloat(odds?.[7]?.b1)}:1</div>
              </Col>
              <Col
                key={"index"}
                md={3}
                className={`baccarat-other-odd-box ${
                  odds?.[8]?.gstatus == "0" ? "suspended-box" : ""
                }`}
              >
                <div>{"Either Pair"}</div>
                <div>{parseFloat(odds?.[8]?.b1)}:1</div>
              </Col>
            </>
            {/* ))}  */}
          </div>
        </Row>
        <div style={{ width: isMobile ? "100%" : "82%"}}>
          <Row
            className={
              isMobile
                ? "baccarat-main-odds-m mt-3 p-0"
                : "baccarat-main-odds mt-3"
            }
          >
            <Col
              md={3}
              className={
                isMobile
                  ? "player-pair-box-container-m"
                  : "player-pair-box-container"
              }
            >
              <div
                className={`player-pair-box ${
                  odds?.[4]?.gstatus == "0" ? "suspended-box" : ""
                }`}
              >
                <div>{"Player Pair"}</div>
                <div>{parseFloat(odds?.[4]?.b1)}:1</div>
              </div>
            </Col>
            <Col
              md={3}
              className={isMobile ? "player-box-m" : "player-box-container"}
            >
              <div
                className={`player-box ${
                  odds?.[0]?.gstatus == "0" ? "suspended-box" : ""
                }`}
              >
                <div>{"Player"}</div>
                <div>{parseFloat(odds?.[0]?.b1)}:1</div>
                <div>
                  <img
                    src="https://versionobj.ecoassetsservice.com/v13/static/front/img/cards/1.jpg"
                    alt="card"
                  />
                  <img
                    src="https://versionobj.ecoassetsservice.com/v13/static/front/img/cards/1.jpg"
                    alt="card"
                  />
                </div>
              </div>
            </Col>
            <Col
              md={3}
              className={isMobile ? "player-box-m" : "tie-box-container"}
            >
              <div
                className={`tie-box ${
                  odds?.[3]?.gstatus == "0" ? "suspended-box" : ""
                }`}
              >
                <div>{"Tie"}</div>
                <div>{parseFloat(odds?.[3]?.b1)}:1</div>
              </div>
            </Col>
            <Col
              md={3}
              className={isMobile ? "player-box-m" : "banker-box-container"}
            >
              <div
                className={`banker-box ${
                  odds?.[1]?.gstatus == "0" ? "suspended-box" : ""
                }`}
              >
                <div>{"Banker"}</div>
                <div>{parseFloat(odds?.[1]?.b1)}:1</div>
                <div>
                  <img
                    src="https://versionobj.ecoassetsservice.com/v13/static/front/img/cards/1.jpg"
                    alt="card"
                  />
                  <img
                    src="https://versionobj.ecoassetsservice.com/v13/static/front/img/cards/1.jpg"
                    alt="card"
                  />
                </div>
              </div>
            </Col>
            <Col
              md={4}
              className={
                isMobile
                  ? "banker-pair-box-container-m"
                  : "banker-pair-box-container"
              }
            >
              <div
                className={`banker-pair-box ${
                  odds?.[4]?.gstatus == "0" ? "suspended-box" : ""
                }`}
              >
                <div>{"Banker Pair"}</div>
                <div>{parseFloat(odds?.[4]?.b1)}:1</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BaccaratStatistics;
