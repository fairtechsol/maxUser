import React from "react";
import { Table } from "react-bootstrap";
// import { FiMonitor } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../../../store/store";
import BackLayComponent from "./backlayComponent";
import { Img } from "react-image";
import "./style.scss";
import moment from "moment-timezone";
import ContactAdmin from "../../../../../commonComponent/contactAdmin";
import {
  availableGameType,
  casinoIcons,
} from "../../../../../../utils/constants";
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

const DesktopOneVOneGameTable = ({ mTypeid }: any) => {
  const { matchList } = useSelector(
    (state: RootState) => state.match.matchList
  );
  return (
    <>
      <Table className="matchListTable-desktop mb-4">
        <thead>
          <tr>
            {tableHeading?.map((item) => (
              <th
                className={`title-14 ${
                  item?.textAlign === "center" ? "text-center" : ""
                }`}
                colSpan={item?.colspan}
                key={item?.id}
              >
                {item?.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {availableGameType[mTypeid] ? (
            <>
              {!matchList || matchList?.length === 0 ? (
                <tr>
                  <td>No matches available</td>
                </tr>
              ) : (
                <>
                  <tr className="one-v-one-row overflow-hidden">
      <td className="px-2 w-50 align-middle">
        <div className="d-flex justify-content-between align-items-center ">
          {/* <Link
            className="text-decoration-none"
            to={`/game-detail/${item?.id}`}
          > */}
          <div
            className="text-decoration-none"
          >
            <div
              className="one-v-one-title title-14"
              style={{ color: "#343a40" }}
            >
              Ball By Ball
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
           
              <span className="liveDot" style={{marginRight:'50px'}}></span>
            
          </div>
        </div>
      </td>
      
          <React.Fragment >
            <BackLayComponent
              backRate={0}
              layRate={0}
              active={false}
              backPercent={0}
              layPercent={0}
            />
            <BackLayComponent
              backRate={0}
              layRate={0}
              active={false}
              backPercent={0}
              layPercent={0}
            />
            <BackLayComponent
              backRate={0}
              layRate={0}
              active={false}
              backPercent={0}
              layPercent={0}
            />
          </React.Fragment>
       
    </tr>
                  {matchList?.map((item: any, index: number) => {
                    return (
                      <MatchListRow
                        key={index}
                        item={item}
                        matchType={mTypeid}
                      />
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <tr>
              <td>
                <ContactAdmin />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="col-md-12 mt-4">
        {casinoIcons.map((item, index) => (
          <a href={item.url} key={index} className="">
            <div className="d-inline-block casinoicons">
              <Img src={item.imgSrc} className="img-fluid" alt={item.name} />
              <div className="casino-name">{item.name}</div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

const MatchListRow = ({ item, matchType }: any) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <tr className="one-v-one-row overflow-hidden">
      <td className="px-2 w-50 align-middle">
        <div className="d-flex justify-content-between align-items-center ">
          {/* <Link
            className="text-decoration-none"
            to={`/game-detail/${item?.id}`}
          > */}
          <Link
            className="text-decoration-none"
            to={`/${
              matchType === "cricket"
                ? "game-detail/cricket"
                : `other-game-detail/${matchType}`
            }/${item?.id}`}
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
            {/* <FiMonitor /> */}
            {item?.manualSessionActive || item?.apiSessionActive ? (
              <span className="fancy">
                <img src="/ic_fancy.png" alt={"fancy"} />
              </span>
            ) : (
              ""
            )}
            {item?.isBookmaker?.length > 0 ? (
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
