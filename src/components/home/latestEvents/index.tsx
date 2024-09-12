import React from 'react';
import PropTypes from 'prop-types';
import "../style.scss"
import {isMobile} from '../../../utils/screenDimension';
import { MdSportsCricket } from 'react-icons/md';
import { IoTennisball } from 'react-icons/io5';
import { FaTrophy } from 'react-icons/fa';
const LatestEvent = ({ events }) => {
  const iconMapping = {
    40: <MdSportsCricket size={18} />, 
    4: <IoTennisball size={18}/>, 
    2: <MdSportsCricket size={18}/>, 
    1: <IoTennisball size={18}/>, 
  };
  return (
    <div className={isMobile ? "latest-event-mobile border-bottom" :"latest-event border-bottom "}>
      {events?.map((event:any) => (
        <div key={event.id} className="latest-event-item">
                                                      
            <a className="blink_me d-icon "> <div className='px-1'>{iconMapping[event.iconId]}</div><span className=''>{event.name}</span></a>
    
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
