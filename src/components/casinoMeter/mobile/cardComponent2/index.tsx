import React, { useEffect, useState } from "react";
import { back, club, diamond, heart, spade } from "../../../../assets/images";
import { isMobile } from "../../../../utils/screenDimension";

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
        border: "1px solid #fdf800",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize:"100%",
        WebkitBackgroundSize:"cover",
        background: "white",
        height: isMobile ? "40px" : "40px",
        width: isMobile ? "32px" : "32px",
        padding: "0px",
      }}
    >
      {!lock ? (
        <>
          <span
            style={{
              color: type === "heart" || type === "diamond" ? "red" : "black",
              fontWeight: "800",
              lineHeight: isMobile ? "1" : "1.2",
              fontSize: isMobile ? "22px" : "18px",
            }}
          >
            {number}
          </span>
          <Icons type={type} />
        </>
      ):<>
      <img src={back} width={ isMobile ?30:30} height={ isMobile ?40:40} /></>}
    </div>
  );
};

interface IconsProps {
  type: string;
}

export const Icons: React.FC<IconsProps> = ({ type }) => {
  const renderImage = (src: string) => {
    return <img width={isMobile ? "16" :"15"} alt={type} src={src} />;
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

export const HandleCards3: React.FC<HandleCardsProps> = ({ card }) => {
  
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


