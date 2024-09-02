import { Link } from "react-router-dom";
import topBarJson from "../topbar.json";
import "./style.scss";

const DesktopTopBar = () => {
  return (
    <div className="p-2 bg-secondary d-flex gap-4 title-12 overflow-auto no-wrap">
      {topBarJson
        ?.filter((item) => item?.type === "desktop" || item?.type === "both")
        ?.map((item) => (
          <Link
            key={item?.id}
            to={
              item?.id === "cricket" || item?.id === "football" || item?.id === "tennis" 
                ? `/game-list${item?.link}`
                : item?.link
            }
            className={`text-decoration-none f600 title-13  text-white topbar-link`}
          >
            {item?.name}
          </Link>
        ))}
    </div>
  );
};

export default DesktopTopBar;
