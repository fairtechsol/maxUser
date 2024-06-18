import React from "react";

interface ResultComponentProps {
  data: any;
}

export const ResultComponent: React.FC<ResultComponentProps> = ({data}:any) => {

 
  console.log('resultData',data)
  return (
    <div
      style={{
        borderRadius: "2px",
        // border: "1px solid yellow",
        // lineHeight: isMobile ?  "2" :"0.8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // padding: isMobile ?  "0px" :"8px",
        background: "white",
        backgroundSize: "100% 100%",
      }}
    >
      sdaswdasdasd
    </div>
  );
};






