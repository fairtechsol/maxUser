import React from "react";
import { Container} from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { FaTrophy } from "react-icons/fa";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const DragonTigerLionResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(',')
  
  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="dt20resultModal mb-3">
        <div className="dt20resultCardContainer">
          <span className="fs-5">Dragon</span>
          <div className={isMobile ? 'row-flex-mobile' : 'd-sm-flex flex-row justify-content-center align-items-center'} >
            {data?.result?.win === "1" && (
              <div className="casino-winner-icon">
                <FaTrophy size={isMobile ? 20 : 30} color="#169733" />
              </div>
            )}
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={resultCards?.[0]} />
            </div>
          </div>
        </div>
        <div className="dt20resultCardContainer">
          <span className="fs-5">Tiger</span>
          <div className={isMobile ? 'row-flex-mobile' : 'd-sm-flex flex-row justify-content-center align-items-center'} >
              {data?.result?.win === "21" && (
            <div className="casino-winner-icon">
              <FaTrophy size={isMobile ? 20 : 30} color="#169733" />
            </div>
              )}
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={resultCards?.[1]} />
            </div>
          </div>
        </div>
        <div className="dt20resultCardContainer">
          <span className="fs-5">Lion</span>
          <div className={isMobile ? 'row-flex-mobile' : 'd-sm-flex flex-row justify-content-center align-items-center'} >
              {data?.result?.win === "41" && (
            <div className="casino-winner-icon">
              <FaTrophy size={isMobile ? 20 : 30} color="#169733" />
            </div>
              )}
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={resultCards?.[2]} />
            </div>
          </div>
        </div>
      </div>
     
    </Container>
  );
};

export default DragonTigerLionResultComponent;
