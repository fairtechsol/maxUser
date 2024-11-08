import { useEffect, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { sportsRules } from "../../utils/constants";
import "./index.scss";

const Desktop = () => {
  const [activeSport, setActiveSport] = useState<string>("Motor Sport");
  // const [defaultSportRules, setDefaultSportRules] = useState<any>(null);

  useEffect(() => {
    if (sportsRules?.length > 0) {
      const firstSport = sportsRules[0];
      setActiveSport(firstSport.sportName);
      // setDefaultSportRules(firstSport);
    }
  }, []);

  const handleSelect = (sportName: string | null) => {
    // const selectedSport = sportsRules.find((sport) => sport.sportName === sportName);
    setActiveSport(sportName as string);
    // setDefaultSportRules(selectedSport);
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey={activeSport}>
      <Row className="p-2">
        <Col sm={3} className="pe-0">
          <Nav
            // variant="pills"
            className="flex-column custom-nav"
            onSelect={handleSelect}
          >
               {sportsRules.map((sport, index) => (
      <Nav.Item
        key={index}
        className={`custom-nav-item ${activeSport === sport.sportName ? "active" : ""}`}
      >
        <Nav.Link
          eventKey={sport.sportName}
          className="custom-nav-link text-center px-2"
        >
          {sport.sportName}
        </Nav.Link>
      </Nav.Item>
    ))}
          </Nav>
        </Col>

        <Col sm={9} className="ps-2">
          <Tab.Content>
            {sportsRules.map((sport, index) => (
              <Tab.Pane key={index} eventKey={sport.sportName}>
                <h4 className="rule-popup-heading">{sport.sportName} Rules</h4>
                <ul className="border">
                  {sport.rules.map((rule, ruleIndex) => (
                    <div key={ruleIndex}>
                      <h5 className="text-danger">{rule.category}</h5>
                      <ul>
                        {rule.description.map((description, descIndex) => (
                          <li key={descIndex}>{description}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ul>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Desktop;
