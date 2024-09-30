import React, { ReactNode } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
interface props {
  bgColor?: string;
  title?: string;
  padding?: string | number;
  style?: React.CSSProperties;
  customClass?: string;
  rightComponent?:ReactNode;
  customTextClass?:string;
}

function BetTableHeader({
  title,
  padding,
  style,
  customClass,
  rightComponent,
  customTextClass
}: props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );

  return (
    <div
      className={`tableHeader d-flex justify-content-between f500 ${padding ? padding : "px-2"} ${customClass ?? ""}
      `}
      style={{ ...inlineStyle , backgroundColor:title==="" && "#fff" }}
    >
      <span className={`text-white ${customTextClass??"title-15 f700"}`}>{title}</span>
      
      {rightComponent}{(selectedBet?.team?.min && selectedBet?.team?.max) ? <span className="title-14 text-white f400">Range: {selectedBet?.team?.min} to {selectedBet?.team?.max}</span> : ""}
    </div>
  );
}

export default BetTableHeader;
