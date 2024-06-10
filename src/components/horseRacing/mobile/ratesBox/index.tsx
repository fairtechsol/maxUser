import { useEffect, useState } from "react";

const RatesBoxMobile = ({ rate, percent, bgColor, onClick }: any) => {
  const [tempRate, setTempRate] = useState("0");
  const [isYellow, setIsYellow] = useState(false);

  useEffect(() => {
    if (parseFloat(rate) != parseFloat(tempRate)) {
      setTimeout(() => {
        setIsYellow(false);
      }, 1500);
      setIsYellow(true);
      setTempRate(rate);
    }
  }, [rate]);

  return (
    <div
      className={`box-1 text-center ${isYellow ? "bg-secondary" : bgColor}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <span className="odd d-block f500 title-15">{rate}</span>
      <span className="d-block">{percent}</span>
    </div>
  );
};

export default RatesBoxMobile;
