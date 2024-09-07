import React from 'react';
import PropTypes from 'prop-types';
import "../style.scss"
import {isMobile} from '../../../utils/screenDimension';
import { MdSportsCricket } from 'react-icons/md';
import { IoTennisball } from 'react-icons/io5';
const LatestEvent = ({ events }) => {
  return (
    <div className={isMobile ? "latest-event-mobile border-bottom p-1" :"latest-event border-bottom "}>
      {events?.map((event:any) => (
        <div key={event.id} className="latest-event-item">
          <a className="blink_me" href={`/game-details/${event.iconId}/${event.eventId}`}>
            {/* <i className={`d-icon icon-${event.iconId}`}></i> */}
            <IoTennisball />
            <span>{event.name}</span>
          </a>
        </div>
      ))}
    </div>
  );
};

LatestEvent.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      iconId: PropTypes.number.isRequired,
      eventId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LatestEvent;
