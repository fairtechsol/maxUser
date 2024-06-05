import { useEffect, useState } from "react";

const RatesBox = ({ rate, percent, bgColor, onClick }: any) => {
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
      className={`market-odd-box ${isYellow ? "bg-secondary" : bgColor}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <span className="market-odd">{rate}</span>
      <span className="market-volume">{percent}</span>
    </div>
  );
};

export default RatesBox;
