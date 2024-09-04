import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import {isMobile} from "../../../utils/screenDimension";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const BollywoodTableResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.desc?.split("|");
  const pair = resultCards?.[0];
  //const card = resultCards?.[3]?.split(" ");

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="lucky7resultModal">
        <div className="lucky7resultCardContainer">
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={data?.result?.cards} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 d-sm-flex justify-content-center align-items-center mt-2">
        <div
          className={
            isMobile
              ? "w-100 d-sm-flex flex-sm-column justify-content-center align-items-center p-4 mb-2"
              : "w-80 d-sm-flex flex-sm-column justify-content-center align-items-center p-4 mb-2"
          }
        >
          <div className="d-sm-flex d-flex flex-row flex-sm-row justify-content-center align-items-center">
            <div className="lucky7CommonText- d-sm-flex flex-sm-row opacity-50 ">
              Winner:
            </div>
            <div className="d-sm-flex flex-sm-row p-1">
              <span className="lucky7CommonText-">{pair}</span>
            </div>
          </div>

          <div className="d-sm-flex d-flex flex-col flex-md-column justify-content-center align-items-center">
            <div className="d-sm-flex flex-sm-row border-star border-2 border-primary  ">
              <span className="opacity-50">Odd</span>{" "}
              <span className="lucky7CommonText-2">
                {resultCards?.[1] == " Odd " ? "Yes" : "No"}
              </span>
            </div>
            <div
              className="d-sm-flex flex-sm-row border-star border-2 border-primary "
              style={{ marginRight: "7px" }}
            >
              <span className="opacity-50">Dulha Dulhan/Barati</span>{" "}
              <span className="lucky7CommonText-2">{resultCards?.[3]}</span>
            </div>

            <div className="d-sm-flex flex-sm-row border-star border- border-primary mr-2 ">
              <span className="lucky7CommonText-2 mr-2">
                <span style={{ opacity: "0.5" }}>Color</span> {resultCards?.[2]}
              </span>
            </div>

            <div
              className="d-sm-flex flex-sm-row border-star border-2 border-primary "
              style={{ marginRight: "5px" }}
            >
              <span className="opacity-50">Card</span>{" "}
              <span className="lucky7CommonText-2">{resultCards?.[4]?.[6]}</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BollywoodTableResultComponent;
