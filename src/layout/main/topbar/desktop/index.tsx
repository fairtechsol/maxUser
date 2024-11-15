import { Link, useParams,useLocation } from "react-router-dom";
import topBarJson from "../topbar.json";
import "./style.scss";
import {  useState } from "react";

const DesktopTopBar = () => {
  const {type} = useParams();
  const location = useLocation();
  const [activeId, setActiveId] = useState(null);

  const handleLinkClick = (id:any) => {
      setActiveId(id); 
    
  };
  return (
    <div className="p-2 bg-secondary d-flex gap-4 title-12 overflow-auto no-wrap">
     {topBarJson
        ?.filter((item) => item?.type === "desktop" || item?.type === "both")
        ?.map((item) => {
          const isGameLink = ["cricket", "football", "tennis"].includes(item?.id);
          const itemPath = isGameLink ? `/game-list${item?.link}` : item?.link;

          return (
            <Link
              key={item?.id}
              to={itemPath}
              className="text-decoration-none f700 title-14 text-white topbar-link"
              onClick={() => handleLinkClick(item?.id)} 
              style={{
                borderBottom: activeId===item?.id && location.pathname===item?.link ? '2px solid #fff' : item?.link.includes(type) ? '2px solid #fff' : '',
              }}
            >
              {item?.name}
            </Link>
          );
        })}
  </div>
  );
};

export default DesktopTopBar;
