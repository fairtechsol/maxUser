import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.scss";


const ScoreBoard = ({ data }:any) => {
  return (
    <Container className="scorecard mb-1">
      <Row>
        <Col xs={12} md={6}>
          {data.teams.map((team:any, index:any) => (
            <div key={index} className="team-1 row mb-2">
              <span className="team-name col-3">{team.name}</span>
              <span className="score col-4 text-end">{team.score}</span>
              {index === 1 && (
                <span className="team-name col-5">
                  <span>{team.crr && `CRR ${team.crr} `}</span>
                  <span>{team.rr && `RR ${team.rr}`}</span>
                </span>
              )}
            </div>
          ))}
        </Col>
        <Col xs={12} md={6}>
          <div className="text-xl-end mb-2">
            <span>{data.status}</span>
          </div>
          <Row>
            <Col xs={12}>
              <div className="text-xl-end ball-by-ball mt-2">
                {data.ballByBall.map((ball:any, index:any) => (
                  <Badge
                    key={index}
                    className={`ball-runs ${getBallClass(ball)}`}
                    pill
                  >
                    {ball}
                  </Badge>
                ))}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const getBallClass = (ball:any) => {
  switch (ball) {
    case '4':
      return 'four';
    case '6':
      return 'six';
    default:
      return '';
  }
};

export default ScoreBoard;