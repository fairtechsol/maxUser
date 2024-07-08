import React from "react";
import { Container, Row } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import isMobile from "../../../utils/screenDimension";
import { FaTrophy } from "react-icons/fa";
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

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          cursor: "pointer",
          backgroundColor: "#9e9ba1",
          borderRadius: "10px",
        }}
        onClick={onClick}
      >
        {/* <img src={rightArrow} alt="Next" /> */}
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          cursor: "pointer",
          backgroundColor: "#9e9ba1",
          borderRadius: "10px",
        }}
        onClick={onClick}
      >
        {/* <img src={leftArrow} alt="Previous" /> */}
      </div>
    );
  }

  const sliderSettings = (length: any, arrow: any) => ({
    infinite: false,
    // arrows: false,
    speed: 500,
    slidesToShow: isMobile ? 3 : 10,
    slidesToScroll: 3,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // initialSlide: isMobile ? (length > 3 ? length - 3 : 0) : 3,

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
          {/* <div style={{ display: "flex", flexDirection: "column",marginLeft:isMobile?0:"20px" }}>
            <div>
              {data?.result?.win === "1" && (
                <div className="casino-winner-icon">
                  <FaTrophy size={isMobile ? 20 : 30} color="#169733" />
                </div>
              )}
            </div>
            <div>
              {data?.result?.win === "2" && (
                <div className="casino-winner-icon">
                  <FaTrophy size={isMobile ? 20 : 30} color="#169733" />
                </div>
              )}
            </div>
          </div> */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{display:"flex",flexDirection:"row"}}>
              <div style={{width:"70%",marginRight:"5px"}}>
                {data?.result?.win === "1" && (
                  <div className="casino-winner-icon">
                    <FaTrophy size={isMobile ? 18 : 26} color="#169733" />
                  </div>
                )}
              </div>
              <div  style={{width:"30%"}}>
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
              </div>
            </div>
            <div  style={{display:"flex",flexDirection:"row"}}>
              <div style={{width:"70%",marginRight:"5px"}}>
                {data?.result?.win === "2" && (
                  <div className="casino-winner-icon">
                    <FaTrophy size={isMobile ? 18 : 26} color="#169733" />
                  </div>
                )}
              </div>
              <div style={{width:"30%"}}>
                {" "}
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
            </div>
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
              width: isMobile ? "70px" : "85%",
              margin: "8px 9px 10px 11px",
            }}
          >
            <div>
              {teamB?.length > minLength ? (
                <Slider
                  {...sliderSettings(teamB.length, teamB.length > minLength)}
                >
                  {teamB?.map((item: any, index: any) => (
                    <div key={index}>
                      <HandleCards card={item} />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {teamB?.map((item: any, index: any) => (
                    <HandleCards key={index} card={item} />
                  ))}
                </div>
              )}
            </div>
            <div className="">
              {teamA?.length > minLength ? (
                <Slider
                  {...sliderSettings(teamA.length, teamA.length > minLength)}
                >
                  {teamA?.map((item: any, index: any) => (
                    <div key={index}>
                      <HandleCards card={item} />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {teamA?.map((item: any, index: any) => (
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
