import CommonButtonBox from "../CommonButtonBox";

const SBetBox = ({ type }: any) => {

  return (
    <div className="sBoxContainer">
      <div className="sBoxMainlucky">
      <div style={{width:"5%",paddingBottom:"20px",textAlign:"end"}}><span style={{textAlign:"center",fontSize:"16px",width:"100%",fontWeight:"bold"}}>{type}</span></div>
        <div className="column-flex justify-space-a align-center" style={{width:"20%"}}>
        <CommonButtonBox
        name={"SA1"}
          value1={10.0}
          background={"transparent"}
          width={"20%"}
          text={"#000"}
        />
         <span style={{fontSize:"14px"}}>0</span>
        </div>
        <div className="column-flex justify-space-a align-center" style={{width:"25%"}}>
        <CommonButtonBox
        name={"1st Bet"}
          value1={10.0}
          background={"#086cb8"}
          width={"25%"}
          text={"#fff"}
        />
         <span style={{fontSize:"14px"}}>1</span>
         </div>

         <div className="column-flex justify-space-a align-center" style={{width:"25%"}}>
        <CommonButtonBox
        name={"2nd Bet"}
          value1={10.0}
          background={"#086cb8"}
          width={"25%"}
          text={"#fff"}
        />
         <span style={{fontSize:"14px"}}>2</span>
         </div>
         <div style={{width:"5%",paddingBottom:"20px"}}><span style={{textAlign:"center",fontSize:"16px",width:"100%",fontWeight:"bold"}}>{type}</span></div>
         
      </div>
    </div>
  );
};

export default SBetBox;
