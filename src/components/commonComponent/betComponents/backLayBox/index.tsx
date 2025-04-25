import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { isMobile } from "../../../../utils/screenDimension";
import BetStatusOverlay from "../betStatusOverlay";
import "./style.scss";
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
  const params = useParams();
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
      className={`backLay ${overlay ? "overlay" : ""}  ${customClass ? customClass : ""
        } bg-${isYellow ? "secondary" : bgColor}`}
      style={{ ...inlineStyle }}
    >
      {location.pathname == "/home" ? (
        <div>
          <span
            className={
              isMobile
                ? `backLay-rate fbold title-14 ${params?.type ? "fbold" : "fbold"}`
                : "backLay-rate fbold title-14 "
            }
          >
            {parseFloat(rate || 0) <= 0 || active
              ? isMobile
                ? "-"
                : "-"
              : rate}{" "}
          </span>
        </div>
      ) : (
        <BetStatusOverlay>
          <div
            // onClick={() => onClick()}
            className={` text-center d-flex cursor-pointer `}
          >
            <span
              className={
                isMobile
                  ? `backLay-rate fbold title-14 ${params?.type ? "fbold" : "fbold"}`
                  : "backLay-rate fbold title-16 "
              }
            >
              {parseFloat(rate || 0) <= 0 || active
                ? isMobile
                  ? "-"
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
