import React from "react";
import {Container, Row } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import isMobile from "../../../utils/screenDimension";
import { leftArrow, rightArrow } from "../../../assets/images";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const AbjResultComponent: React.FC<Props> = ({ data }: any) => {
  const elements = data?.result?.cards?.split(",");
  const primaryCards = elements?.slice(0, 3);
  const cards = elements?.slice(3);
  const teamA = cards?.filter(
    (item: any, index: number) => index % 2 === 0 && item !== "1"
  );
  const teamB = cards?.filter(
    (item: any, index: number) => index % 2 !== 0 && item !== "1"
  );
  const minLength = isMobile ? 3 : 10;
  
  // console.log('first',data)
  function SampleNextArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
      className={className}
      style={{ ...style, display: 'block', cursor: 'pointer' ,position: "absolute" }}
      onClick={onClick}
    >
      <img src={rightArrow} alt="Next" />
    </div>
    );
  }
  
  function SamplePrevArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
      className={className}
      style={{ ...style, display: 'block', cursor: 'pointer', position: "absolute"  }}
      onClick={onClick}
    >
      <img src={leftArrow} alt="Previous" />

    </div>
    );
  }
  
  const sliderSettings = (length: any, arrow: any) => ({
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: length > 3 ? length - 3 : 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  });
  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="abjresultModal mb-2">
        <div className="abjresultCardContainer">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#00000",
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
                color: "#00000",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
              }}
            >
              B
            </span>
          </div>
          <div
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
          </div>
          <div>
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
          </div>
        </div>
        <div className="abjresultCardContainer2">
        <div
              style={{
                width: isMobile ? "70px" : "110px",
                margin: "0px 10px 20px 10px",
              }}
            >
              <div>
                {teamB?.length > minLength ? (
                  <Slider {...sliderSettings(teamB.length, teamB.length > minLength)}>
                  {teamB.map((item:any, index:any) => (
                    <span key={index}>
                      <HandleCards card={item} />
                    </span>
                  ))}
                </Slider>
              ) : (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {teamB.map((item:any, index:any) => (
                    <HandleCards key={index} card={item} />
                  ))}
                </div>
                )}
              </div>
              <div className="">
              {teamA?.length > minLength ? (
                      <Slider {...sliderSettings(teamA.length, teamA.length > minLength)}>
                      {teamA.map((item:any, index:any) => (
                        <span key={index}>
                          <HandleCards card={item} />
                        </span>
                      ))}
                    </Slider>
                  ) : (
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {teamA.map((item:any, index:any) => (
                        <HandleCards key={index} card={item} />
                      ))}
                    </div>
                )}
              </div>
            </div>
        </div>
      </div>
    </Container>
  );
};

export default AbjResultComponent;
