import moment from "moment-timezone";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Img } from "react-image";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import bm from "../../../../../../assets/images/ic_bm.png";
import fancy from "../../../../../../assets/images/ic_fancy.png";
import { RootState } from "../../../../../../store/store";
import {
  availableGameType,
  casinoIcons,
} from "../../../../../../utils/constants";
import ContactAdmin from "../../../../../commonComponent/contactAdmin";
import BackLayComponent from "./backlayComponent";
import "./style.scss";
import HorseRacingComponentList from "../../../../../horseRacing";

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
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isAtBottom]);

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
          minHeight: location.pathname === "/home" || location.pathname === "/inPlay" ? "50%" : "50%",
          maxHeight: location.pathname === "/home" || location.pathname === "/inPlay" ? "400px" : "",
          overflowY: location.pathname === "/home" || location.pathname === "/inPlay" ? "auto" : "visible"
        }}
      >
        {availableGameType[mTypeid || id] ? (
        <>
          {availableGameType[mTypeid] === "horseRacing" || availableGameType[mTypeid] === "greyhoundRacing" ? (
            <HorseRacingComponentList matchType={mTypeid}/>
          ) : (
            <>
              {!matchList || matchList.length === 0 ? (
                <div className="text-center no-record-found">
                  <span>No real-time records found</span>
                </div>
              ) : (
                <>
                  {mTypeid === "cricket" && (
                    <div className="px-3 m-game-one-v-one">
                      <Link
                        className="text-decoration-none text-black f600"
                        to={"/contact-admin"}
                      >
                        Ball By ball
                      </Link>
                      <div className="d-flex w-100 pt-2">
                        <React.Fragment>
                          <BackLayComponent heading="1" backRate={"0"} layRate={"0"} active={false} />
                          <BackLayComponent heading="X" backRate={"0"} layRate={"0"} active={false} />
                          <BackLayComponent heading="2" backRate={"0"} layRate={"0"} active={false} />
                        </React.Fragment>
                      </div>
                    </div>
                  )}
                  {matchList.map((item:any, index:number) => (
                    <div key={index} className="px-3 py-1 m-game-one-v-one">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">
                          <Link
                            className="text-decoration-none text-black"
                            to={`/${mTypeid === "cricket" ? "game-detail/cricket" : `other-game-detail/${mTypeid}`}/${item?.id}`}
                          >
                            <b className="title-14 f600">{item?.title}</b>
                            <div className="title-12">
                              {moment(item?.startAt).tz(timezone).format("MMM DD YYYY h:mmA [IST]")}
                            </div>
                          </Link>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {item?.startAt || item?.stopAt ? <span className="liveDot"></span> : ""}
                          {item?.manualSessionActive || item?.apiSessionActive ? (
                            <span className="fancy">
                              <img src={fancy} alt={"fancy"} />
                            </span>
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
                        {item?.matchOdds?.map((item:any, index:number) => (
                          <React.Fragment key={index}>
                            <BackLayComponent
                              heading="1"
                              backRate={(item?.runners && item?.runners[0]?.ex?.availableToBack[0]?.price) || item?.backTeamA || 0}
                              layRate={(item?.runners && item?.runners[0]?.ex?.availableToLay[0]?.price) || item?.layTeamA || 0}
                              active={false}
                            />
                            <BackLayComponent
                              heading="X"
                              backRate={(item?.runners && item?.runners[2]?.ex?.availableToBack[0]?.price) || 0}
                              layRate={(item?.runners && item?.runners[2]?.ex?.availableToLay[0]?.price) || 0}
                              active={false}
                            />
                            <BackLayComponent
                              heading="2"
                              backRate={(item?.runners && item?.runners[1]?.ex?.availableToBack[0]?.price) || 0}
                              layRate={(item?.runners && item?.runners[1]?.ex?.availableToLay[0]?.price) || 0}
                              active={false}
                            />
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
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
      {location.pathname === "/home" || location.pathname === "/inPlay" ? (
        <div className="tab-pane active casino-tables d-flex">
          <div className="container-fluid">
            <div className="row row5">
              <div className="col-12">
                <h4 className="text-uppercase mt-3">Our Casino</h4>
              </div>
            </div>
            <div className="mt-2">
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
