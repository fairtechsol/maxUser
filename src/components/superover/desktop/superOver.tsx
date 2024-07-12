import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { s1 ,s2,s3,s4,s6,s0,ballW} from "../../../assets/images";
import isMobile from "../../../utils/screenDimension";

interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const SuperoverResult: React.FC<Props> = ({ data }:any) => {
  // console.log('first',data)
  const handleBall=(img:any)=>{
    if(img?.includes("A")){
      return s1
    }else if(img?.includes("2")){
      return s2
    }else if(img?.includes("3")){
      return s3
    } else if(img?.includes("4")){
      return s4
    } else if(img?.includes("6")){
      return s6
    } else if(img?.includes("10")){
      return s0
    }else if(img?.includes("K")){
      return ballW
    }   
  }
  return data?.mid !="0" && (  
    <Container>
      <Row>
        <Col className="mt-2">
          <div style={{ display: "flex",flexDirection:"column", gap: "10px", width: isMobile ? "22px" : "32px" }}>
           {data?.C1!="1" ?<img src={handleBall(data?.C1)} />:null}
           {data?.C2!="1" ? <img src={handleBall(data?.C2)} /> :null}
           {data?.C3!="1" ? <img src={handleBall(data?.C3)} /> :null}
           {data?.C4!="1" ? <img src={handleBall(data?.C4)} /> :null}
           {data?.C5!="1" ? <img src={handleBall(data?.C5)} /> :null}
           {data?.C6!="1" ? <img src={handleBall(data?.C6)} /> :null}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SuperoverResult;
