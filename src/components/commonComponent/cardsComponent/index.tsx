import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { back, club, diamond, heart, spade } from "../../../assets/images";
// import Club from "../../assets/cards/clubs.png";
// import Diamond from "../../assets/cards/diamond.png";
// import Heart from "../../assets/cards/heart.png";
// import Spade from "../../assets/cards/spade.png";

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
        // border: "1px solid yellow",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px",
        background: lock ? `url(${back})` : "white",
        height: "45px",
        width: "35px",
        backgroundSize: "100% 100%",
      }}
    >
      {!lock && (
        <>
          <h6 style={{ color: type === "heart" || type === "diamond" ? "red" : "black", fontWeight: "800", lineHeight: "1" }}>
            {number}
          </h6>
          <Icons type={type} />
        </>
      )}
    </div>
  );
};

interface IconsProps {
  type: string;
}

export const Icons: React.FC<IconsProps> = ({ type }) => {
  const renderImage = (src: string) => {
    return <img width="15" alt={type} src={src} />;
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

export const HandleCards: React.FC<HandleCardsProps> = ({ card }) => {
  
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    setNumber(card?.substring(0, card.length - 2) || "");
    setType(card?.substring(card.length - 2, card.length) || "");
  }, [card]);

  if (card === "1") {
    return <PlayingCard number="0" type="" lock={true} />;
  }
  // console.log(card?.substring(0, card.length - 2),'jjjjjj',card)
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


