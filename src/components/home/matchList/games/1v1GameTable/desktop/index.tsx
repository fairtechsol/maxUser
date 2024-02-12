import React from "react";
import { Table } from "react-bootstrap";
import { FiMonitor } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../../../store/store";
import BackLayComponent from "./backlayComponent";
import "./style.scss";
import moment from "moment-timezone";
import ContactAdmin from "../../../../../commonComponent/contactAdmin";
import { useParams } from 'react-router-dom';
const tableHeading = [
  {
    id: "game",
    name: "Game",
  },
  {
    id: "1",
    name: "1",
    colspan: 2,
    textAlign: "center",
  },
  {
    id: "x",
    name: "X",
    colspan: 2,
    textAlign: "center",
  },
  {
    id: "2",
    name: "2",
    colspan: 2,
    textAlign: "center",
  },
];

const DesktopOneVOneGameTable = ({mTypeid}: any) => {
  const { matchList } = useSelector(
    (state: RootState) => state.match.matchList
  );



  const { id } = useParams();

  // console.log(mTypeid)

  return (
    <>
      <Table className="matchListTable-desktop mb-4">
        <thead>
          <tr>
            {tableHeading?.map((item) => (
              <th
                className={`title-14 ${item?.textAlign === "center" ? "text-center" : ""
                  }`}
                colSpan={item?.colspan}
                key={item?.id}
              >
                {item?.name}
                {/* {matchList } */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(!matchList || matchList.length === 0) && (

            (id === "cricket" || mTypeid === "cricket") ? (
              <tr>
                <td >
                  No matches available
                </td>
              </tr>
            ) : (
              <tr>
                <td>
                  <ContactAdmin />
                </td>
              </tr>
            )
          )}
          {matchList &&
            matchList?.map((item: any, index: number) => {
              return <MatchListRow item={item} key={index} />;
            })}
        </tbody>
      </Table>
      <div className="col-md-12 mt-4">
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/ballbyball.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Ball By Ball</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/superover.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Super Over</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/race20.png"
              className="img-fluid"
            />
            <div className="casino-name">Race 20-20</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/queen.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Casino Queen</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cricketv3.jpg"
              className="img-fluid"
            />
            <div className="casino-name">5Five Cricket</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar2.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Andar Bahar 2</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt202.jpg"
              className="img-fluid"
            />
            <div className="casino-name">20-20 Dragon Tiger 2</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat2.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Baccarat 2</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat.png"
              className="img-fluid"
            />
            <div className="casino-name">Baccarat</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7eu.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Lucky 7 - B</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teencasino.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Teenpatti 2.0</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cc-20.jpg"
              className="img-fluid"
            />
            <div className="casino-name">20-20 Cricket Match</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cmeter.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Casino Meter</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/war.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Casino War</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dtl.jpg"
              className="img-fluid"
            />
            <div className="casino-name">20-20 DTL</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Test Teenpatti</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Open Teenpatti</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg"
              className="img-fluid"
            />
            <div className="casino-name">1 Day Teenpatti</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg"
              className="img-fluid"
            />
            <div className="casino-name">20-20 Teenpatti</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg"
              className="img-fluid"
            />
            <div className="casino-name">6 Player Poker</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg"
              className="img-fluid"
            />
            <div className="casino-name">1 Day Poker</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg"
              className="img-fluid"
            />
            <div className="casino-name">20-20 Poker</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Andar Bahar</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/worli.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Worli Matka</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/worli.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Instant Worli</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/3cardsJ.jpg"
              className="img-fluid"
            />
            <div className="casino-name">3 Cards Judgement</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsA.jpg"
              className="img-fluid"
            />
            <div className="casino-name">32 Cards A</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsB.jpg"
              className="img-fluid"
            />
            <div className="casino-name">32 Cards B</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/aaa.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Amar Akbar Anthony</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/bollywood-casino.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Bollywood Casino</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg"
              className="img-fluid"
            />
            <div className="casino-name">20-20 Dragon Tiger</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg"
              className="img-fluid"
            />
            <div className="casino-name">1 Day Dragon Tiger</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lottery.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Lottery</div>
          </div>
        </a>
        <a href="/contact-admin" className="">
          <div className="d-inline-block casinoicons">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7.jpg"
              className="img-fluid"
            />
            <div className="casino-name">Lucky 7 - A</div>
          </div>
        </a>
      </div>
    </>
  );
};

const MatchListRow = ({ item }: any) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <tr className="one-v-one-row overflow-hidden">
      <td className="px-2 w-50 align-middle">
        <div className="d-flex justify-content-between align-items-center ">
          <Link
            className="text-decoration-none"
            to={`/game-detail/${item?.id}`}
          >
            <div
              className="one-v-one-title title-14"
              style={{ color: "#343a40" }}
            >
              {item?.title} /{" "}
              {moment(item?.startAt)
                .tz(timezone)
                .format("MMM DD YYYY h:mmA [IST]")}
            </div>
          </Link>
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
            {item?.isBookmaker.length > 0 ? (
              <span className="bookmaker">
                <img src="/ic_bm.png" alt={"fancy"} />
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </td>
      {item?.matchOdds?.map((item: any, index: number) => {
        console.log(
          item?.runners && item?.runners[0]?.ex?.availableToBack[0]?.price
        );
        return (
          <React.Fragment key={index}>
            <BackLayComponent
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
              backPercent={
                (item?.runners &&
                  item?.runners[0]?.ex?.availableToBack[0]?.size) ??
                ""
              }
              layPercent={
                (item?.runners &&
                  item?.runners[0]?.ex?.availableToLay[0]?.size) ??
                ""
              }
            />
            <BackLayComponent
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
              backPercent={
                (item?.runners &&
                  item?.runners[2]?.ex?.availableToBack[0]?.size) ??
                ""
              }
              layPercent={
                (item?.runners &&
                  item?.runners[2]?.ex?.availableToLay[0]?.size) ??
                ""
              }
            />
            <BackLayComponent
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
              backPercent={
                (item?.runners &&
                  item?.runners[1]?.ex?.availableToBack[0]?.size) ??
                ""
              }
              layPercent={
                (item?.runners &&
                  item?.runners[1]?.ex?.availableToLay[0]?.size) ??
                ""
              }
            />
          </React.Fragment>
        );
      })}
    </tr>
  );
};

export default DesktopOneVOneGameTable;
