import React, { useState } from 'react';
import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap';
import "./style.scss";
const raceData = [
    {
      id: "goku6679520",
      country: "IE",
      gameName: "Roscommon",
      races: [
        { time: "21:50", link: "/race/:id" },
        { time: "22:20", link: "/m/race-detail/10/627576674" },
        { time: "22:50", link: "/m/race-detail/10/592197515" },
        { time: "23:20", link: "/m/race-detail/10/758304899" },
        { time: "23:50", link: "/m/race-detail/10/671889173" },
        { time: "00:20", link: "/m/race-detail/10/902177975" },
        { time: "00:50", link: "/m/race-detail/10/466506230" }
      ]
    },
    {
      id: "goku6106757",
      country: "AU",
      gameName: "Flemington",
      races: [
        { time: "22:00", link: "/m/race-detail/10/621036572" },
        { time: "22:30", link: "/m/race-detail/10/627576674" },
        { time: "23:00", link: "/m/race-detail/10/592197515" },
        { time: "23:30", link: "/m/race-detail/10/758304899" },
        { time: "00:00", link: "/m/race-detail/10/671889173" }
      ]
    },
    {
      id: "goku6667679",
      country: "GB",
      gameName: "Ascot",
      races: [
        { time: "20:50", link: "/m/race-detail/10/621036572" },
        { time: "21:20", link: "/m/race-detail/10/627576674" },
        { time: "21:50", link: "/m/race-detail/10/592197515" },
        { time: "22:20", link: "/m/race-detail/10/758304899" },
        { time: "22:50", link: "/m/race-detail/10/671889173" },
        { time: "23:20", link: "/m/race-detail/10/902177975" }
      ]
    },
    {
      id: "goku7689931",
      country: "FR",
      gameName: "Chantilly",
      races: [
        { time: "21:30", link: "/m/race-detail/10/621036572" },
        { time: "22:00", link: "/m/race-detail/10/627576674" },
        { time: "22:30", link: "/m/race-detail/10/592197515" },
        { time: "23:00", link: "/m/race-detail/10/758304899" },
        { time: "23:30", link: "/m/race-detail/10/671889173" },
        { time: "00:00", link: "/m/race-detail/10/902177975" }
      ]
    }
  ];
  
  const HorseRacingTabsMobile = () => {
    const [activeTab, setActiveTab] = useState(raceData[0].id);
  
    const handleSelect = (key:any) => {
      setActiveTab(key);
    };
  
  
    return (
    
        <Tabs
          id="horse-racing-tabs"
          activeKey={activeTab}
          onSelect={handleSelect}
          className="tabs-nav nav-links"
        >
          {raceData.map((race) => (
            <Tab eventKey={race.id} title={race.country} key={race.id}>
              <div className="bet-table tab-pane fade horse-table active show">
                <div className="game-listing-container">
                  <div className="game-list pt-1 pb-1">
                    <Row className="row5">
                      <Col xs={12}>
                        <p className="mb-0 game-name">
                          <span className="game-icon">
                            <i className="fas fa-tv"></i>
                          </span>
                          <strong >{race.gameName}</strong>
                        </p>
                      </Col>
                    </Row>
                    <Row className="row5">
                      <Col xs={12}>
                        <div className="horse-time-detail-m">
                          {race.races.map((r, index) => (
                            <a href={r.link} key={index}>
                              <span>{r.time}</span>
                            </a>
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Tab>
          ))}
        </Tabs>
    
    );
  };

export default HorseRacingTabsMobile;
