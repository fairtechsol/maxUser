import { useState } from "react";
import "../style.scss";

const Trio = ({ odds }: any) => {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  const handleBoxClick = (index: number) => {
    setSelectedBox(index);
  };

  const renderBox = (value: string, index: number) => (
    <div
      key={index}
      className={`worli-odd-box back w-100 ${selectedBox === index ? 'selected' : ''}`}
      onClick={() => handleBoxClick(index)}
    >
      <span className="worli-odd">{value}</span>
    </div>
  );

  return (
    <div  className={`${
      odds?.gstatus == 0 ? "suspended-box" : ""
    } worli-full`}>
      <div className="worli-box-title">
        <b>700</b>
      </div>
      <div className="worli-box-row">
        {renderBox("ALL TRIO", 0)}
      </div>
    </div>
  );
};

export default Trio;
