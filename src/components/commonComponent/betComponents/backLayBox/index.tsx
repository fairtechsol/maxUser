import React, { useEffect, useState } from "react";
import BetStatusOverlay from "../betStatusOverlay";
import "./style.scss";
import isMobile from "../../../../utils/screenDimension";
import { useLocation } from "react-router-dom";
interface props {
  bgColor?: string;
  rate: any;
  percent?: any;
  customClass?: string;
  overlay?: boolean;
  onClick?: any;
  style?: React.CSSProperties;
  active?: boolean;
  indexs?: number;
  type?: string | any;
  box?: string;
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
  indexs,
  type,
  box,
}: props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  const location = useLocation();
  const [tempRate, setTempRate] = useState("0");
  const [isYellow, setIsYellow] = useState(false);
  // console.log('first',type)
  useEffect(() => {
    if (parseFloat(rate) != parseFloat(tempRate)) {
      setTimeout(() => {
        setIsYellow(false);
      }, 2000);
      setIsYellow(true);
      setTempRate(rate);
    }
  }, [rate]);
  const handleRate = (rate: any) => {
    let value;
    if (
      [
        "quickbookmaker1",
        "quickbookmaker2",
        "quickbookmaker3",
        "tiedMatch2",
      ].includes(type) &&
      !isMobile
    ) {
      value =
        indexs !== undefined && (box == "lay" ? indexs > 0 : indexs < 2)
          ? Math.trunc(rate)
          : rate;
    } else {
      value = rate;
    }
    return value;
  };
  return (
    <div
      onClick={(e: any) => {
        e.stopPropagation();
        onClick();
      }}
      className={`backLay ${overlay ? "overlay" : ""}  ${
        customClass ? customClass : ""
      } bg-${isYellow ? "secondary" : bgColor}`}
      style={{ ...inlineStyle }}
    >
      {location.pathname == "/home" ? (
        <div
          // onClick={() => onClick()}
          className={`backLayBox text-center d-flex cursor-pointer ${
            isMobile ? " " : "boxheight"
          }`}
        >
          {/* <h5 className="backLay-rate f500 title-15 m-0 pt-1">
            {parseFloat(rate || 0) <= 0 || active
              ? isMobile
                ? "0"
                : "-"
              : rate}{" "}
          </h5> */}
          <h5
            className={`backLay-rate f500 title-15 m-0 pt-2 ${
              isMobile ? "mt-1" : ""
            }`}
          >
            {parseFloat(rate || 0) <= 0 || active
              ? isMobile
                ? "0"
                : "-"
              : rate}{" "}
          </h5>
        </div>
      ) : (
        <BetStatusOverlay>
          <div
            // onClick={() => onClick()}
            className={`backLayBox text-center d-flex cursor-pointer `}
          >
            <span
              className={
                isMobile
                  ? "backLay-rate f500 title-16 m-1"
                  : "backLay-rate f500 title-16 m-1"
              }
            >
              {parseFloat(rate || 0) <= 0 || active
                ? isMobile
                  ? "0"
                  : "-"
                : handleRate(rate)}{" "}
            </span>

            {+percent > 0 && parseFloat(rate) > 0 && (
              <span className="backLay-percent title-10">
                {percent >= 1000
                  ? (percent / 1000)?.toFixed(1) + "k"
                  : percent?.toString()}
              </span>
            )}
          </div>
        </BetStatusOverlay>
      )}
    </div>
  );
}

export default BackLayBox;
