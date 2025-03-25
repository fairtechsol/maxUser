import PropTypes from "prop-types";
import { IoFootball } from "react-icons/io5";
import { MdSportsCricket } from "react-icons/md";
import { PiTennisBallFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { isMobile } from "../../../utils/screenDimension";
import "../style.scss";

const LatestEvent = ({ events }: any) => {
  const iconMapping = {
    cricket: <MdSportsCricket size={18} />,
    football: <IoFootball size={18} />,
    tennis: <PiTennisBallFill size={18} />,
  };

  return (
    <div
      className={
        isMobile
          ? "latest-event-mobile border-bottom"
          : "latest-eventt border-bottom"
      }
    >
      {events?.map((event: any) => (
        <div key={event.id} className="latest-event-item">
          <NavLink
            className="blink_me d-icon"
            to={`/game-detail/${event.matchType}/${event?.matchId}`}
          >
            <div className="px-1">{iconMapping[event.matchType]}</div>
            <span className="">{event.matchName}</span>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

LatestEvent.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      type: PropTypes.any,
      eventId: PropTypes.any,
      name: PropTypes.any,
    })
  ),
};

export default LatestEvent;
