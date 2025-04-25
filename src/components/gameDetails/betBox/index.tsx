import { useEffect, useState } from "react";
import { handlePrice, handleSize } from "../../../helpers";

const BetBox = ({ data, type, handlePlaceBet, detail, runner }: any) => {
  const [tempRate, setTempRate] = useState("0");
  const [isYellow, setIsYellow] = useState(false);

  useEffect(() => {
    if (parseFloat(data?.price) != parseFloat(tempRate)) {
      setTimeout(() => {
        setIsYellow(false);
      }, 700);
      setIsYellow(true);
      setTempRate(data?.price);
    }
  }, [data?.price]);

  const handleBackground = (index: any) => {
    if (type === "back") {
      if (index === 2) {
        return isYellow ? "bg-secondary" : "back3Background";
      } else if (index === 1) {
        return isYellow ? "bg-secondary" : "back2Background";
      } else {
        return isYellow ? "bg-secondary" : "back1Background";
      }
    } else {
      if (index === 2) {
        return isYellow ? "bg-secondary" : "lay3Background";
      } else if (index === 1) {
        return isYellow ? "bg-secondary" : "lay2Background";
      } else {
        return isYellow ? "bg-secondary" : "lay1Background";
      }
    }
  };
  return (
    <div
      className={`matchOddBackBox ${handleBackground(data?.tno)}`}
      onClick={() =>
        handlePlaceBet(
          data?.price,
          type,
          detail,
          runner?.status,
          data?.tno,
          runner
        )
      }
    >
      <span className={`rateFont`}>{handlePrice(data?.price)}</span>
      <span className={`sizeFont matchOddRate2Box`}>
        {handleSize(data?.size)}
      </span>
    </div>
  );
};
export default BetBox;
