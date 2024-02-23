import React from "react";
import { FiMonitor } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../../../store/store";
import BackLayComponent from "./backlayComponent";
import "./style.scss";
import moment from "moment-timezone";

const MobileOneVOneGame = () => {
  const { matchList } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <div className="bg-lightGray match-list-container">
      <div className="scrollable-container">
        {matchList?.map((item: any, index: number) => {
          return (
            <div key={index} className="px-3 py-1 m-game-one-v-one">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column">
                  <Link
                    className="text-decoration-none text-black"
                    to={`/game-detail/${item?.id}`}
                  >
                    {" "}
                    <b className="title-14">{item?.title}</b>
                    <div className="title-12">
                      {" "}
                      {moment(item?.startAt)
                        .tz(timezone)
                        .format("MMM DD YYYY h:mmA [IST]")}
                    </div>
                  </Link>
                </div>
                <div className="d-flex align-items-center gap-2">
                  {item?.startAt || item?.stopAt ? (
                    <span className="liveDot"></span>
                  ) : (
                    ""
                  )}
                  <FiMonitor />
                  {item?.manualSessionActive || item?.apiSessionActive ? (
                    <span className="fancy">
                      <img src="/ic_fancy.png" alt={"fancy"} />
                    </span>
                  ) : (
                    ""
                  )}
                  {item?.isBookmaker > 0 ? (
                    <span className="bookmaker">
                      <img src="/ic_bm.png" alt={"fancy"} />
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="d-flex w-100">
                {item?.matchOdds?.map((item: any, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      <BackLayComponent
                        heading="1"
                        backRate={
                          (item?.runners &&
                            item?.runners[0]?.ex?.availableToBack[0]?.price) ??
                          item?.backTeamA ??
                          0
                        }
                        layRate={
                          (item?.runners &&
                            item?.runners[0]?.ex?.availableToLay[0]?.price) ??
                          item?.layTeamA ??
                          0
                        }
                        active={false}
                      />
                      <BackLayComponent
                        heading="X"
                        backRate={
                          (item?.runners &&
                            item?.runners[2]?.ex?.availableToBack[0]?.price) ??
                          0
                        }
                        layRate={
                          (item?.runners &&
                            item?.runners[2]?.ex?.availableToLay[0]?.price) ??
                          0
                        }
                        active={false}
                      />
                      <BackLayComponent
                        heading="2"
                        backRate={
                          (item?.runners &&
                            item?.runners[1]?.ex?.availableToBack[0]?.price) ??
                          0
                        }
                        layRate={
                          (item?.runners &&
                            item?.runners[1]?.ex?.availableToLay[0]?.price) ??
                          0
                        }
                        active={false}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="tab-pane active casino-tables d-flex">
        <div className="container-fluid ">
          <div className="row row5">
            <div className="col-12">
              <h4 className="text-uppercase mt-3">Our Casino</h4>
            </div>
          </div>

          <div className="mt-2">
            <a href="/casino/ball_by_ball" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/ballbyball.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Ball By Ball</div>
              </div>
            </a>
            <a href="/casino/superover" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/superover.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Super Over</div>
              </div>
            </a>
            <a href="/casino/race/t20" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/race20.png"
                  className="img-fluid"
                />
                <div className="mcasino-name">Race 20-20</div>
              </div>
            </a>
            <a href="/casino/queen" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/queen.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Casino Queen</div>
              </div>
            </a>
            <a href="/casino/cricketv3" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cricketv3.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">5Five Cricket</div>
              </div>
            </a>
            <a href="/casino/ab2" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar2.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Andar Bahar 2</div>
              </div>
            </a>
            <a href="/casino/dt202" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt202.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">20-20 Dragon Tiger 2</div>
              </div>
            </a>
            <a href="/casino/baccarat2" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat2.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Baccarat 2</div>
              </div>
            </a>
            <a href="/casino/baccarat" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat.png"
                  className="img-fluid"
                />
                <div className="mcasino-name">Baccarat</div>
              </div>
            </a>
            <a href="/casino/lucky7eu" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7eu.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Lucky 7 - B</div>
              </div>
            </a>
            <a href="/casino/teenpatti-list/teen6" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teencasino.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Teenpatti 2.0</div>
              </div>
            </a>
            <a href="/casino/cc20" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cc-20.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">20-20 Cricket Match</div>
              </div>
            </a>
            <a href="/casino/cmeter" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cmeter.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Casino Meter</div>
              </div>
            </a>
            <a href="/casino/war" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/war.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Casino War</div>
              </div>
            </a>
            <a href="/casino/dtl20" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dtl.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">20-20 DTL</div>
              </div>
            </a>
            <a href="/casino/teenpatti/test" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Test Teenpatti</div>
              </div>
            </a>
            <a href="/casino/teenpatti/open" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Open Teenpatti</div>
              </div>
            </a>
            <a href="/casino/teenpatti/oneday" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">1 Day Teenpatti</div>
              </div>
            </a>
            <a href="/casino/teenpatti/t20" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">20-20 Teenpatti</div>
              </div>
            </a>
            <a href="/casino/poker/6player" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">6 Player Poker</div>
              </div>
            </a>
            <a href="/casino/poker/oneday" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">1 Day Poker</div>
              </div>
            </a>
            <a href="/casino/poker/t20" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">20-20 Poker</div>
              </div>
            </a>
            <a href="/casino/ab20" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Andar Bahar</div>
              </div>
            </a>
            <a href="/casino/worli" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/worli.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Worli Matka</div>
              </div>
            </a>
            <a href="/casino/worli2" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/worli.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Instant Worli</div>
              </div>
            </a>
            <a href="/casino/3cardj" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/3cardsJ.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">3 Cards Judgement</div>
              </div>
            </a>
            <a href="/casino/card32a" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsA.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">32 Cards A</div>
              </div>
            </a>
            <a href="/casino/card32b" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsB.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">32 Cards B</div>
              </div>
            </a>
            <a href="/casino/aaa" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/aaa.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Amar Akbar Anthony</div>
              </div>
            </a>
            <a href="/casino/ddb" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/bollywood-casino.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Bollywood Casino</div>
              </div>
            </a>
            <a href="/casino/dt20" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">20-20 Dragon Tiger</div>
              </div>
            </a>
            <a href="/casino/dt6" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">1 Day Dragon Tiger</div>
              </div>
            </a>
            <a href="/casino/lottery" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lottery.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Lottery</div>
              </div>
            </a>
            <a href="/casino/lucky7" className="">
              <div className="d-inline-block casinoiconsm">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7.jpg"
                  className="img-fluid"
                />
                <div className="mcasino-name">Lucky 7 - A</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileOneVOneGame;
