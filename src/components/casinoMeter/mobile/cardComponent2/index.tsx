import React, { useEffect, useState } from "react";
import { back, club, diamond, heart, spade } from "../../../../assets/images";
import {isMobile} from "../../../../utils/screenDimension";

interface PlayingCardProps {
  number: string;
  type: string;
  lock?: boolean;
}

export const PlayingCard: React.FC<PlayingCardProps> = ({
  number,
  type,
  lock,
}) => {
  return (
    <div
      style={{
        borderRadius: "2px",
        border: "1px solid #fdf800",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "100%",
        WebkitBackgroundSize: "cover",
        background: "white",
        height: isMobile ? "24px" : "40px",
        width: isMobile ? "18px" : "30px",
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
              fontSize: isMobile ? "12px" : "18px",
            }}
          >
            {number}
          </span>
          <Icons type={type} />
        </>
      ) : (
        <>
          <img
            src={back}
            width={isMobile ? 16 : 30}
            height={isMobile ? 20 : 40}
          />
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
    return <img width={isMobile ? "8" : "15"} alt={type} src={src} />;
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

interface HandleCardsProps3 {
  card: string;
}

export const HandleCards3: React.FC<HandleCardsProps3> = ({ card }) => {
  const [type, setType] = useState("");
  //const [number, setNumber] = useState("");

  useEffect(() => {
    if (card === "1") {
      // setNumber("0");
      setType("");
    } else {
      const cardParts = card.split(" ");
      if (cardParts.length === 2) {
        const cardType = cardParts[0].toLowerCase();

        switch (cardType) {
          case "spade":
            setType("spade");
            break;
          case "club":
            setType("club");
            break;
          case "heart":
            setType("heart");
            break;
          case "diamond":
            setType("diamond");
            break;
          default:
            setType("");
        }

        //setNumber(cardNumber);
      }
    }
  }, [card]);

  if (card === "1") {
    return <PlayingCard number="0" type="" lock={true} />;
  }

  return <PlayingCard number={""} type={type} />;
};
