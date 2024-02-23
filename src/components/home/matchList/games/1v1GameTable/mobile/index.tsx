import React, { useEffect, useRef } from "react";
import { FiMonitor } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../../../store/store";
import BackLayComponent from "./backlayComponent";
import "./style.scss";
import moment from "moment-timezone";
import { Img } from 'react-image';
import { casinoIcons } from "../../../../../../utils/constants";
const MobileOneVOneGame = () => {
  // const mainContainerRef = useRef<any>(null);

  // const scrollableContainerRef = useRef<any>(null);

  

  // useEffect(() => {
  //   const mainContainer = mainContainerRef.current;
  //   const scrollableContainer = scrollableContainerRef.current;

  //   const handleScroll = () => {
  //     // Check if scroll position is at the bottom of the scrollable container
  //     if (
  //       scrollableContainer.scrollTop + scrollableContainer.clientHeight >=
  //       scrollableContainer.scrollHeight
  //     ) {
  //       // Scroll the main container into view smoothly
  //       mainContainer.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   };

  //   scrollableContainer.addEventListener('scroll', handleScroll);

  //   return () => {
  //     scrollableContainer.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  const { matchList } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="bg-lightGray match-list-container" >
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
                        backRate={item?.backTeamA ?? "-"}
                        layRate={item?.layTeamA ?? "-"}
                        active={item?.isActive}
                      />
                      <BackLayComponent
                        heading="X"
                        backRate={
                          item?.backTeamC === null ||
                            item?.backTeamC === undefined
                            ? "-"
                            : item.backTeamC
                        }
                        layRate={
                          item?.layTeamC === null || item?.layTeamC === undefined
                            ? "-"
                            : item?.layTeamC
                        }
                        active={item?.isActive}
                      />
                      <BackLayComponent
                        heading="2"
                        backRate={
                          item?.backTeamB === null ||
                            item?.backTeamB === undefined
                            ? "-"
                            : item?.backTeamB
                        }
                        layRate={
                          item?.layTeamB === null || item?.layTeamB === undefined
                            ? "-"
                            : item?.layTeamB
                        }
                        active={item?.isActive}
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
        <div  className="container-fluid ">
          <div className="row row5">
            <div className="col-12">
              <h4 className="text-uppercase mt-3">Our Casino</h4>
            </div>
          </div>
          <div className="mt-2">
            {casinoIcons.map((item, index) => (
              <a href={item.url} key={index} className="">
                <div className="d-inline-block casinoiconsm">
                  <Img src={item.imgSrc} className="img-fluid" alt={item.name} />
                  <div className="mcasino-name">{item.name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileOneVOneGame;
