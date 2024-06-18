import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import "./style.scss";
interface Props {
  data: {
    C1: string;
    C2: string;
    C3: string;
    C4: string;
  };
}

const Abj2Result: React.FC<Props> = ({ data }: any) => {
  const elements = data?.cards?.split(",");

  const primaryCards = elements?.slice(0, 3);
  const cards = elements?.slice(3);
  const teamA = cards?.filter((_:any,index:number) => index % 2 === 0);
  const teamB = cards?.filter((_:any,index:number) => index % 2 !== 0);


  return (
    <Container>
      <div>
        <Row>
          {primaryCards?.[0]!=="1" &&  <Col xs={1} style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#fff",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "end",
              }}
            >
              A
            </span>
            <span
              style={{
                color: "#fff",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
              }}
            >
              B
            </span>
          </Col>}
          
          <Col
            xs={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <HandleCards card={primaryCards?.[0]!=="1"?primaryCards?.[0]:""} />
            </div>
          </Col>
          <Col xs={2} style={{ margin: "10px" }}>
            <div>
              <HandleCards card={primaryCards?.[0]!=="1"?primaryCards?.[2]:""} />
            </div>
            <div style={{ marginTop: "10px" }}>
              <HandleCards card={primaryCards?.[0]!=="1"?primaryCards?.[1]:""} />
            </div>
          </Col>
          <Col style={{ marginTop: "10px" }}>
            <Row style={{ gap: "10px" }}>
              {teamB && teamB?.map((item:any)=>{
                return(
                  <><HandleCards card={item!=="1"?item:""} /></>
                )
              })}
            </Row>
            <Row style={{ gap: "10px", marginTop: "10px" }}>
            {teamA && teamA?.map((item:any)=>{
                return(
                  <><HandleCards card={item!=="1"?item:""} /></>
                )
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Abj2Result;
