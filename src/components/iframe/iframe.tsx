import React from "react";
import "./style.scss";
interface CricketData {
  spnnation1: string;
  spnnation2: string;
  score1: string;
  score2: string;
  spnrunrate1?: string;
  spnrunrate2?: string;
  spnmessage?: string;
  balls: string[];
  dayno: string;
}

const Iframe = ({ data }: { data: CricketData }) => {
  return (
    <div
      className="iframe"
      style={{ paddingLeft: "10px", backgroundColor: "#f4f4f4" }}
    >
      {/* Day Information */}
      {/* <div className="row">
        <div className="col-12" style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '18px' }}>
          Day {data?.dayno}
        </div>
      </div> */}

      <div
        style={{
          width: "65%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
        }}
      >
        {/* Team 1 Details */}
        <div>
          <p className=" row" style={{ fontSize: "12px" }}>
            <span
              className="team-name col-3"
              style={{ fontWeight: "semibold" }}
            >
              {data?.spnnation1}
            </span>
            <span className="score col-6 text-end">{data?.score1}</span>
            {data?.spnrunrate1 && (
              <span
                className="col-3"
                style={{ fontStyle: "italic",  }}
              >
                (CRR {data?.spnrunrate1})
              </span>
            )}
          </p>
        </div>

        {/* Team 2 Details */}
        <div>
          <p className=" row" style={{ fontSize: "12px" }}>
            <span className=" col-3" style={{ fontWeight: "semibold" }}>
              {data?.spnnation2}
            </span>
            <span className="score col-6 text-end">{data?.score2}</span>
           
            {data?.spnrunrate2 && (
              <span
                className="col-3"
                style={{ fontStyle: "italic",  }}
              >
                (CRR {data?.spnrunrate2})
              </span>
            )}
          </p>
        </div>
      </div>

      <div style={{ width: "35%",}}>
        {/* Match Message */}
        <div >
          {data?.spnmessage && <div
            
            style={{ marginBottom: "10px",textAlign:"end",marginRight:"5px" }}
          >
            {data?.dayno}|{data?.spnmessage}
          </div>}
        </div>

        {/* Ball by Ball Status */}
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-center mb-3">
              {data?.balls.map((ball, index) => (
                <div
                  key={index}
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: ball === "ww" || ball === "wd" || ball === "Nb" ? "#ff0000" :ball === "4" || ball === "6"?"#087f23" :"#08c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    margin: "0 5px",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {ball}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iframe;
