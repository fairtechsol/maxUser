import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import isMobile from "../../../utils/screenDimension";

const ScoreBoard = ({ data }: any) => {
  return (
    <Container className="scorecard mb-1">
      <Row>
        <Col xs={12} md={6}>
          {/* {data?.teams?.map((team:any, index:any) => ( */}
          <div
            className={
              isMobile ? "title-12 team-1 row mb-2" : "team-1 row mb-2 "
            }
          >
            <span className="team-name col-3">{data?.spnnation1}</span>
            <span className="score col-4 text-end">{data?.score1}</span>
            {/* {index === 1 && ( */}
            <span
              className={
                isMobile ? "title-12 team-name col-5" : "team-name col-5"
              }
            >
              <span>{data?.spnrunrate1 && `CRR ${data?.spnrunrate1} `}</span>
              <span>{data?.spnreqrate1 && `RR ${data?.spnreqrate1}`}</span>
            </span>
            {/* )} */}
          </div>

          <div
            className={
              isMobile ? "title-12 team-1 row mb-2" : "team-1 row mb-2"
            }
          >
            <span className="team-name col-3">{data?.spnnation2}</span>
            <span className="score col-4 text-end">{data?.score2}</span>
            {/* {index === 1 && ( */}
            <span
              className={
                isMobile ? "title-12 team-name col-5" : "team-name col-5"
              }
            >
              <span>{data?.spnrunrate2 && `CRR ${data?.spnrunrate2} `}</span>
              <span>{data?.spnreqrate2 && `RR ${data?.spnreqrate2}`}</span>
            </span>
            {/* )} */}
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div
            className={
              isMobile ? "title-12 text-xl-end mb-2" : "text-xl-end mb-2"
            }
          >
            <span>{data?.spnmessage}</span>
          </div>
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
                    ball != "" && (
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

const getBallClass = (ball: any) => {
  switch (ball) {
    case "0":
      return "single";
    case "1":
      return "single";
    case "2":
      return "single";
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

export default ScoreBoard;
