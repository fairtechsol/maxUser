import React, { useState } from 'react';
import { Tab, Tabs, Container, Row, Col, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss'; // Ensure this path is correct for your setup

const raceData = [
  {
    id: 'goku6667679',
    country: 'GB',
    gameName: 'Brighton',
    races: [
      { time: '18:50', link: '/race/:id' },
      { time: '19:20', link: '/race-detail/10/776951135' },
      { time: '19:50', link: '/race-detail/10/488787912' },
      { time: '20:20', link: '/race-detail/10/586095343' },
      { time: '20:50', link: '/race-detail/10/601592739' },
      { time: '21:25', link: '/race-detail/10/860947308' },
    ],
  },
  {
    id: 'goku7689931',
    country: 'FR',
    gameName: 'Paris',
    races: [
      { time: '18:40', link: '/race-detail/10/862218549' },
      { time: '19:10', link: '/race-detail/10/692571697' },
      { time: '19:40', link: '/race-detail/10/701929847' },
      { time: '20:10', link: '/race-detail/10/741608642' },
      { time: '20:40', link: '/race-detail/10/859534408' },
      { time: '21:10', link: '/race-detail/10/526954061' },
    ],
  },
  {
    id: 'goku6106757',
    country: 'AU',
    gameName: 'Melbourne',
    races: [
      { time: '21:50', link: '/race-detail/10/621036572' },
      { time: '22:20', link: '/race-detail/10/627576674' },
      { time: '22:50', link: '/race-detail/10/592197515' },
      { time: '23:20', link: '/race-detail/10/758304899' },
      { time: '23:50', link: '/race-detail/10/671889173' },
    ],
  },
  {
    id: 'goku6679520',
    country: 'IE',
    gameName: 'Dublin',
    races: [
      { time: '21:50', link: '/race-detail/10/621036572' },
      { time: '22:20', link: '/race-detail/10/627576674' },
      { time: '22:50', link: '/race-detail/10/592197515' },
      { time: '23:20', link: '/race-detail/10/758304899' },
      { time: '23:50', link: '/race-detail/10/671889173' },
    ],
  },
  {
    id: 'goku6468355',
    country: 'ZA',
    gameName: 'Johannesburg',
    races: [
      { time: '21:55', link: '/race-detail/10/782494365' },
      { time: '22:28', link: '/race-detail/10/757926870' },
      { time: '22:58', link: '/race-detail/10/735332740' },
      { time: '23:28', link: '/race-detail/10/814519332' },
    ],
  },
];

const HorseRacingTabsDesktop = () => {
  const [activeTab, setActiveTab] = useState(raceData[0].id);

  const handleSelect = (key:any) => {
    setActiveTab(key);
  };

  return (
    <>
      <Nav variant="tabs" activeKey={activeTab} onSelect={handleSelect} className="tabs-navs">
        {raceData.map((race) => (
          <Nav.Item key={race.id}>
            <Nav.Link eventKey={race.id}>{race.country}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {/* <Tab.Content> */}
        {raceData.map((race) => (
        
            <div key={race.id} className="coupon-card coupon-card-first">
              <div className="card-content">
                <table className="table coupon-table table-bordered">
                  <tbody>
                    <tr>
                      <td style={{ width: '30%' }}>
                        <a className="text-dark">{race.gameName}</a>
                      </td>
                      <td>
                        <div className="horse-time-detail">
                          {race.races.map((r, index) => (
                            <a href={r.link} key={index}>
                              <span>{r.time}</span>
                            </a>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
   
        ))}
      {/* </Tab.Content> */}
    </>
  );
};

export default HorseRacingTabsDesktop;
