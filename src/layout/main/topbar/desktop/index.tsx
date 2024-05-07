import { Link } from "react-router-dom";
import topBarJson from "../topbar.json";
import "./style.scss";

const DesktopTopBar = () => {
  return (
    <div className="p-2 bg-secondary d-flex gap-4 f400 title-14 overflow-auto no-wrap">
      {topBarJson
        ?.filter((item) => item?.type === "desktop" || item?.type === "both")
        ?.map((item) => (
          <Link
            key={item?.id}
            to={
              item?.id === "home"
                ? item?.link
                : item?.link === "/contact-admin"
                ? item?.link
                : `/game-list${item?.link}`
            }
            className={`text-decoration-none f700 text-black topbar-link ${
              item?.blink ? "blinking-text" : ""
            }`}
          >
            {item?.name}
          </Link>
        ))}
    </div>
  );
};

export default DesktopTopBar;
