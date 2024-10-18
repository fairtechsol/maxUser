import React from "react";
import { Table } from "react-bootstrap";
// import { FiMonitor } from "react-icons/fi";
import moment from "moment-timezone";
import { FiMonitor } from "react-icons/fi";
import { Img } from "react-image";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { RootState } from "../../../../../../store/store";
import {
  availableGameType,
  casinoIcons,
} from "../../../../../../utils/constants";
import ContactAdmin from "../../../../../commonComponent/contactAdmin";
import HorseRacingComponentList from "../../../../../horseRacing";
import BackLayComponent from "./backlayComponent";
import "./style.scss";
import { FaLock } from "react-icons/fa";
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
  const { countryWiseList } = useSelector(
    (state: RootState) => state.horseRacing.matchList
  );
  return (
    <>
      <Table className="matchListTable-desktop mb-4">
        <thead>
          <tr>
            {availableGameType[mTypeid] === "horseRacing" ||
            availableGameType[mTypeid] === "greyHound" ? (
              <></>
            ) : (
              <>
                {availableGameType[mTypeid] &&
                  tableHeading?.map((item) => (
                    <th
                      className={`title-14 lh-1 pt-2 ${
                        item?.textAlign === "center" ? "text-center" : ""
                      }`}
                      colSpan={item?.colspan}
                      key={item?.id}
                    >
                      {item?.name}
                    </th>
                  ))}
              </>
            )}
            {}
          </tr>
        </thead>
        <tbody>
          {availableGameType[mTypeid] ? (
            availableGameType[mTypeid] === "horseRacing" ||
            availableGameType[mTypeid] === "greyHound" ? (
              <>
                {!countryWiseList || countryWiseList?.length === 0 ? (
                  <div className="text-center">
                    <ContactAdmin />
                  </div>
                ) : (
                  <HorseRacingComponentList matchType={mTypeid} />
                )}
              </>
            ) : (
              <>
                {!matchList || matchList?.length === 0 ? (
                  <div className="text-center">
                    <ContactAdmin />
                  </div>
                ) : (
                  <>
                    {availableGameType[mTypeid] === "cricket" && (
                      <tr className="one-v-one-row overflow-hidden ">
                        <td className="px-2 w-50 align-middle">
                          <div className="d-flex justify-content-between align-items-center ">
                            <div className="text-decoration-none">
                              <div
                                className="one-v-one-title title-14"
                                style={{ color: "#343a40" }}
                              >
                                <Link className="text-black" to={"/ballbyball"}>
                                  {" "}
                                  Ball By Ball
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td
                          style={{ width: "10%", position: "relative" }}
                          colSpan={2}
                        >
                          <BackLayComponent
                            backRate={0}
                            layRate={0}
                            active={false}
                            backPercent={0}
                            layPercent={0}
                          />
                        </td>
                        <td
                          style={{ width: "10%", position: "relative" }}
                          colSpan={2}
                        >
                          <BackLayComponent
                            backRate={0}
                            layRate={0}
                            active={false}
                            backPercent={0}
                            layPercent={0}
                          />
                        </td>
                        <td
                          style={{ width: "10%", position: "relative" }}
                          colSpan={2}
                        >
                          <BackLayComponent
                            backRate={0}
                            layRate={0}
                            active={false}
                            backPercent={0}
                            layPercent={0}
                          />
                        </td>
                      </tr>
                    )}
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
            )
          ) : (
            <tr>
              <td>
                <ContactAdmin />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className=" mt-2 casino-list">
        {["/home"].includes(location.pathname) &&
          casinoIcons.map((item) => (
            <Link to={item.url} key={item?.name} className="casino-list-item">
              <div className="d-inline-block casinoicons">
                <Img src={item.imgSrc} className="img-fluid" alt={item.name} />
                <div className="casino-name">{item.name}</div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

const MatchListRow = ({ item, matchType }: any) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentTime = new Date().getTime();
  const startAt = new Date(item?.startAt).getTime();
  return (
    <tr className="one-v-one-row overflow-hidden">
      <td className="px-2 w-50 align-middle">
        <div className="d-flex justify-content-between align-items-center ">
          {/* <Link
            className="text-decoration-none"
            to={`/game-detail/${item?.id}`}
          > */}
          <NavLink
            className="text-decoration-none"
            to={`/${
              matchType === "cricket" || matchType === "politics"
                ? "game-detail/cricket"
                : `other-game-detail/${matchType}`
            }/${item?.id}`}
          >
            <div
              className="one-v-one-title title-14"
              style={{ color: "#343a40" }}
            >
              {item?.title} /{" "}
              {moment(item?.startAt).tz(timezone).format("MMM DD YYYY h:mmA")}
            </div>
          </NavLink>
          <div className="d-flex align-items-center gap-2">
            {/* Live Dot */}
            {currentTime >= startAt ? (
              <span className="liveDot"></span>
            ) : (
              <span style={{ width: "16px", height: "16px" }}></span> // Placeholder space
            )}

            {/* TV Icon */}
            {item?.isTv === true || item?.isTv === "1" ? (
              <FiMonitor />
            ) : (
              <span style={{ width: "16px", height: "16px" }}></span> // Placeholder space
            )}

            {/* Fancy Icon */}
            {item?.manualSessionActive || item?.apiSessionActive ? (
              <span className="fancy">
                <img src="/ic_fancy.png" alt={"fancy"} />
              </span>
            ) : (
              <span style={{ width: "16px", height: "16px" }}></span> // Placeholder space
            )}
            {/* Bookmaker Icon */}
            {item?.isBookmaker?.length > 0 ? (
              <span className="bookmaker">
                <img src="/ic_bm.png" alt={"fancy"} />
              </span>
            ) : (
              <span style={{ width: "18px", height: "16px" }}></span> // Placeholder space
            )}
          </div>
        </div>
      </td>
      <td style={{ width: "10%", position: "relative" }} colSpan={2}>
        {item?.matchOdds?.[0]?.status === "SUSPENDED" && (
          <div className="suspended-list-rates">
            <FaLock color="#fff" />
          </div>
        )}
        <BackLayComponent
          backRate={
            (item?.matchOdds?.[0]?.runners &&
              item?.matchOdds?.[0]?.runners[0]?.ex?.availableToBack?.[
                item?.matchOdds?.[0]?.runners[0]?.ex?.availableToBack?.length >
                1
                  ? 2
                  : 0
              ]?.price) ??
            item?.matchOdds?.[0]?.backTeamA ??
            0
          }
          layRate={
            (item?.matchOdds?.[0]?.runners &&
              item?.matchOdds?.[0]?.runners[0]?.ex?.availableToLay[0]?.price) ??
            item?.matchOdds?.[0]?.layTeamA ??
            0
          }
          active={false}
        />
      </td>
      <td style={{ width: "10%", position: "relative" }} colSpan={2}>
        {item?.matchOdds?.[0]?.status === "SUSPENDED" && (
          <div className="suspended-list-rates">
            <FaLock color="#fff" />
          </div>
        )}
        <BackLayComponent
          backRate={
            (item?.matchOdds?.[0]?.runners &&
              item?.matchOdds?.[0]?.runners[2]?.ex?.availableToBack[
                item?.matchOdds?.[0]?.runners[2]?.ex?.availableToBack?.length >
                1
                  ? 2
                  : 0
              ]?.price) ??
            item?.matchOdds?.[0]?.backTeamC ??
            0
          }
          layRate={
            (item?.matchOdds?.[0]?.runners &&
              item?.matchOdds?.[0]?.runners[2]?.ex?.availableToLay[0]?.price) ??
            item?.matchOdds?.[0]?.layTeamC ??
            0
          }
          active={false}
        />
      </td>
      <td style={{ width: "10%", position: "relative" }} colSpan={2}>
        {item?.matchOdds?.[0]?.status === "SUSPENDED" && (
          <div className="suspended-list-rates">
            <FaLock color="#fff" />
          </div>
        )}
        <BackLayComponent
          backRate={
            (item?.matchOdds?.[0]?.runners &&
              item?.matchOdds?.[0]?.runners[1]?.ex?.availableToBack[
                item?.matchOdds?.[0]?.runners[1]?.ex?.availableToBack?.length >
                1
                  ? 2
                  : 0
              ]?.price) ??
            item?.matchOdds?.[0]?.backTeamB ??
            0
          }
          layRate={
            (item?.matchOdds?.[0]?.runners &&
              item?.matchOdds?.[0]?.runners[1]?.ex?.availableToLay[0]?.price) ??
            item?.matchOdds?.[0]?.layTeamB ??
            0
          }
          active={false}
        />
      </td>
    </tr>
  );
};

export default DesktopOneVOneGameTable;
