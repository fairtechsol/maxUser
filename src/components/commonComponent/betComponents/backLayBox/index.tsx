import React, { useEffect, useState } from "react";
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
  active?: boolean;
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
  active,
}: props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };

  const [tempRate, setTempRate] = useState("0");
  const [isYellow, setIsYellow] = useState(false);

  useEffect(() => {
    if (parseFloat(rate) != parseFloat(tempRate)) {
      setTimeout(() => {
        setIsYellow(false);
      }, 2000);
      setIsYellow(true);
      setTempRate(rate);
    }
  }, [rate]);

  return (
    <div
      className={`backLay ${overlay ? "overlay" : ""}  ${
        customClass ? customClass : ""
      } bg-${isYellow ? "secondary" : bgColor}`}
      style={{ ...inlineStyle }}
    >
      <BetStatusOverlay active={parseInt(rate || 0) <= 0 && !active}>
        <div
          onClick={() => onClick()}
          className={`backLayBox text-center d-flex  cursor-pointer`}
        >
          <h5 className="backLay-rate f600 title-16 m-0">
            {parseInt(rate || 0) <= 0 || active ? "-" : rate}{" "}
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
