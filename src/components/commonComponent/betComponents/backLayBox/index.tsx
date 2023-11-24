import React from "react";
import "./style.scss";

interface props {
  bgColor?: string;
  rate: number | string;
  percent?: number | string;
  customClass?: string;
  overlay?: boolean;
  onClick?: any;
  style?: React.CSSProperties;
  // onClick?: () => void;
}
function BackLayBox({
  customClass,
  bgColor,
  rate,
  percent,
  overlay,
  onClick,
  style,
}: props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  return (
    <div
      className={`backLay ${overlay ? "overlay" : ""}  ${
        customClass ? customClass : ""
      } bg-${bgColor}`}
      style={{ ...inlineStyle }}
    >
      <div
        onClick={() => onClick()}
        className={`backLayBox  text-center d-flex `}
      >
        <h5 className="backLay-rate f600 title-16 m-0">{rate}</h5>
        <span className="backLay-percent title-10">{percent}</span>
      </div>
    </div>
  );
}

export default BackLayBox;
