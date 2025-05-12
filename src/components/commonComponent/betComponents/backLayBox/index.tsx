import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { isMobile } from "../../../../utils/screenDimension";
import BetStatusOverlay from "../betStatusOverlay";
import "./style.scss";
interface props {
  bgColor: string;
  rate: any;
  active: boolean;
}
function BackLayBox({ bgColor, rate, active }: props) {
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
    return rate;
  };
  return (
    <div className={`backLay bg-${isYellow ? "secondary" : bgColor}`}>
      {location.pathname == "/home" ? (
        <div>
          <span
            className={
              isMobile
                ? `backLay-rate fbold title-14 ${
                    params?.type ? "fbold" : "fbold"
                  }`
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
          <div className="text-center d-flex cursor-pointer">
            <span
              className={
                isMobile
                  ? `backLay-rate fbold title-14 ${
                      params?.type ? "fbold" : "fbold"
                    }`
                  : "backLay-rate fbold title-16 "
              }
            >
              {parseFloat(rate || 0) <= 0 || active
                ? isMobile
                  ? "-"
                  : "-"
                : handleRate(rate)}{" "}
            </span>
          </div>
        </BetStatusOverlay>
      )}
    </div>
  );
}

export default BackLayBox;
