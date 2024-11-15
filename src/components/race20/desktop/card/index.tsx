import React, { useEffect, useState } from "react";
import {isMobile} from "../../../../utils/screenDimension";
import { back, club, diamond, heart, spade } from "../../../../assets/images";

interface PlayingCardProps {
  number: string;
  type: string;
  lock?: boolean;
}

export const PlayingCard: React.FC<PlayingCardProps> = ({ number, type, lock }) => {
  return (
    <div
      style={{
        borderRadius: "2px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize:"100%",
        WebkitBackgroundSize:"cover",
        background: "white",
        height:"40px",
        width: isMobile ? "32px" : "36px",
        padding: "0px",
        zIndex:"999",
        border:"1px solid yellow",
      }}
    >
      {!lock ? (
        <>
          <span
            style={{
              color: type === "heart" || type === "diamond" ? "red" : "black",
              fontWeight: "600",
              lineHeight: isMobile ? "1" : "0.8",
              fontSize: isMobile ? "20px" : "20px",
            }}
          >
            {number}
          </span>
          <Icons type={type} />
        </>
      ):<>
      <img src={back} width={ isMobile ? 12 : 25} height={ isMobile ? 16 : 30} /></>}
    </div>
  );
};

interface IconsProps {
  type: string;
}

export const Icons: React.FC<IconsProps> = ({ type }) => {
  const renderImage = (src: string) => {
    return <img width={"15"} alt={type} src={src} />;
  };

  switch (type) {
    case "heart":
      return renderImage(heart);
    case "spade":
      return renderImage(spade);
    case "diamond":
      return renderImage(diamond);
    case "club":
      return renderImage(club);
    default:
      return null;
  }
};

interface HandleCardsProps {
  card: string;
}

export const HandleRaceCards: React.FC<HandleCardsProps> = ({ card }) => {
  
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    setNumber(card?.substring(0, card.length - 2) || "");
    setType(card?.substring(card.length - 2, card.length) || "");
  }, [card]);

  if (card === "1") {
    return <PlayingCard number="0" type="" lock={true} />;
  }
  switch (type) {
    case "DD":
      return <PlayingCard number={number} type="heart" />;
    case "CC":
      return <PlayingCard number={number} type="club" />;
    case "HH":
      return <PlayingCard number={number} type="spade" />;
    case "SS":
      return <PlayingCard number={number} type="diamond" />;
    default:
      return null;
  }
};


