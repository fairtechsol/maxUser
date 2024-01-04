import React from "react";
import { FiMonitor } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../../../store/store";
import BackLayComponent from "./backlayComponent";
import "./style.scss";

const MobileOneVOneGame = () => {
  const { getMatchList } = useSelector(
    (state: RootState) => state.match.matchList
  );

  return (
    <div className="bg-lightGray match-list-container">
      {getMatchList?.map((item: any, index: number) => {
        return (
          <div key={index} className="px-3 py-1 m-game-one-v-one">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <Link
                  className="text-decoration-none text-black"
                  to={`/game-detail/${item?.id}`}
                >
                  {" "}
                  <b className="title-14">{item?.competitionName}</b>
                </Link>
                <div className="title-12">nov,12 2023</div>
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
                        item.backTeamA === null || item.backTeamA === undefined
                          ? "-"
                          : item.backTeamA
                      }
                      layRate={
                        item.layTeamA === null || item.layTeamA === undefined
                          ? "-"
                          : item?.layTeamA
                      }
                    />
                    <BackLayComponent
                      heading="X"
                      backRate={
                        item.backTeamC === null || item.backTeamC === undefined
                          ? "-"
                          : item.backTeamC
                      }
                      layRate={
                        item.layTeamC === null || item.layTeamC === undefined
                          ? "-"
                          : item?.layTeamC
                      }
                    />
                    <BackLayComponent
                      heading="2"
                      backRate={
                        item.backTeamB === null || item.backTeamB === undefined
                          ? "-"
                          : item.backTeamB
                      }
                      layRate={
                        item.layTeamB === null || item.layTeamB === undefined
                          ? "-"
                          : item?.layTeamB
                      }
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileOneVOneGame;
