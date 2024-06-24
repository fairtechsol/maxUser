import React from "react";
import {Container, Row } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import isMobile from "../../../utils/screenDimension";
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
  
  // console.log('first',data)
  const sliderSettings = (length: any, arrow: any) => ({
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: arrow,
    initialSlide: length - 1,
    rtl: true,

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
                margin: "0px 10px 0px 10px",
              }}
            >
              <div>
                {teamB?.length > 3 ? (
                  <Slider {...sliderSettings(teamB?.length, teamB?.length > 3)}>
                    {teamB &&
                      teamB?.map((item: any, index: any) => (
                        <div key={index}>
                          <HandleCards card={item !== "1" ? item : ""} />
                        </div>
                      ))}
                  </Slider>
                ) : (
                  <Row style={{ gap: "10px" }}>
                    {teamB &&
                      teamB?.map((item: any) => {
                        return (
                          <>
                            <HandleCards card={item !== "1" ? item : ""} />
                          </>
                        );
                      })}
                  </Row>
                )}
              </div>
              <div className="mt-2">
              {teamA?.length > 3 ? (
                  <Slider {...sliderSettings(teamA?.length, teamA?.length > 3)}>
                    {teamA &&
                      teamA?.map((item: any, index: any) => (
                        <div key={index}>
                          <HandleCards card={item !== "1" ? item : ""} />
                        </div>
                      ))}
                  </Slider>
                ) : (
                  <Row style={{ gap: "10px" }}>
                    {teamA &&
                      teamA?.map((item: any) => {
                        return (
                          <>
                            <HandleCards card={item !== "1" ? item : ""} />
                          </>
                        );
                      })}
                  </Row>
                )}
              </div>
            </div>
        </div>
      </div>
    </Container>
  );
};

export default AbjResultComponent;
