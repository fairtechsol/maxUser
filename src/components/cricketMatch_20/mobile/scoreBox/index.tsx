import React from "react";
import "./style.scss";
import bg from "../../../../assets/images/cricketMatch_20-20/score-bg.png";
const ScoreBox = ({
  teamA,
  teamAScore,
  teamAOver,
  teamB,
  teamBScore,
  teamBOver,
  ballIconUrl,
  backOdds,
  layOdds,
  handleBet,
  item
}) => {


  return (
    <div
      className="score-box cricket20"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "fit",
        backgroundPosition: "center",
       
        color: "white", // Example text color
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="team-score">
        <div>
          <div className="text-center">
            <b>{teamA}</b>
          </div>
          <div className="text-center">
            <span className="ml-1" style={{fontSize:"12px"}}>{teamAScore} </span>
            <span className="ml-2" style={{fontSize:"12px"}}>{teamAOver} Over</span>
          </div>
        </div>
        <div>
          <div className="text-center">
            <b>{teamB}</b>
          </div>
          <div className="text-center">
            <span className="ml-1" style={{fontSize:"12px"}}>{teamBScore} </span>
            <span className="ml-1" style={{fontSize:"12px"}}>{teamBOver} Overs</span>
          </div>
        </div>
      </div>
      <div className="ball-icon">
        <img src={ballIconUrl} alt="Ball Icon" style={{height:"60px"}}/>
      </div>
      <div className="blbox">
        <div className={item?.gstatus ==="SUSPENDED"? "suspended casino-odds-box back":"casino-odds-box back "} onClick={()=>handleBet(item,"BACK")}>
          <span className="casino-odds">{backOdds}</span>
        </div>
        <div className={item?.gstatus ==="SUSPENDED"? "suspended casino-odds-box lay":"casino-odds-box lay "} onClick={()=>handleBet(item,"LAY")}>
          <span className="casino-odds">{layOdds}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBox;
