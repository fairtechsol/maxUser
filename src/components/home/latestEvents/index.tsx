import PropTypes from 'prop-types';
import "../style.scss";
import { isMobile } from '../../../utils/screenDimension';
import { MdSportsCricket } from 'react-icons/md';
import { PiTennisBallFill } from "react-icons/pi";
import { IoFootball } from "react-icons/io5";
import {NavLink } from "react-router-dom";

const LatestEvent = ({ events }) => {
  const iconMapping = {
    cricket: <MdSportsCricket size={18} />,
    football: <IoFootball size={18} />,
    tennis: <PiTennisBallFill size={18} />,
  };

  return (
    <div className={isMobile ? "latest-event-mobile border-bottom" : "latest-eventt border-bottom"}>
      {events?.map((event:any) => (
        <div key={event.id} className="latest-event-item">
           <NavLink
            className="blink_me d-icon"
            to={`/${
              event.matchType === "cricket"
                ? "game-detail/cricket"
                : `other-game-detail/${event.matchType}`
            }/${event?.matchId}`}>
            <div className='px-1'>{iconMapping[event.matchType]}</div>
            <span className=''>{event.matchName}</span> 
            </NavLink>
        </div>
      ))}
    </div>
  );
};

LatestEvent.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      eventId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LatestEvent;
