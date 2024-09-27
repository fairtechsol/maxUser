import { useState } from 'react';
import "./style.scss";
const CasinoNav = ({ items }) => {
    const [activeItem, setActiveItem] = useState(items[0]?.id);

    const handleItemClick = (id) => {
      setActiveItem(id);
    };
  
    return (
      <div className={`casino-nav mt-2`}>
        <ul className="casino-sub-tab">
          {items?.map((item:any) => (
            <li
              key={item.id}
              className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            >
              <a
                href={item.link}
                className={`nav-link  ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
              >
                <span className='text-white ps-5'>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default CasinoNav;
