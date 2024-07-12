import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { FaTrophy } from "react-icons/fa";
import isMobile from "../../../utils/screenDimension";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Poker6ResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  const lastCards = resultCards?.slice(12,17)
 console.log(data,'first',resultCards)
  return (
    <Container style={{ display: "flex", flexDirection: "column",justifyContent:"center",alignItems:"center" }}>
       <div style={{width:"80%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"5px",marginBottom:"10px"}}>
        <span className="title-18 f500">Board</span>
        <div style={{width:"100%",display:"flex",flexDirection:"row",gap:"5px",justifyContent:"center",alignItems:"center"}} >
        {
          lastCards?.map((item:any,index:number)=>{
            return(
              <div key={index}>
                <HandleCards card={item} />
              </div>
            )
          })
        }
        </div>
        
      </div>
      <div style={{width:"80%",display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        {data?.result?.win === "11" && (
              <div className="casino-winner-icon mt-3 p-2" >
                <FaTrophy size={isMobile ? 20 : 40} color="#169733" />
              </div>
            )}
          <div style={{display:"flex",flexDirection:"column"}}>
          <span className="title-18 f500">Player 1</span>
          <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
            <HandleCards card={resultCards?.[0]} />
            <HandleCards card={resultCards?.[6]} />
          </div>
          </div>
          
        </div>
        
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"column"}}>
          <span className="title-18 f500">Player 6</span>
          <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
            <HandleCards card={resultCards?.[5]} />
            <HandleCards card={resultCards?.[11]} />
          </div>
          </div>
          {data?.result?.win === "16" && (
              <div className="casino-winner-icon mt-3 p-2" >
                <FaTrophy size={isMobile ? 20 : 40} color="#169733" />
              </div>
            )}
        </div>
      </div>
      <div style={{width:"80%",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        {data?.result?.win === "12" && (
              <div className="casino-winner-icon mt-3 p-2" >
                <FaTrophy size={isMobile ? 20 : 40} color="#169733" />
              </div>
            )}
          <div style={{display:"flex",flexDirection:"column"}}>
          <span className="title-18 f500">Player 2</span>
          <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
            <HandleCards card={resultCards?.[1]} />
            <HandleCards card={resultCards?.[7]} />
          </div>
          </div>
          
        </div>
        {data?.result?.win === "0" && ( <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <span className="title-18 f500">Tie</span>
        </div>)}
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"column"}}>
          <span className="title-18 f500">Player 5</span>
          <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
            <HandleCards card={resultCards?.[4]} />
            <HandleCards card={resultCards?.[10]} />
          </div>
          </div>
          {data?.result?.win === "15" && (
              <div className="casino-winner-icon mt-3 p-2" >
                <FaTrophy size={isMobile ? 20 : 40} color="#169733" />
              </div>
            )}
        </div>
      </div>
      <div style={{width:"80%",display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center",marginBottom:"10px"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        {data?.result?.win === "13" && (
              <div className="casino-winner-icon mt-3 p-2" >
                <FaTrophy size={isMobile ? 20 : 40} color="#169733" />
              </div>
            )}
          <div style={{display:"flex",flexDirection:"column"}}>
          <span className="title-18 f500">Player 3</span>
          <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
            <HandleCards card={resultCards?.[2]} />
            <HandleCards card={resultCards?.[8]} />
          </div>
          </div>
          
        </div>
        
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"column"}}>
          <span className="title-18 f500">Player 4</span>
          <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
            <HandleCards card={resultCards?.[3]} />
            <HandleCards card={resultCards?.[9]} />
          </div>
          </div>
          {data?.result?.win === "14" && (
              <div className="casino-winner-icon mt-3 p-2" >
                <FaTrophy size={isMobile ? 20 : 40} color="#169733" />
              </div>
            )}
        </div>
      </div>
    </Container>
  );
};

export default Poker6ResultComponent;
