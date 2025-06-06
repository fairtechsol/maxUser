import React, { ReactNode } from "react";
import "./style.scss";
interface props {
  bgColor?: string;
  title?: string;
  padding?: string | number;
  style?: React.CSSProperties;
  customClass?: string;
  rightComponent?: ReactNode;
  customTextClass?: string;
  setShowVideo?: any;
}

function BetTableHeader({
  title,
  padding,
  style,
  customClass,
  rightComponent,
  customTextClass,
  setShowVideo,
}: props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  return (
    <div
      className={`tableHeader d-flex justify-content-between f500 ${
        padding ? padding : "px-2"
      } ${customClass ?? ""}
      `}
      style={{ ...inlineStyle }}
      onClick={() => setShowVideo((prev: boolean) => !prev)}
    >
      <span className={`text-white ${customTextClass ?? "title-15 f700"}`}>
        {title}
      </span>

      {rightComponent}
    </div>
  );
}

export default BetTableHeader;
