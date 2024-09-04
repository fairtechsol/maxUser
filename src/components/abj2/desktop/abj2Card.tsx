import React from "react";
import { Row, Col } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import "./style.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {isMobile} from "../../../utils/screenDimension";
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
  const teamA = cards?.filter(
    (item: any, index: number) => index % 2 === 0 && item !== "1"
  );
  const teamB = cards?.filter(
    (item: any, index: number) => index % 2 !== 0 && item !== "1"
  );

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
    data?.mid != "0" && (
      <div
        style={{
          width: "max-content",
          marginLeft: isMobile ? "8px" : "10px",
          position: "absolute",
          top: "0",
          left: "0",
          background: "rgba(0, 0, 0, 0.4)",
          height: "auto",
          padding: isMobile ? "0px" : "5px",
        }}
      >
        <Row>
          {primaryCards?.[0] !== "1" && (
            <Col
              xs={1}
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
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
              //  marginTop: "20px"
            }}
          >
            <div>
              <HandleCards
                card={primaryCards?.[0] !== "1" ? primaryCards?.[0] : ""}
              />
            </div>
          </Col>
          <Col xs={2} style={isMobile ? { marginTop: "10px" } : {}}>
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

          <Col xs={2} style={{ margin: "0px 0px 0px 10px" }}>
            <div
              style={{
                width: isMobile ? "70px" : "110px",
                // margin: "0px 10px 0px 10px",
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
                  <Row
                    style={{
                      gap: "10px",
                      marginTop: isMobile ? "10px" : "0px",
                    }}
                  >
                    {teamB &&
                      teamB?.map((item: any, index: any) => {
                        return (
                          <React.Fragment key={index}>
                            <HandleCards card={item !== "1" ? item : ""} />
                          </React.Fragment>
                        );
                      })}
                  </Row>
                )}
              </div>
              <div className={isMobile ? "mt-1" : "mt-2"}>
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
                  <Row
                    style={{
                      gap: "10px",
                      marginTop: isMobile ? "10px" : "5px",
                    }}
                  >
                    {teamA &&
                      teamA?.map((item: any, index: any) => {
                        return (
                          <React.Fragment key={index}>
                            <HandleCards card={item !== "1" ? item : ""} />
                          </React.Fragment>
                        );
                      })}
                  </Row>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
};

export default Abj2Result;
