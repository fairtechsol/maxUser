import OddButtonBox from "../OddButtonBox";

const OddEven = ({ card }: any) => {
 
  return (
    <>
      <div className="oddEvenContainer">
        {card ? <> <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
          <OddButtonBox
            value1={10.0}
            value2={"ODD"}
            profitLoss={15}
            width={"40%"}
          />
          <OddButtonBox
            value1={40.0}
            value2={"EVEN"}
            profitLoss={15}
            width={"40%"}
          />
        </div>
       </>:<><div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
       <OddButtonBox
            value1={10.0}
            value2={"icon1"}
            profitLoss={15}
            width={"20%"}
          />
          <OddButtonBox
            value1={40.0}
            value2={"icon2"}
            profitLoss={15}
            width={"20%"}
          />
           <OddButtonBox
            value1={10.0}
            value2={"icon3"}
            profitLoss={15}
            width={"20%"}
          />
          <OddButtonBox
            value1={40.0}
            value2={"icon4"}
            profitLoss={15}
            width={"20%"}
          />
        </div>
       </>}
       
      
      </div>
    </>
  );
};

export default OddEven;
