import { ReactNode } from "react";
import { FaLock } from "react-icons/fa";
import "./style.scss";
import { useParams } from "react-router-dom";
import isMobile from "../../../../utils/screenDimension";

interface Props {
  children?: ReactNode;
  title?: string;
  active?: boolean;
}
const BetStatusOverlay = ({ title, children, active }: Props) => {

  const {id} = useParams();
  return (
    <>
      {
        <div className={`box-height d-flex position-relative ${id ? "bet-overlay" : "bet-overlay-matchlist"}`}>
          {active && (
            <div className="betStatusOverlay">
              {title && title !== "Lock" && (
                <h5 className="text-uppercase">
                  {title === "active" ? "" : title}
                </h5>
              )}
              {title === "Lock" && <FaLock />}
            </div>
          )}
          {children}
        </div>
      }
    </>
  );
};

export default BetStatusOverlay;
