import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";


  

const HorseRace = ({ data }:any) => {
  return (
    <div className="featured-box horse-detail">
      <Row className="row5">
        <Col md={10} className="coupon-card featured-box-detail">
          <div className="horse-banner">
            <div className="time-detail">
              <h5 className="mb-0">{data.location}</h5>
              <div>
                <span>{data.date}</span> <span>| {data.raceInfo}</span>{" "}
                <span className="horse-timer">
                  <span>|</span> {data.remainingTime}
                </span>
              </div>
            </div>
          </div>
          <div className="game-market market-12">
            <div className="market-title mt-1">
              {data.marketTitle}
              <span className="float-right">Max : {data.maxBet}</span>
            </div>
            <div className="market-header">
              <div className="market-nation-detail"></div>
              <div className="market-odd-box no-border d-none d-md-flex"></div>
              <div className="market-odd-box no-border d-none d-md-flex"></div>
              <div className="market-odd-box back">
                <b>Back</b>
              </div>
              <div className="market-odd-box lay">
                <b>Lay</b>
              </div>
              <div className="market-odd-box d-none d-md-flex"></div>
              <div className="market-odd-box no-border d-none d-md-flex"></div>
            </div>
            <div className="market-body">
              {data.races.map((race:any) => (
                <div className="market-row" key={race.id}>
                  <div className="market-nation-detail">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id={race.id}
                        name={race.id}
                        className="form-check-input"
                      />
                      <label htmlFor={race.id} className="form-check-label">
                        <div>
                          {race.number}<br />({race.age})
                        </div>
                        <div>
                          <img src={race.imageUrl} alt={race.name} />
                        </div>
                        <div>
                          <span className="market-nation-name">
                            {race.number}. {race.name}
                          </span>
                          <span className="market-book float-right" style={{ color: 'black' }}>
                            0
                          </span>
                          <div className="jockey-detail d-none d-md-flex">
                            <span className="jockey-detail-box">
                              <b>Jockey:-</b> <span>{race.jockey}</span>
                            </span>
                            <span className="jockey-detail-box">
                              <b>Trainer:-</b> <span>{race.trainer}</span>
                            </span>
                            <span className="jockey-detail-box">
                              <b>Age:-</b> <span>{race.age}</span>
                            </span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="market-odd-box back2">
                    <span className="market-odd">{race.odds.back[0]}</span>
                    <span className="market-volume">{race.volumes.back[0]}</span>
                  </div>
                  <div className="market-odd-box back1">
                    <span className="market-odd">{race.odds.back[1]}</span>
                    <span className="market-volume">{race.volumes.back[1]}</span>
                  </div>
                  <div className="market-odd-box back">
                    <span className="market-odd">{race.odds.back[2]}</span>
                    <span className="market-volume">{race.volumes.back[2]}</span>
                  </div>
                  <div className="market-odd-box lay">
                    <span className="market-odd">{race.odds.lay[0]}</span>
                    <span className="market-volume">{race.volumes.lay[0]}</span>
                  </div>
                  <div className="market-odd-box lay1">
                    <span className="market-odd">{race.odds.lay[1]}</span>
                    <span className="market-volume">{race.volumes.lay[1]}</span>
                  </div>
                  <div className="market-odd-box lay2">
                    <span className="market-odd">{race.odds.lay[2]}</span>
                    <span className="market-volume">{race.volumes.lay[2]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HorseRace;
