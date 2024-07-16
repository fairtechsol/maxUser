import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

const BaccaratStatistics = ({ odds }:any) => {
  // Extract relevant data for the pie chart
//   const pieData = odds
//     .filter(od => ['Player', 'Banker', 'Tie'].includes(od.nat))
//     .map(od => [od.nat, parseFloat(od.b1)]);

//   const chartData = [['Result', 'Percentage'], ...pieData];

  const options = {
    title: 'Baccarat Statistics',
    pieHole: 0.4,
    is3D: false,
    slices: {
      0: { color: '#086cb8' },
      1: { color: '#ae2130' },
      2: { color: '#279532' },
    },
  };

  return (
    <Container>
      <Row className="mt-2 justify-content-center">
        <Col md={6} className="text-center">
          <h4>Statistics</h4>
          <Chart
            chartType="PieChart"
            // data={chartData}
            options={options}
            width="100%"
            height="160px"
          />
        </Col>
      </Row>
      <Row className="baccarat-odds-container">
        {odds.slice(6, 9).map((odd:any, index:any) => (
          <Col key={index} md={3} className="baccarat-other-odd-box suspended-box">
            <div>{odd.nat}</div>
            <div>{odd.b1}:1</div>
          </Col>
        ))}
      </Row>
      <Row className="baccarat-main-odds mt-3">
        <Col md={3} className="player-pair-box-container">
          <div className="player-pair-box suspended-box">
            <div>{odds[3].nat}</div>
            <div>{odds[3].b1}:1</div>
          </div>
        </Col>
        <Col md={3} className="player-box-container">
          <div className="player-box suspended-box">
            <div>{odds[0].nat}</div>
            <div>{odds[0].b1}:1</div>
            <div>
              <img src="https://versionobj.ecoassetsservice.com/v13/static/front/img/cards/1.jpg" alt="card" />
              <img src="https://versionobj.ecoassetsservice.com/v13/static/front/img/cards/1.jpg" alt="card" />
            </div>
          </div>
        </Col>
        <Col md={3} className="tie-box-container">
          <div className="tie-box suspended-box">
            <div>{odds[2].nat}</div>
            <div>{odds[2].b1}:1</div>
          </div>
        </Col>
        <Col md={3} className="banker-box-container">
          <div className="banker-box suspended-box">
            <div>{odds[1].nat}</div>
            <div>{odds[1].b1}:1</div>
            <div>
              <img src="https://versionobj.ecoassetsservice.com/v13/static/front/img/cards/1.jpg" alt="card" />
              <img src="https://versionobj.ecoassetsservice.com/v13/static/front/img/cards/1.jpg" alt="card" />
            </div>
          </div>
        </Col>
        <Col md={3} className="banker-pair-box-container">
          <div className="banker-pair-box suspended-box">
            <div>{odds[4].nat}</div>
            <div>{odds[4].b1}:1</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BaccaratStatistics;
