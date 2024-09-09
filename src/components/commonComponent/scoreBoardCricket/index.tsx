import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import { isMobile } from "../../../utils/screenDimension";

const ScoreBoardCricket = ({ data }: any) => {
  const isMobile = window.innerWidth <= 768; // Example breakpoint for mobile, adjust as needed

  return (
    <Container
      className=" mb-1"
      style={{
        backgroundImage: `url("https://versionobj.ecoassetsservice.com/v18/static/front/img/scorecard-bg.png")`,
        backgroundSize: "cover", // Ensures the image covers the entire container
        backgroundRepeat: "no-repeat", 
        backgroundPosition: "center", // Centers the image within the container
        width: "100%",
        height: "105px",
      }}
    >
      <Row>
        <Col xs={12} md={6}>
          {/* Status Message */}
          <div
            className={
              isMobile ? "title-12 text-xl-end mb-2" : "text-xl-end mb-2"
            }
          >
            <span>{data?.spnmessage} fghjfjh</span>
          </div>

          {/* Ball-by-Ball */}
          <Row>
            <Col xs={12}>
              <div
                className="text-xl-end ball-by-ball mt-2"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: isMobile ? "flex-start" : "flex-end",
                }}
              >
                {data?.balls?.map((ball: any, index: any) => {
                  return (
                    ball !== "" && (
                      <div
                        key={index}
                        className={`ball-runs item-center ${getBallClass(
                          ball
                        )}`}
                      >
                        {ball}
                      </div>
                    )
                  );
                })}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

// Helper function to determine ball class based on runs or wicket
const getBallClass = (ball: any) => {
  switch (ball) {
    case "0":
    case "1":
    case "2":
    case "3":
      return "single";
    case "4":
      return "four";
    case "6":
      return "six";
    case "ww":
      return "wicket";
    default:
      return "";
  }
};

export default ScoreBoardCricket;
