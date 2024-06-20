import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import "./style.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import isMobile from "../../../utils/screenDimension";
interface Props {
  data: {
    C1: string;
    C2: string;
    C3: string;
    C4: string;
  };
}

// Custom arrow components if needed
const SampleNextArrow = (props:any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'red' }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props:any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  );
};
const Abj2Result: React.FC<Props> = ({ data }: any) => {
  const elements = data?.cards?.split(",");
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const primaryCards = elements?.slice(0, 3);
  const cards = elements?.slice(3);
  const teamA = cards?.filter((_: any, index: number) => index % 2 === 0);
  const teamB = cards?.filter((_: any, index: number) => index % 2 !== 0);
  // console.log(data , "dws")
  const sliderSettings = (length:any) => ({

    infinite: length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: length > 3,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: length > 3
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: length > 3,
        },
      },
    ],
  });

  return  data?.mid !="0" && ( 
 

      <div 
      style={{
        width: isMobile ? "104px" : "160px",
       marginLeft: isMobile ? "5px" :"10px",
       position: "absolute",
       top: "0",
       left: "0",
       background: "rgba(0, 0, 0, 0.4)",
       height: "auto",
       padding: "5px"
       }}>
        <Row>
          {primaryCards?.[0] !== "1" && (
            <Col xs={1} style={{ display: "flex", flexDirection: "column" }}>
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
            </Col>
          )}

          <Col
            xs={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <HandleCards
                card={primaryCards?.[0] !== "1" ? primaryCards?.[0] : ""}
              />
            </div>
          </Col>
          <Col xs={2} >
            <div>
              <HandleCards
                card={primaryCards?.[0] !== "1" ? primaryCards?.[2] : ""}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <HandleCards
                card={primaryCards?.[0] !== "1" ? primaryCards?.[1] : ""}
              />
            </div>
          </Col>

         <Col xs={2} style={{ margin: "10px 0px 0px 20px" }}>
            <div
              style={{ width: isMobile ? "70px" :"110px", margin: "0px 10px 0px 10px" }}
            >
              <div>
                {" "}
                <Slider {...sliderSettings(teamB?.length)}>
                  {teamB &&
                    teamB.map((item: any, index: any) => (
                      <div key={index}>
                        <HandleCards card={item !== "1" ? item : ""} />
                      </div>
                    ))}
                </Slider>
              </div>
              <div className="mt-2">
                <Slider {...sliderSettings(teamA?.length)}>
                  {teamA &&
                    teamA.map((item: any, index: any) => (
                      <div key={index}>
                        <HandleCards card={item !== "1" ? item : ""} />
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
          </Col>
        </Row>
      </div>

  );
};

export default Abj2Result;
