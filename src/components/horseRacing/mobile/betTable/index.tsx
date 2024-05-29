import  { useState } from 'react';
import {  Tab, Card } from 'react-bootstrap';
import "./style.scss";
import isMobile from '../../../../utils/screenDimension';
import HorseModal from '../infoModal';
// import { useDispatch } from 'react-redux';
// import { AppDispatch, RootState } from '../../../../store/store';
// import { useSelector } from 'react-redux';
const raceData = [
    {
      id: '1',
      country: 'UK',
      location: 'Brighton',
      dateTime: '2024-05-21 18:50',
      raceType: '5f Hcap',
      maxBet: 50000,
      horses: [
        {
          id: '65762',
          number: 1,
          position: 1,
          name: 'Jacquelina',
          image: 'https://sitethemedata.com/race_icons/4973715940997/65762.jpg',
          backOdds: [3.8, 2.9],
          layOdds: [3.95, 6.4],
          jockey: 'Josephine Gordon',
          trainer: 'P S McEntee',
          age: 5,
        },
        {
          id: '565390',
          number: 6,
          position: 2,
          name: 'Anglesey Lad',
          image: 'https://sitethemedata.com/race_icons/4973715940997/565390.jpg',
          backOdds: [4.3, 1.1],
          layOdds: [4.7, 6.0],
          jockey: 'Rossa Ryan',
          trainer: 'D Loughnane',
          age: 3,
        },
        {
          id: '55061',
          number: 5,
          position: 4,
          name: 'Im Mable',
          image: 'https://sitethemedata.com/race_icons/4973715940997/55061.jpg',
          backOdds: [5.7, 3.1],
          layOdds: [6.6, 1.5],
          jockey: 'Paddy Bradley',
          trainer: 'M J Attwater',
          age: 6,
        },
        {
          id: '52923',
          number: 3,
          position: 6,
          name: 'Street Parade',
          image: 'https://sitethemedata.com/race_icons/4973715940997/52923.jpg',
          backOdds: [5.9, 3.0],
          layOdds: [7, 12.1],
          jockey: 'William Carson',
          trainer: 'M J Attwater',
          age: 8,
        },
        {
          id: '842894',
          number: 2,
          position: 7,
          name: 'Suanni',
          image: 'https://sitethemedata.com/race_icons/4973715940997/842894.jpg',
          backOdds: [11.5, 4.7],
          layOdds: [14, 1.7],
          jockey: 'J F Egan',
          trainer: 'Darryll Holland',
          age: 5,
        },
        {
          id: '87546',
          number: 4,
          position: 3,
          name: 'Darcys Rock',
          image: 'https://sitethemedata.com/race_icons/4973715940997/87546.jpg',
          backOdds: [17, 1.7],
          layOdds: [29, 1.4],
          jockey: 'Nicola Currie',
          trainer: 'P G Murphy',
          age: 5,
        },
        {
          id: '468095',
          number: 7,
          position: 5,
          name: 'Arzaak',
          image: 'https://sitethemedata.com/race_icons/4973715940997/468095.jpg',
          backOdds: [16.5, 1.8],
          layOdds: [19, 1.9],
          jockey: 'Hollie Doyle',
          trainer: 'C Wallis',
          age: 10,
        },
        {
          id: '790697',
          number: 8,
          position: 8,
          name: 'Glamorous Joy',
          image: 'https://sitethemedata.com/race_icons/4973715940997/790697.jpg',
          backOdds: [null, null],
          layOdds: [null, null],
          jockey: 'Non Runner',
          trainer: 'C Mason',
          age: 3,
        },
      ],
    },
   
    // Add more races as needed
  ];


const HorseRaceTabs = () => {
  // const [activeTab, setActiveTab] = useState(raceData[0]?.id || '');
  // const dispatch: AppDispatch = useDispatch();
  // const handleSelect = (selectedTab:any) => {
  //   setActiveTab(selectedTab);
  // };
  // const { matchDetail } = useSelector(
  //   (state: RootState) => state.horseRacing.matchDetail
  // );

  const [showModal, setShowModal] = useState(false);
  const [currentHorse, setCurrentHorse] = useState({});
  const [_, setModalStyle] = useState({});

  const handleShowModal = (event:any, horse:any) => {
    const rect = event.target.getBoundingClientRect();
    setCurrentHorse(horse);
    setModalStyle({
      position: 'absolute',
      top: `${rect.bottom}px`,
      left: `${rect.left}px`,
      transform: 'translateY(10px)', // Slight adjustment to position the modal below the click target
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {/* <Nav variant="tabs" activeKey={activeTab} onSelect={handleSelect} className="tabs-nav">
        {raceData.map((race:any) => (
          <Nav.Item key={race.id}>
            <Nav.Link eventKey={race.id}>{race.country}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav> */}

      {/* <Tab.Content className=''> */}
        {isMobile && raceData.map((race:any) => (
          <Tab.Pane eventKey={race.id} key={race.id} className="show no-padding-margin">
            <Card >
              <Card.Body className='car-body'>
                <div className="match-title">
                  <span className="match-name">{race.location}</span>
                  <span className="float-right">{race.dateTime}</span>
                </div>
                <div className="horse-banner">
                  <div className="time-detail">
                    <h5 className="mb-0">GB &gt; {race.location}</h5>
                    <div>
                      <span>{race.dateTime}</span>
                      <span>| {race.raceType}</span>
                      <div className="horse-timer">7 Hours Remaining</div>
                    </div>
                  </div>
                </div>
                <div className="market-title mt-1">
                  MATCH_ODDS
                  <span className="float-right">Max: {race.maxBet}</span>
                </div>
                <div className="main-market">
                  <div className="table-header">
                    <div className="float-left country-name box-4 min-max"></div>
                    <div className="back box-1 float-left text-center"><b>Back</b></div>
                    <div className="lay box-1 float-left text-center"><b>Lay</b></div>
                  </div>
                  <div className="table-body">
                    {race.horses.map((horse:any, index:any) => (
                      <div data-title="ACTIVE" className="table-row" key={index}>
                        <div className="float-left country-name box-4">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              id={horse.id}
                              name={horse.id}
                              className="custom-control-input"
                              value={horse}
                            />
                           
                            <label htmlFor={horse.id} className="custom-control-label">
                            <span className="horse-mobile-arrow">
                              <i data-toggle="collapse" data-target={`#detail-${horse.id}`} className="fas fa-angle-down"    onClick={(event) => handleShowModal(event, horse)}></i>
                            </span>
                              <div>{horse.number}<br />({horse.position})</div>
                              <div><img src={horse.image} alt={horse.name} /></div>
                              <div><span>{horse.name}</span><div className="w-100" style={{ color: 'black' }}>{horse.age}</div></div>
                            </label>
                          </div>
                        </div>
                        <div className="box-1 back  back lock text-center back">
                          <span className="odd d-block">{horse.backOdds[0]}</span>
                          <span className="d-block">{horse.backOdds[1]}</span>
                        </div>
                        <div className="box-1 lay  text-center lay">
                          <span className="odd d-block">{horse.layOdds[0]}</span>
                          <span className="d-block">{horse.layOdds[1]}</span>
                        </div>
                        <div id={`detail-${horse.id}`} className="collapse box-10 jockey-detail">
                          <span><b>Jockey:</b> {horse.jockey}</span>
                          <span><b>Trainer:</b> {horse.trainer}</span>
                          <span><b>Age:</b> {horse.age}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Tab.Pane>
        ))}
      {/* </Tab.Content> */}
      <HorseModal show={showModal} handleClose={handleCloseModal} horseData={currentHorse} />

   {/* {!isMobile && <HorseRace data={matchDetail}/>} */}
    </>
  );
};

export default HorseRaceTabs;
