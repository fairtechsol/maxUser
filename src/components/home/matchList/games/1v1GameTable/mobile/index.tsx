import moment from "moment-timezone";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Img } from "react-image";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import bm from "../../../../../../assets/images/gameicons/ic_bm.png";
import { LiaFacebookF } from "react-icons/lia";
import { RootState } from "../../../../../../store/store";
import {
  availableGameType,
  casinoIcons,
} from "../../../../../../utils/constants";
import ContactAdmin from "../../../../../commonComponent/contactAdmin";
import HorseRacingComponentList from "../../../../../horseRacing";
import BackLayComponent from "./backlayComponent";
import "./style.scss";
import { TbDeviceTvOld } from "react-icons/tb";

const MobileOneVOneGame = ({ mTypeid }: any) => {
  const { matchList } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { id } = useParams();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const location = useLocation();
  const isSportsRoute = location.pathname === "/sports";

  const [isAtBottom, setIsAtBottom] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null); // Specify the type of useRef

  const handleScroll = useCallback(() => {
    const box = boxRef.current;
    if (box) {
      setIsAtBottom(box.scrollTop + box.clientHeight >= box.scrollHeight);
    }
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    if (box) {
      box.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (box) {
        box.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (isAtBottom) {
      // window.scrollTo({
      //   top: document.body.scrollHeight/100,
      //   behavior: "smooth",
      // });
    }
  }, [isAtBottom]);

  const isScrollable = location.pathname === "/casino-slot";
  return (
    <div
      className={`bg-lightGray match-list-container ${
        isSportsRoute ? "match-list-containerm" : ""
      } ${
        location.pathname === "/home" || location.pathname === "/inPlay"
          ? ""
          : "match-list-h"
      }`}
    >
      {location.pathname !== "/casino-slot" &&
        location.pathname !== "/other" && (
          <div
            className={`scrollable-container ${
              isSportsRoute ? "match-list-containerm" : ""
            }`}
            ref={boxRef}
            // style={
            //   location.pathname === "/home" || location.pathname === "/inPlay"
            //     ? { height: !matchList || matchList?.length === 0 ? "" : "400px" }
            //     : {}
            // }
            style={{
              minHeight:
                location.pathname === "/home" || location.pathname === "/inPlay"
                  ? ""
                  : "",
              maxHeight:
                location.pathname === "/home" || location.pathname === "/inPlay"
                  ? ""
                  : "",
              // overflowY:
              //   location.pathname === "/home" || location.pathname === "/inPlay"
              //     ? "hidden"
              //     : "visible",
            }}
          >
            {availableGameType[mTypeid || id] ? (
              <>
                {availableGameType[mTypeid] === "horseRacing" ||
                availableGameType[mTypeid] === "greyHound" ? (
                  <HorseRacingComponentList matchType={mTypeid} />
                ) : (
                  <>
                    {!matchList || matchList.length === 0 ? (
                      <div className="text-center no-record-found">
                        <span>No real-time records found</span>
                      </div>
                    ) : (
                      <>
                        {mTypeid === "cricket" && (
                          <div className="px-1 lh-1 m-game-one-v-one">
                            <Link
                              className="text-decoration-none text-black f600 title-12 lh-1"
                              to={"/ballbyball"}
                            >
                              Ball By Ball
                            </Link>
                            <div className="d-flex w-100">
                              <React.Fragment>
                                <BackLayComponent
                                    suspend={false}
                                  heading=""
                                  backRate={"0"}
                                  layRate={"0"}
                                  active={false}
                                />
                                <BackLayComponent
                                    suspend={false}
                                  heading=""
                                  backRate={"0"}
                                  layRate={"0"}
                                  active={false}
                                />
                                <BackLayComponent
                                    suspend={false}
                                  heading=""
                                  backRate={"0"}
                                  layRate={"0"}
                                  active={false}
                                />
                              </React.Fragment>
                            </div>
                          </div>
                        )}
                        {matchList.map((item: any, index: number) => {
                          const currentTime = new Date().getTime();
                          const startAt = new Date(item?.startAt).getTime();
                          return (
                            <>
                              <div
                                key={index}
                                className="px-1 m-game-one-v-one"
                              >
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex flex-column">
                                    <Link
                                      className="text-decoration-none text-black lh-1"
                                      to={`/${
                                        mTypeid === "cricket" ||
                                        mTypeid === "politics"
                                          ? "game-detail/cricket"
                                          : `other-game-detail/${mTypeid}`
                                      }/${item?.id}`}
                                    >
                                      <b
                                        className="title-14 f600"
                                        style={{ color: "#333" }}
                                      >
                                        {item?.title}
                                      </b>
                                      <div className="title-12">
                                        {moment(item?.startAt)
                                          .tz(timezone)
                                          .format("MMM DD YYYY h:mmA")}
                                      </div>
                                    </Link>
                                  </div>
                                  <div className="d-flex align-items-center gap-2">
                                    {currentTime >= startAt ? (
                                      <span className="liveDot"></span>
                                    ) : (
                                      ""
                                    )}
                                    {item?.isTv === true ||
                                    item?.isTv === "1" ? (
                                      <TbDeviceTvOld />
                                    ) : (
                                      ""
                                    )}
                                    {item?.manualSessionActive ||
                                    item?.apiSessionActive ? (
                                      <LiaFacebookF size={11} />
                                    ) : (
                                      ""
                                    )}
                                    {item?.isBookmaker.length > 0 ? (
                                      <span className="bookmaker">
                                        <img src={bm} alt={"fancy"} />
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="d-flex w-100">
                                  <BackLayComponent
                                    heading="1"
                                    suspend={item?.matchOdds?.[0]?.status==="SUSPENDED"?true:false}
                                    backRate={
                                      (item?.matchOdds?.[0]?.runners &&
                                        item?.matchOdds?.[0]?.runners[0]?.ex
                                          ?.availableToBack[
                                          item?.matchOdds?.[0]?.runners[0]?.ex
                                            ?.availableToBack?.length > 1
                                            ? 2
                                            : 0
                                        ]?.price) ||
                                      item?.matchOdds?.[0]?.backTeamA ||
                                      0
                                    }
                                    layRate={
                                      (item?.matchOdds?.[0]?.runners &&
                                        item?.matchOdds?.[0]?.runners[0]?.ex
                                          ?.availableToLay[0]?.price) ||
                                      item?.matchOdds?.[0]?.layTeamA ||
                                      0
                                    }
                                    active={false}
                                  />
                                  <BackLayComponent
                                    heading="X"
                                    suspend={item?.matchOdds?.[0]?.status==="SUSPENDED"?true:false}
                                    backRate={
                                      (item?.matchOdds?.[0]?.runners &&
                                        item?.matchOdds?.[0]?.runners[2]?.ex
                                          ?.availableToBack[
                                          item?.matchOdds?.[0]?.runners[2]?.ex
                                            ?.availableToBack?.length > 1
                                            ? 2
                                            : 0
                                        ]?.price) ||
                                      0
                                    }
                                    layRate={
                                      (item?.matchOdds?.[0]?.runners &&
                                        item?.matchOdds?.[0]?.runners[2]?.ex
                                          ?.availableToLay[0]?.price) ||
                                      0
                                    }
                                    active={false}
                                  />
                                  <BackLayComponent
                                    heading="2"
                                    suspend={item?.matchOdds?.[0]?.status==="SUSPENDED"?true:false}
                                    backRate={
                                      (item?.matchOdds?.[0]?.runners &&
                                        item?.matchOdds?.[0]?.runners[1]?.ex
                                          ?.availableToBack[
                                          item?.matchOdds?.[0]?.runners[1]?.ex
                                            ?.availableToBack?.length > 1
                                            ? 2
                                            : 0
                                        ]?.price) ||
                                      0
                                    }
                                    layRate={
                                      (item?.matchOdds?.[0]?.runners &&
                                        item?.matchOdds?.[0]?.runners[1]?.ex
                                          ?.availableToLay[0]?.price) ||
                                      0
                                    }
                                    active={false}
                                  />
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="text-center">
                <ContactAdmin />
              </div>
            )}
          </div>
        )}
      {location.pathname === "/home" ||
      location.pathname === "/inPlay" ||
      location.pathname === "/casino-slot" ? (
        <div className="tab-pane active casino-tables d-flex">
          <div>
            <div
              className="mt-2"
              style={
                isScrollable
                  ? { maxHeight: "550px", overflowY: "auto" } // Adjust the maxHeight as needed
                  : {}
              }
            >
              {casinoIcons.map((item, index) => (
                <Link to={item.url} key={index}>
                  <div className="d-inline-block casinoiconsm">
                    <Img
                      src={item.imgSrc}
                      className="img-fluid"
                      alt={item.name}
                    />
                    <div className="mcasino-name">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default MobileOneVOneGame;
