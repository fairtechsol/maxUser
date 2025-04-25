import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

interface Props {
  children?: ReactNode;
}
const BetStatusOverlay = ({ children }: Props) => {
  const { id } = useParams();
  return (
    <div
      className={` d-flex position-relative ${
        id ? "bet-overlay" : "bet-overlay-matchlist"
      }`}
    >
      {children}
    </div>
  );
};

export default BetStatusOverlay;
