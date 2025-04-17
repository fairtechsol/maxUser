import React from "react";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { isMobile } from "../../../utils/screenDimension";
import { HandleCards } from "../../commonComponent/cardsComponent";
import "../../commonStyle.scss";
interface Props {
  data: {
    C1: string;
    C2: string;
    C3: string;
    C4: string;
  };
}

const Abj1Result: React.FC<Props> = ({ data }: any) => {
  const elementsAndar = data?.aall?.split(",");
  const elementsBahar = data?.ball?.split(",");

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
          <Col xs={2} style={{ margin: "0px 0px 0px 15px" }}>
            <div
              style={{
                width: isMobile ? "70px" : "110px",
              }}
            >
              {elementsAndar?.length > 0 && (
                <span
                  style={{
                    color: "#fff",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "start",
                    marginLeft: "-12px",
                    fontWeight: "600",
                  }}
                >
                  ANDAR
                </span>
              )}

              <div className={isMobile ? "mt-1 ms-2" : "ms-2"}>
                {elementsAndar?.length > 3 ? (
                  <Slider
                    {...sliderSettings(
                      elementsAndar?.length,
                      elementsAndar?.length > 3
                    )}
                  >
                    {elementsAndar &&
                      elementsAndar?.map((item: any, index: any) => (
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
                    {elementsAndar &&
                      elementsAndar?.map((item: any, index: any) => {
                        return (
                          <React.Fragment key={index}>
                            <HandleCards card={item !== "1" ? item : ""} />
                          </React.Fragment>
                        );
                      })}
                  </Row>
                )}
              </div>
              {elementsBahar?.length > 0 && (
                <span
                  style={{
                    color: "#fff",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "start",
                    marginLeft: "-12px",
                    fontWeight: "600",
                  }}
                >
                  BAHAR
                </span>
              )}
              <div className={isMobile ? "mt-1 ms-2" : "ms-2"}>
                {elementsBahar?.length > 3 ? (
                  <Slider
                    {...sliderSettings(
                      elementsBahar?.length,
                      elementsBahar?.length > 3
                    )}
                  >
                    {elementsBahar &&
                      elementsBahar?.map((item: any, index: any) => (
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
                    {elementsBahar &&
                      elementsBahar?.map((item: any, index: any) => {
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

export default Abj1Result;
