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
            <span className="ml-1">{teamAScore} </span>
            <span className="ml-2">{teamAOver} Over</span>
          </div>
        </div>
        <div>
          <div className="text-center">
            <b>{teamB}</b>
          </div>
          <div className="text-center">
            <span className="ml-1">{teamBScore} </span>
            <span className="ml-1">{teamBOver} Overs</span>
          </div>
        </div>
      </div>
      <div className="ball-icon">
        <img src={ballIconUrl} alt="Ball Icon" />
      </div>
      <div className="blbox">
        <div className="casino-odds-box back">
          <span className="casino-odds">{backOdds}</span>
        </div>
        <div className="casino-odds-box lay">
          <span className="casino-odds">{layOdds}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBox;
