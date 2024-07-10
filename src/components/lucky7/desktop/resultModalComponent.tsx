import React from "react";
import { Container} from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Lucky7ResultComponent: React.FC<Props> = ({ data }: any) => {

const resultCards = data?.result?.desc?.split('||')
const pair = resultCards?.[0]?.split(' ')
const card = resultCards?.[3]?.split(' ')

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
          className={isMobile ? 'w-100 d-sm-flex flex-sm-column justify-content-center align-items-center p-4 mb-2' : "w-50 d-sm-flex flex-sm-column justify-content-center align-items-center p-4 mb-2"}
          style={{ boxShadow: "0 0 4px -1px" }}
        >
          <div className="d-sm-flex flex-sm-row">
            <span className="lucky7CommonText">Winner</span>
            <span className="lucky7CommonText-2">{pair?.[0]}</span>
          </div>
          <div className="d-sm-flex flex-sm-row">
            <span className="lucky7CommonText">Odd/Even</span>
            <span className="lucky7CommonText-2">{resultCards?.[2]}</span>
          </div>
          <div className="d-sm-flex flex-sm-row">
            <span className="lucky7CommonText">Color</span>
            <span className="lucky7CommonText-2">{resultCards?.[1]}</span>
          </div>
          <div className="d-sm-flex flex-sm-row">
            <span className="lucky7CommonText">Card</span>
            <span className="lucky7CommonText-2">{card?.[2]}</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Lucky7ResultComponent;
