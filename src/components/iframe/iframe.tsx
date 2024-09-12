import React from "react";
import { isMobile } from "../../utils/screenDimension";
import "./style.scss";
// interface CricketData {
//   spnnation1: string;
//   spnnation2: string;
//   score1: string;
//   score2: string;
//   spnrunrate1?: string;
//   spnrunrate2?: string;
//   spnmessage?: string;
//   balls: string[];
//   dayno: string;
// }

const Iframe = ({ data, width }: any) => {
  return (
    <>
      {!isMobile ? (
        <div className="scorecard" style={{ width: width }}>
          {/* Team Details */}
          <div className="col-12 col-md-6">
            {/* Team 1 Details */}
            <p className="team-1 row" style={{ fontSize: "12px" }}>
              <span className="team-name col-3">{data?.spnnation1}</span>
              <span className="score col-6 text-end">{data?.score1}</span>
              {data?.spnrunrate1 && (
                <span className="team-name col-3">
                  <span>CRR {data?.spnrunrate1}</span>
                </span>
              )}
            </p>

            {/* Team 2 Details */}
            <p className="team-1 row mt-2" style={{ fontSize: "12px" }}>
              <span className="team-name col-3">{data?.spnnation2}</span>
              <span className="score col-6 text-end">{data?.score2}</span>
              <span className="team-name col-3">
                {data?.spnrunrate2 && <span>CRR {data?.spnrunrate2}</span>}
              </span>
            </p>
          </div>

          {/* Match Message and Ball by Ball Status */}
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12">
                {/* Match Message */}
                {data?.spnmessage && (
                  <div className="text-xl-end" style={{ fontSize: "16px" }}>
                    {data?.dayno} | {data?.spnmessage}
                  </div>
                )}

                {/* Ball by Ball Status */}
                <div className="row">
                  <div className="col-12">
                    <p className="text-xl-end ball-by-ball mt-2 mb-0">
                      {data?.balls?.map((ball: any, index: any) => {
                        return ball == "" ? (
                          ""
                        ) : (
                          <span
                            key={index}
                            className={`ball-runs ${
                              ball === "4" || ball === "6" ? "four" : ""
                            }`}
                            style={{
                              backgroundColor:
                                ball === "ww"
                                  ? "#ff0000"
                                  : ball === "4"
                                  ? "#087f23"
                                  : ball === "6"
                                  ? "#883997"
                                  : "#08c",
                              color: "#fff",
                              borderRadius: "50%",
                              display: "inline-block",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "25px",
                              height: "25px",
                              margin: "0 5px",
                              textAlign: "center",
                              fontSize: "16px",
                            }}
                          >
                            {ball}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="m-scorecard" style={{ width: width }}>
          {/* Team Details */}
          <div className="col-12 col-md-6">
            {/* Team 1 Details */}
            <p className="m-team-1 row" style={{ fontSize: "12px" }}>
              <span className="team-name col-3">{data?.spnnation1}</span>
              <span className="score col-6 text-end">{data?.score1}</span>
              {data?.spnrunrate1 && (
                <span className="team-name col-3">
                  <span>CRR {data?.spnrunrate1}</span>
                </span>
              )}
            </p>

            {/* Team 2 Details */}
            <p className="m-team-1 row mt-2" style={{ fontSize: "12px" }}>
              <span className="team-name col-3">{data?.spnnation2}</span>
              <span className="score col-6 text-end">{data?.score2}</span>
              <span className="team-name col-3">
                {data?.spnrunrate2 && <span>CRR {data?.spnrunrate2}</span>}
              </span>
            </p>
          </div>

          {/* Match Message and Ball by Ball Status */}
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12">
                {/* Match Message */}
                {data?.spnmessage && (
                  <div
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    {data?.dayno} | {data?.spnmessage}
                  </div>
                )}

                {/* Ball by Ball Status */}
                <div className="row">
                  <div className="col-12">
                    <p className="text-xl-end ball-by-ball mt-2 mb-0">
                      {data?.balls?.map((ball: any, index: any) => (
                        <span
                          key={index}
                          className={`ball-runs ${
                            ball === "4" || ball === "6" ? "four" : ""
                          }`}
                          style={{
                            backgroundColor:
                              ball === "ww"
                                ? "#ff0000"
                                : ball === "4"
                                ? "#087f23"
                                : ball === "6"
                                ? "#883997"
                                : "#08c",
                            fontSize: "16px",
                          }}
                        >
                          {ball}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Iframe;
