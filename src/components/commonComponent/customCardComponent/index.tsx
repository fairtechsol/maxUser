import React, { useEffect, useState } from "react";
import { back, club, diamond, heart, spade } from "../../../assets/images";
import { isMobile } from "../../../utils/screenDimension";

interface PlayingCardProps {
  number: string;
  type: string;
  lock?: boolean;
  width: any;
  height: any;
  font:any;
  icon:any;
}

export const PlayingCard: React.FC<PlayingCardProps> = ({
  number,
  type,
  lock,
  width,
  height,
  font,
  icon,
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
        height: height ? height : "40px",
        width: width ? width : "32px",
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
              fontSize: font ? font : "18px",
            }}
          >
            {number}
          </span>
          <Icons type={type} icon={icon}/>
        </>
      ) : (
        <>
          <img
            src={back}
            width={width ? width : 30}
            height={height ? height : 40}
          />
        </>
      )}
    </div>
  );
};

interface IconsProps {
  type: string;
  icon:any;
}

export const Icons: React.FC<IconsProps> = ({ type,icon }) => {
  const renderImage = (src: string) => {
    return <img width={icon ? icon: "15"} alt={type} src={src} />;
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

interface CustomCardsProps {
  card: string;
  width: string; // Added width
  height: string; // Added height
  font:any;
  icon:any;
}

export const CustomCards: React.FC<CustomCardsProps> = ({
  card,
  width,
  height,
  font,
  icon,
}) => {
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    setNumber(card?.substring(0, card.length - 2) || "");
    setType(card?.substring(card.length - 2, card.length) || "");
  }, [card]);

  if (card === "1") {
    return (
      <PlayingCard
        number="0"
        type=""
        lock={true}
        width={width}
        height={height}
        font={font}
        icon={icon}
      />
    );
  }
  switch (type) {
    case "DD":
      return (
        <PlayingCard
          number={number}
          type="heart"
          width={width}
          height={height}
          font={font}
          icon={icon}
        />
      );
    case "CC":
      return (
        <PlayingCard
          number={number}
          type="club"
          width={width}
          height={height}
          font={font}
          icon={icon}
        />
      );
    case "HH":
      return (
        <PlayingCard
          number={number}
          type="spade"
          width={width}
          height={height}
          font={font}
          icon={icon}
        />
      );
    case "SS":
      return (
        <PlayingCard
          number={number}
          type="diamond"
          width={width}
          height={height}
          font={font}
          icon={icon}
        />
      );
    default:
      return null;
  }
};
