import React from "react";
import { Container, Row } from "react-bootstrap";
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

const Abj1ResultComponent: React.FC<Props> = ({ data }: any) => {
  const result = data?.result?.cards?.split('*')
  const elementsAndar = result?.[0]?.split(",");
  const elementsBahar = result?.[1]?.split(",");

  const minLength = isMobile ? 5 : 15;

  console.log('first',elementsBahar)
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
    slidesToShow: isMobile ? 5 : 15,
    slidesToScroll: 5,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // initialSlide: isMobile ? (length > 3 ? length - 3 : 0) : 3,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  });
  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="abjresultModal mb-2">
        <div className="w-100 abjresultCardContainer2">
          <div
            style={{
              width: isMobile ? "90%" : "90%",
              margin: "8px 9px 10px 11px",
            }}
          >
            <div style={{width:"100%",textAlign:"center"}}>ANDAR</div>
            <div>
              {elementsAndar?.length > minLength ? (
                <Slider
                  {...sliderSettings(elementsAndar.length, elementsAndar.length > minLength)}
                >
                  {elementsAndar?.map((item: any, index: any) => (
                    <div key={index}>
                      <HandleCards card={item} />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" ,justifyContent:"space-around",alignItems:"center"}}>
                  {elementsAndar?.map((item: any, index: any) => (
                    <HandleCards key={index} card={item} />
                  ))}
                </div>
              )}
            </div>
            <div style={{width:"100%",textAlign:"center"}}>BAHAR</div>
            <div>
              {elementsBahar?.length > minLength ? (
                <Slider
                  {...sliderSettings(elementsBahar.length, elementsBahar.length > minLength)}
                >
                  {elementsBahar?.map((item: any, index: any) => {
                    return item!='' && (
                      <div key={index}>
                      <HandleCards card={item} />
                    </div>
                    )
                  }
                  
                  )}
                </Slider>
              ) : (
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" ,justifyContent:"space-around",alignItems:"center"}}>
                  {elementsBahar?.map((item: any, index: any) => (
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

export default Abj1ResultComponent;
