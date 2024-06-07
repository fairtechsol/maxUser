import React from 'react';

import moment from 'moment';
import RatesBoxMobile from '../../../horseRacing/mobile/ratesBox';

const dummyMatchDetail = {
  matchOdd: {
    maxBet: 10000,
    activeStatus: 'active',
    runners: [
      {
        id: 'runner1',
        status: 'ACTIVE',
        runnerName: '1. Thunderbolt',
        ex: {
          availableToBack: [{ price: '2.5', size: '1000' }],
          availableToLay: [{ price: '3.0', size: '1000' }],
        },
        metadata: {
          STALL_DRAW: '5',
          JOCKEY_NAME: 'John Doe',
          TRAINER_NAME: 'Jane Smith',
          AGE: '3',
        },
        image: 'path/to/image1.jpg',
        selectionId: '1',
        number: '1',
      },
      {
        id: 'runner2',
        status: 'ACTIVE',
        runnerName: '2. Lightning',
        ex: {
          availableToBack: [{ price: '3.5', size: '1000' }],
          availableToLay: [{ price: '4.0', size: '1000' }],
        },
        metadata: {
          STALL_DRAW: '3',
          JOCKEY_NAME: 'Alice Johnson',
          TRAINER_NAME: 'Bob Brown',
          AGE: '4',
        },
        image: 'path/to/image2.jpg',
        selectionId: '2',
        number: '2',
      },
      {
        id: 'runner2',
        status: 'ACTIVE',
        runnerName: '2. Lightning',
        ex: {
          availableToBack: [{ price: '3.5', size: '1000' }],
          availableToLay: [{ price: '4.0', size: '1000' }],
        },
        metadata: {
          STALL_DRAW: '3',
          JOCKEY_NAME: 'Alice Johnson',
          TRAINER_NAME: 'Bob Brown',
          AGE: '4',
        },
        image: 'path/to/image2.jpg',
        selectionId: '2',
        number: '2',
      },
    ],
    id: 'match1',
    type: 'horseRacing',
  },
  matchType: 'greyHound',
  id: 'match1',
};

const CardsCompnentMobile = ({ handleClick }:any) => {
  const matchDetail = dummyMatchDetail;

  return (
    <>
      <div className="main-market">
        <div className="table-header">
          <div className="float-left country-name box-4 min-max title-12  align-items-center d-flex">
                  Min:100 Max:100000
                </div> 
          <div className="bg-blue1 box-1 float-left text-center f300">
            <b>BACK</b>
          </div>
          <div className="bg-red3 box-1 float-left text-center f300">
            <b>LAY</b>
          </div>
        </div>
        <div className="table-body">
          {matchDetail.matchOdd.runners.map((runner, index) => (
            <div
              data-title="player 1"
              className={`table-row ${
                runner.status !== 'ACTIVE' ||
                matchDetail.matchOdd.activeStatus !== 'live'
                  ? ''
                  : ''
              } removed suspended`}
              key={runner.id}
            >
              <div className="float-left f400 title-12 country-name box-4 lh-1.5">
                <div className="">
                    <div>
                      <span>{`${index + 1}. ${
                        runner.runnerName.split('.')?.[1]?.trim()
                          ? runner.runnerName.split('.')?.[1]?.trim()
                          : runner.runnerName
                      }`}</span>
                    </div>
                  <div className="d-flex justify-content-start ">
                    <span className="">
                      0
                    </span>
                  </div>
                </div>
              </div>
              <RatesBoxMobile
                rate={runner.ex.availableToBack[0]?.price}
                percent={runner.ex.availableToBack[0]?.size}
                onClick={() => {
                  const rate = parseFloat(runner.ex.availableToBack[0]?.price);
                  if (rate > 0) {
                    handleClick(
                      {
                        betOnTeam: runner.runnerName,
                        rate: rate,
                        type: 'back',
                        stake: 0,
                        betId: matchDetail.matchOdd.id,
                        eventType: matchDetail.matchType,
                        matchId: matchDetail.id,
                        matchBetType: matchDetail.matchOdd.type,
                        bettingName: 'Match Odd',
                        placeIndex: 0,
                        selectionId: JSON.stringify(runner.selectionId),
                        runnerId: runner.id,
                      },
                      matchDetail.matchOdd
                    );
                  }
                }}
                bgColor="bg-blue1"
              />
              <RatesBoxMobile
                rate={runner.ex.availableToLay[0]?.price}
                percent={runner.ex.availableToLay[0]?.size}
                onClick={() => {
                  const rate = parseFloat(runner.ex.availableToLay[0]?.price);
                  if (rate > 0) {
                    handleClick(
                      {
                        betOnTeam: runner.runnerName,
                        rate: rate,
                        type: 'lay',
                        stake: 0,
                        betId: matchDetail.matchOdd.id,
                        eventType: matchDetail.matchType,
                        matchId: matchDetail.id,
                        matchBetType: matchDetail.matchOdd.type,
                        bettingName: 'Match Odd',
                        placeIndex: 0,
                        selectionId: JSON.stringify(runner.selectionId),
                        runnerId: runner.id,
                      },
                      matchDetail.matchOdd
                    );
                  }
                }}
                bgColor="bg-red3"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardsCompnentMobile;
