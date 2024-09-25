import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { FaTrophy } from "react-icons/fa";
import {isMobile} from "../../../utils/screenDimension";
import "./style.scss";
import ResultBetList from "../../commonComponent/resultBetList";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const BallByBallResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  const playerA = resultCards?.filter(
    (_: any, index: number) => index % 2 === 0
  );
  const playerB = resultCards?.filter(
    (_: any, index: number) => index % 2 !== 0
  );

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="flex-row justify-content-around"
        style={{ display: "flex" ,marginBottom:"10px",marginTop:"10px"}}
      >
        {data?.result?.win && (
          <div className=" cricket20ballresult cricket20ballpopup d-sm-flex flex-row justify-content-center align-items-center">
            {/* <img src="https://versionobj.ecoassetsservice.com/v17/static/front/img/balls/cricket20/ball0.png"></img> */}

            {isMobile?<img style={{height:"50px",width:"50px"}} src="https://versionobj.ecoassetsservice.com/v17/static/front/img/balls/ball-blank.png"></img>:<img src="https://versionobj.ecoassetsservice.com/v17/static/front/img/balls/ball-blank.png"></img>}
            {isMobile?<span style={{fontSize:"12px"}}>{data?.result?.desc}</span>:<span>{data?.result?.desc}</span>}
          </div>
        )}
      </div>
      {
        data?.bets?.count > 0 && 
        <div className="w-100">
        <ResultBetList bets={data?.bets?.rows ?? 12} total={data?.bets?.count}/>
      </div>
      }
    </Container>
  );
};

export default BallByBallResultComponent;
