import { useState, useEffect } from 'react';
import { sportsRules } from '../../utils/constants/index';
import './index.scss';
import { Accordion, Button } from 'react-bootstrap';

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
    <h3 style={{backgroundColor: "#ffc107", fontWeight: "bold"}}>Rules</h3>
    <Accordion activeKey={activeSport} onSelect={(eventKey) => handleSelect(eventKey as string)}>
      {sportsRules.map((sport, index) => (
        <Accordion.Item key={index} eventKey={sport.sportName} >
          <Accordion.Header  style={{backgroundColor: "#ffc107"}}>
            <Button variant="link">
              {sport.sportName}
            </Button>
          </Accordion.Header>
          <Accordion.Body>
            <h4>{sport.sportName} Rules</h4>
            <ul>
              {sport.rules.map((rule, ruleIndex) => (
                <div key={ruleIndex}>
                  <h5 className='text-danger'>{rule.category}</h5>
                  <ul>
                    {rule.description.map((description, descIndex) => (
                      <li key={descIndex}>{description}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
    </>
  );
};

export default Mobile;
