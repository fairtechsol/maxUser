import React from "react";
import BetStatusOverlay from "../betStatusOverlay";
import "./style.scss";

interface props {
  bgColor?: string;
  rate: any;
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
      <BetStatusOverlay active={parseInt(rate || 0) <= 0}>
        <div
          onClick={() => onClick()}
          className={`backLayBox text-center d-flex `}
        >
          <h5 className="backLay-rate f600 title-16 m-0">
            {parseInt(rate || 0) <= 0 ? "-" : rate}{" "}
          </h5>
          {percent && (
            <span className="backLay-percent title-10">{percent}</span>
          )}
        </div>
      </BetStatusOverlay>
    </div>
  );
}

export default BackLayBox;
