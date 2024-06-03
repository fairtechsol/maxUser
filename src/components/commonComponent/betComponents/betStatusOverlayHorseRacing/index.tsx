import { ReactNode } from "react";
import "./style.scss";
import moment from "moment";

interface Props {
  children?: ReactNode;
  active?: boolean;
  liveData?: any;
}
const BetStatusOverlayHorseRacing = ({ children, active, liveData }: Props) => {
  const { status, adjustmentFactor, removalDate } = liveData ?? {};

  return (
    <>
      {
        <div className="box-height d-flex position-relative bet-overlay-horse">
          {active && (
            <div className="betStatusOverlay">
              {!["ACTIVE", undefined, null].includes(status) && (
                <h5 className="text-uppercase">
                  {status === "active"
                    ? ""
                    : status === "REMOVED"
                    ? `${status} - ${adjustmentFactor}%, ${moment(
                        removalDate
                      ).format("MM/DD/YYYY HH:mm:ss A ([IST])")}`
                    : status}
                </h5>
              )}
            </div>
          )}
          {children}
        </div>
      }
    </>
  );
};

export default BetStatusOverlayHorseRacing;
