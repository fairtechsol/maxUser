import { useState, useEffect } from "react";
import { sportsRules } from "../../../utils/constants/index";

import { Row, Col, Nav, Tab } from "react-bootstrap";

const Desktop = () => {
  const [activeSport, setActiveSport] = useState<string>("Motor Sport");

  useEffect(() => {
    if (sportsRules.length > 0) {
      const firstSport = sportsRules[0];
      setActiveSport(firstSport.sportName);
    }
  }, []);

  const handleSelect = (sportName: string | null) => {
    setActiveSport(sportName as string);
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey={activeSport}>
      <Row className="">
        <Col sm={3} className="pe-0">
          <Nav
            variant="pills"
            className="flex-column custom-nav"
            onSelect={handleSelect}
          >
            {sportsRules.map((sport, index) => (
              <Nav.Item key={index}>
                <Nav.Link
                  eventKey={sport.sportName}
                  className={`custom-nav-link shadow-lg rounded text-white px-2 ${
                    activeSport === sport.sportName ? "active" : ""
                  }`}
                >
                  {sport.sportName}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>

        <Col sm={9} className="ps-0">
          <Tab.Content>
            {sportsRules.map((sport, index) => (
              <Tab.Pane key={index} eventKey={sport.sportName}>
                <h4 className="rule-popup-heading">{sport.sportName} Rules</h4>
                <ul>
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
