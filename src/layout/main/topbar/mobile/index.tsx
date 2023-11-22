import { Link } from "react-router-dom";
import topBarJson from "../topbar.json";
import "./style.scss";

const MobileTopBar = () => {
  return (
    <div className="w-100 d-flex">
      {topBarJson
        ?.filter((item) => item?.type === "mobile" || item?.type === "both")
        ?.map((item, index) => (
          <Link
            key={index}
            to={item?.link}
            className={`text-decoration-none topbar-link ${
              index === 0 ? "icc-wc" : "election"
            } p-2 w-100 text-white f700 text-center`}
          >
            {item?.name}
          </Link>
        ))}
    </div>
  );
};

export default MobileTopBar;
