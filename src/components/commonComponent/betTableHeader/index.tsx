import React, { ReactNode } from "react";
import "./style.scss";
interface props {
  bgColor?: string;
  title: string;
  padding?: string | number;
  style?: React.CSSProperties;
  customClass?: string;
  children?: ReactNode;
}

function BetTableHeader({
  title,
  bgColor,
  padding,
  style,
  customClass,
  children,
}: props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  return (
    <div
      className={`tableHeader d-flex f600 bg-${
        bgColor ? bgColor : "secondaryLight"
      } ${padding ? padding : "px-2"} ${customClass ?? ""}
      `}
      style={{ ...inlineStyle }}
    >
      <span className="title-14  text-black">{title}</span>
      {children}
    </div>
  );
}

export default BetTableHeader;
