import { Container, Row, Col } from "react-bootstrap";
import { CSSProperties } from "react";
import {isMobile} from "../../../../utils/screenDimension";
const HTFTMarketTable = () => {
  const data = [
    { label: "1/1", nestedLabel: "28", nestedValue: "8923" },
    { label: "1/1", nestedLabel: "28", nestedValue: "8923" },
    { label: "1/1", nestedLabel: "28", nestedValue: "8923" },
    { label: "1/1", nestedLabel: "28", nestedValue: "8923" },
    { label: "1/1", nestedLabel: "28", nestedValue: "8923" },
    { label: "1/1", nestedLabel: "28", nestedValue: "8923" },
    { label: "1/1", nestedLabel: "28", nestedValue: "8923" },
    { label: "1/1", nestedLabel: "28", nestedValue: "8923" },
    { label: "1/1", nestedLabel: "28", nestedValue: "8923" },
  ];

  const boxStyle = {
    display: "flex",
    // flex: "1 1 auto",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    minHeight: "44px",
    fontWeight: "500",
    minwidth: "20%",
    width: isMobile ? "100%" : "100%",
    marginLeft: "10px",
  };

  const nestedBoxStyle: CSSProperties = {
    height: isMobile ? "50px" : "45px",
    backgroundColor: "#72BBEF",
    display: "flex",
    flexDirection: isMobile ? "column" : "column",
    textAlign: "center",
    alignContent: "flex-end",
    width: isMobile ? "35%" : "80px",
    marginBottom: isMobile ? "10px" : "12px",
    lineHeight: "1.2",
  };

  const paragraphStyle: CSSProperties = {
    margin: 0,
    fontWeight: "300",
  };

  return (
    <Container className="htfttable">
      {isMobile ? (
        <>
          <Row>
            {data.map((item, index) => (
              <Col key={index} xs={6}>
                <div style={boxStyle}>
                  <div>
                    {item.label}
                    <p>0</p>
                  </div>
                  <div style={nestedBoxStyle}>
                    <div>{item.nestedLabel}</div>
                    <p style={paragraphStyle}>{item.nestedValue}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <Row>
            {data.map((item, index) => (
              <Col key={index} xs={4}>
                <div style={boxStyle}>
                  <div>
                    {item.label}
                    <p>0</p>
                  </div>
                  <div style={nestedBoxStyle}>
                    <div>{item.nestedLabel}</div>
                    <p style={paragraphStyle}>{item.nestedValue}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default HTFTMarketTable;
