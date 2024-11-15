import { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { sportsRules } from "../../utils/constants/index";
import "./index.scss";

const Mobile = () => {
  const [activeSport, setActiveSport] = useState<string | null>(null);


  useEffect(() => {
    if (sportsRules?.length > 0) {
      const firstSport = sportsRules[0];
      setActiveSport(firstSport.sportName);
    }
  }, []);

  const handleSelect = (sportName: string | null) => {
    setActiveSport(sportName);
  };

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
                aria-selected={index === 0} // Set the first tab as selected by default
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
