import React from "react";
import { Container} from "react-bootstrap";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}
// const head=["team1","1","2","3","4","5","6","Run/Over","Score"]

const SuperOverResultComponent: React.FC<Props> = ({ data }: any) => {
// console.log('first',data)

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
     <div className="mb-2" style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
      <span>{data?.result?.desc} | Winner :{data?.result?.win ==="1"? " ENG":data?.result?.win ==="0"?" TIE":" RSA"}</span>
     </div>
     {/* <div style={{width:"100%",display:"flex",flexDirection:"column"}}>
      <div className="resultTabHead"><span style={{fontSize:"16px",color:"#fff"}}>FIRST INNINGS</span></div>
      <div className="resultTeamTab">
          {head?.map((item:any,index:number)=>{
            return(
              <div style={{width:index===0?"20%":"10%",padding:"3px"}}>
              <span className="f600" key={index} >{item==="team1"?"ENG":item}</span>
              </div>
            )
          })}
      </div>
     </div>
     <div className="mt-2 mb-2" style={{width:"100%",display:"flex",flexDirection:"column"}}>
      <div className="resultTabHead"><span style={{fontSize:"16px",color:"#fff"}}>SECOND INNINGS</span></div>
      <div className="resultTeamTab">
          {head?.map((item:any,index:number)=>{
            return(
              <div style={{width:index===0?"20%":"10%",padding:"3px"}}>
              <span className="f600" key={index} >{item==="team1"?"RSA":item}</span>
              </div>
            )
          })}
      </div>
     </div> */}
    </Container>
  );
};

export default SuperOverResultComponent;
