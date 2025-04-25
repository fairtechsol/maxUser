import { sportsRules } from "../../utils/constants/index";
import "./index.scss";

const Mobile = () => {
  return (
    <>
      <h3 style={{ backgroundColor: "#ffc107", fontWeight: "bold" }}>Rules</h3>
      <div className="rules-left-sidebar p-2">
        <div className="navvv nav-pill" role="tablist">
          {sportsRules.map((sport, index) => (
            <div className="nav-itemmm px-2" key={index}>
              <a
                role="tab"
                data-rr-ui-event-key={index}
                id={`tules-tabs-tab-${index}`}
                aria-controls={`tules-tabs-tabpane-${index}`}
                aria-selected={index === 0}
                className={`nav-linkss ${index === 0 ? "active" : ""}`}
                tabIndex={index === 0 ? 0 : -1}
                href="#"
              >
                {sport.sportName}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Mobile;
