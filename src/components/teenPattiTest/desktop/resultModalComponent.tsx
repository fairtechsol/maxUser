import React from "react";
import { Container } from "react-bootstrap";
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

const TeenTestResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");

  const Tiger = resultCards?.filter((_: any, index: number) => index % 3 === 0);
  const Lion = resultCards?.filter((_: any, index: number) => index % 3 === 1);

  const Dragon = resultCards?.filter(
    (_: any, index: number) => index % 3 === 2
  );

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="flex-row justify-content-around"
        style={{ display: "flex" }}
      >
        <div className="teen20resultCardContainer mb-3">
          <span className="fs-5">Dragon</span>
          <div
            className={
              isMobile
                ? "row-flex-mobile"
                : "d-sm-flex flex-row justify-content-center align-items-center mb-2"
            }
          >
            {data?.result?.win === "11" && (
              <div className="casino-winner-icon">
                <FaTrophy size={30} color="#169733" />
              </div>
            )}
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={Tiger?.[0]} />
            </div>
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={Tiger?.[1]} />
            </div>
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={Tiger?.[2]} />
            </div>
          </div>
        </div>
        {/* {data?.result?.win === "0" && (
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
            <span className="fs-5">TIE</span>
          </div>
        )} */}
        <div className="teen20resultCardContainer mb-3 border-start border-2 border-primar">
          <span className="fs-5">Tiger</span>
          <div
            className={
              isMobile
                ? "row-flex-mobile"
                : "d-sm-flex flex-row justify-content-center align-items-center mb-2"
            }
          >
            {data?.result?.win === "21" && (
              <div className="casino-winner-icon">
                <FaTrophy size={30} color="#169733" />
              </div>
            )}
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={Lion?.[0]} />
            </div>
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={Lion?.[1]} />
            </div>
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={Lion?.[2]} />
            </div>
          </div>
        </div>

        <div className="teen20resultCardContainer mb-3 border-start border-2 border-primar">
          <span className="fs-5">Lion</span>
          <div
            className={
              isMobile
                ? "row-flex-mobile"
                : "d-sm-flex flex-row justify-content-center align-items-center mb-2"
            }
          >
            {data?.result?.win === "31" && (
              <div className="casino-winner-icon">
                <FaTrophy size={30} color="#169733" />
              </div>
            )}
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={Dragon?.[0]} />
            </div>
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={Dragon?.[1]} />
            </div>
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={Dragon?.[2]} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TeenTestResultComponent;
