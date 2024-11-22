import { useEffect, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { sportsRules } from "../../utils/constants";
import "./index.scss";

const Desktop = () => {
  const [activeSport, setActiveSport] = useState<string>("Football");
  // const [defaultSportRules, setDefaultSportRules] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
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
      <Row className="ps-2 w-100">
        <div className="scrollable-container-1">
          <Col sm={2} className="pe-0">
            <Nav className="flex-column custom-nav" onSelect={handleSelect}>
              {sportsRules.map((sport, index) => (
                <Nav.Item
                  key={index}
                  className={`custom-nav-item ${
                    activeSport === sport.sportName ? "active" : ""
                  }`}
                >
                  <Nav.Link
                    eventKey={sport.sportName}
                    className="custom-nav-link text-end px-2"
                  >
                    {sport.sportName}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>

          <Col sm={10} className="ps-2">
            <Tab.Content>
              {sportsRules.map((sport, ruleIndex) => (
                <Tab.Pane key={ruleIndex} eventKey={sport.sportName}>
                  {sport.rules.map((rule, ruleIndex) => (
                    <table key={ruleIndex} style={{ width: "100%" }}>
                      <tbody>
                        {/* Category Row */}
                        <tr>
                          <td
                            colSpan={100}
                            className="rule-popup-heading bg-secondary p-1 text-white title-18"
                            style={{
                              fontWeight: "bold",
                              textAlign: "left",
                              padding: "10px",
                              borderBottom: "1px solid #ccc",
                              marginBottom: "10px",
                            }}
                          >
                            {rule.category}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ height: "8px" }}></td>
                        </tr>

                        {/* Description Rows */}
                        {rule.description.map((description, descIndex) => (
                          <tr
                            className="title-16 gap-2"
                            style={{ backgroundColor: "#f2f2f2" }}
                            key={descIndex}
                          >
                            <td
                              style={{
                                padding: "4px 10px",
                                borderBottom: "1px solid #ddd",
                                textAlign: "left",
                                lineHeight: 1.5,
                                color: description?.color || "black"
                              }}
                            >
                              {description?.text}
                            </td>
                          </tr>
                        ))}

                        <tr>
                          <td style={{ height: "8px" }}></td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </div>
      </Row>
    </Tab.Container>
  );
};

export default Desktop;