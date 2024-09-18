import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import "./style.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { isMobile } from "../../../utils/screenDimension";
interface Props {
  data: {
    C1: string;
    C2: string;
    C3: string;
  };
}

const Card3Result: React.FC<Props> = ({ data }: any) => {
  return (
    data?.mid != "0" && (
      <Container>
        <Row className="m-0">
          <Col className="mt-2 p-1" style={{ backgroundColor: "rgb(0 0 0 / 8%)" }}>

              <HandleCards card={data?.C1} />
           
          </Col>

          <Col className="mt-2 p-1" style={{ backgroundColor: "rgb(0 0 0 / 8%)" }}>
         
              <HandleCards card={data?.C2} />
        
          </Col>

          <Col className="mt-2 p-1" style={{ backgroundColor: "rgb(0 0 0 / 8%)" }}>

              <HandleCards card={data?.C3} />
       
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Card3Result;
