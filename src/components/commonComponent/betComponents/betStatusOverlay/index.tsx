import { ReactNode } from "react";
import { FaLock } from "react-icons/fa";
import "./style.scss";

interface Props {
  children?: ReactNode;
  title?: string;
  lock?: boolean;
}
const BetStatusOverlay = ({ title, children }: Props) => {
  return (
    <>
      <div className={`d-flex position-relative`}>
        <div className="betStatusOverlay">
          {title && title !== "Lock" && <h5>{title}</h5>}
          {title === "Lock" && <FaLock />}
        </div>
        {children}
      </div>
    </>
  );
};

export default BetStatusOverlay;
