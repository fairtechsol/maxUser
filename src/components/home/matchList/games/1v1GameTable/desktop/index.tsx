import React from "react";
import { Table } from "react-bootstrap";
import { FiMonitor } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../../../store/store";
import BackLayComponent from "./backlayComponent";
import "./style.scss";

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

const DesktopOneVOneGameTable = () => {
  const { matchList } = useSelector(
    (state: RootState) => state.match.matchList
  );

  return (
    <Table className="matchListTable-desktop">
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
              {/* {matchList } */}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {matchList &&
          matchList?.map((item: any, index: number) => {
            return <MatchListRow item={item} key={index} />;
          })}
      </tbody>
    </Table>
  );
};

const MatchListRow = ({ item }: any) => {
  return (
    <tr className="one-v-one-row overflow-hidden">
      <td className="px-2 w-50 align-middle">
        <div className="d-flex justify-content-between align-items-center">
          <Link
            className="text-decoration-none"
            to={`/game-detail/${item?.id}`}
          >
            <div className="one-v-one-title title-14">{item?.title}</div>
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
            {item?.isBookmaker > 0 ? (
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
              backRate={item.backTeamA ?? item.backTeamA}
              layRate={item?.layTeamA ?? item?.layTeamA}
              active={item?.isActive}
            />
            <BackLayComponent
              backRate={item?.backTeamB ?? item?.backTeamB}
              layRate={item?.layTeamB ?? item?.layTeamB}
              active={item?.isActive}
            />
            <BackLayComponent
              backRate={item?.backTeamC ?? item?.backTeamC}
              layRate={item?.layTeamC ?? item?.layTeamC}
              active={item?.isActive}
            />
          </React.Fragment>
        );
      })}
    </tr>
  );
};

export default DesktopOneVOneGameTable;
