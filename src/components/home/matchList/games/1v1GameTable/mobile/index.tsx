import moment from "moment-timezone";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Img } from "react-image";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import bm from "../../../../../../assets/images/gameicons/ic_bm.png";
import { LiaFacebookF } from "react-icons/lia";
import { AppDispatch, RootState } from "../../../../../../store/store";
import {
  availableGameType,
  casinoIcons,
  liveCasinoGameList,
} from "../../../../../../utils/constants";
import ContactAdmin from "../../../../../commonComponent/contactAdmin";
import HorseRacingComponentList from "../../../../../horseRacing";
import BackLayComponent from "./backlayComponent";
import "./style.scss";
import { TbDeviceTvOld } from "react-icons/tb";
import { betPlacedReset } from "../../../../../../store/actions/betPlace/betPlaceActions";
import { useDispatch } from "react-redux";
import {
  liveCasinoList,
  liveCasinoLogin,
} from "../../../../../../store/actions/cards/cardDetail";
import { Modal } from "react-bootstrap";
import { maxbetLogo } from "../../../../../../assets/images";
import { FaHome } from "react-icons/fa";
import LiveCasino from "../../../../../../pages/casinoSubTab";
import LiveCasinoMobile from "../../../../../liveCasino/mobile";
import { isMobile } from "../../../../../../utils/screenDimension";
import SeperateMACGames from "../../../../../separateMACGames";

const MobileOneVOneGame = ({ mTypeid }: any) => {
  const [dataList, setDataList] = useState(casinoIcons);
  const [show, setShow] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { matchList } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { countryWiseList } = useSelector(
    (state: RootState) => state.horseRacing.matchList
  );
  const { getProfile } = useSelector((state: RootState) => state.user.profile);
  const { liveCasinoData, liveCasinoGame } = useSelector(
    (state: RootState) => state.card
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

  useEffect(() => {
    dispatch(liveCasinoList(""));
  }, []);

  useEffect(() => {
    if (liveCasinoData && Object.keys(liveCasinoData).length > 0) {
      const combinedArray = Object.values(liveCasinoData)
        .flatMap((set) => Object.values(set))
        .flat();
      const arr = [...combinedArray, ...casinoIcons];
      const sortedArr = arr.sort((a, b) => {
        const gameA = a.game_name || a.name || "";
        const gameB = b.game_name || b.name || "";

        const indexA = liveCasinoGameList.indexOf(gameA);
        const indexB = liveCasinoGameList.indexOf(gameB);

        if (indexA === -1) return 1;
        if (indexB === -1) return -1;

        return indexA - indexB;
      });

      setDataList(sortedArr);
    }
  }, [liveCasinoData]);

  const handleModal = (data: any) => {
    if (data?.game_id) {
      let payLoad: any = {
        gameId: data?.game_id,
        platformId: "mobile",
        providerName: data?.provider_name,
      };
      dispatch(liveCasinoLogin(payLoad));
      setShow(true);
    }
  };

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
      {![
        "/casino-slot",
        "/other",
        "/live-casinom",
        "/virtual",
        "/slot",
        "/fantasy",
      ].includes(location.pathname) && (
        <div
          className={`scrollable-container ${
            isSportsRoute ? "match-list-containerm" : ""
          }`}
          ref={boxRef}
          style={{
            minHeight:
              location.pathname === "/home" || location.pathname === "/inPlay"
                ? ""
                : "",
            maxHeight:
              location.pathname === "/home" || location.pathname === "/inPlay"
                ? ""
                : "",
          }}
        >
          {availableGameType[mTypeid || id] ? (
            <>
              {availableGameType[mTypeid] === "horseRacing" ||
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
                  {!matchList || matchList.length === 0 ? (
                    <div className="text-center">
                      <ContactAdmin />
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
                        return (
                          <>
                            <div key={index} className="px-1 m-game-one-v-one">
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
                                <div
                                  className="d-flex align-items-center gap-2"
                                  style={{
                                    display: "flex",
                                    width: "120px",
                                    justifyContent: "center",
                                  }}
                                >
                                  {item?.inPlay === "True" ||
                                  item?.iplay === true ? (
                                    <span className="liveDot"></span>
                                  ) : (
                                    <span style={{ width: "10px" }}>
                                      &nbsp;
                                    </span>
                                  )}

                                  {item?.tv === "True" || item?.tv === true ? (
                                    <TbDeviceTvOld />
                                  ) : (
                                    <span style={{ width: "20px" }}>
                                      &nbsp;
                                    </span>
                                  )}

                                  {/* Facebook Icon */}
                                  {item?.f === "True" || item?.f === true ? (
                                    <LiaFacebookF size={11} />
                                  ) : (
                                    <span style={{ width: "15px" }}>
                                      &nbsp;
                                    </span>
                                  )}

                                  {/* Bookmaker */}
                                  {item?.isBookmaker.length > 0 ? (
                                    <span className="bookmaker">
                                      <img src={bm} alt="fancy" />
                                    </span>
                                  ) : (
                                    <span style={{ width: "20px" }}>
                                      &nbsp;
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="d-flex w-100">
                                <BackLayComponent
                                  heading="1"
                                  suspend={
                                    mTypeid === "politics"
                                      ? true
                                      : item?.matchOdds?.[0]?.status ===
                                        "SUSPENDED"
                                      ? true
                                      : false
                                  }
                                  backRate={
                                    item?.back1 ||
                                    item?.section?.[0]?.odds?.[0]?.odds ||
                                    0
                                  }
                                  layRate={
                                    item?.lay1 ||
                                    item?.section?.[0]?.odds?.[1]?.odds ||
                                    0
                                  }
                                  active={false}
                                />
                                <BackLayComponent
                                  heading="X"
                                  suspend={
                                    item?.matchOdds?.[0]?.status === "SUSPENDED"
                                      ? true
                                      : false
                                  }
                                  backRate={
                                    item?.back12 ||
                                    item?.section?.[2]?.odds?.[0]?.odds ||
                                    0
                                  }
                                  layRate={
                                    item?.lay12 ||
                                    item?.section?.[2]?.odds?.[0]?.odds ||
                                    0
                                  }
                                  active={false}
                                />
                                <BackLayComponent
                                  heading="2"
                                  suspend={
                                    mTypeid === "politics"
                                      ? true
                                      : item?.matchOdds?.[0]?.status ===
                                        "SUSPENDED"
                                      ? true
                                      : false
                                  }
                                  backRate={
                                    item?.back11 ||
                                    item?.section?.[1]?.odds?.[0]?.odds ||
                                    0
                                  }
                                  layRate={
                                    item?.lay11 ||
                                    item?.section?.[1]?.odds?.[0]?.odds ||
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
      {["/home", "/inPlay", "/casino-slot"].includes(location.pathname) ? (
        <div className="tab-pane active casino-tables d-flex">
          <div>
            <div
              className="mt-2"
              style={
                isScrollable
                  ? { overflowY: "auto" } // Adjust the maxHeight as needed
                  : {}
              }
            >
              {casinoIcons.map((item: any, index: number) => (
                <Link
                  to={item.url}
                  key={index}
                  onClick={() => dispatch(betPlacedReset())}
                >
                  <div className="d-inline-block casinoiconsm">
                    <Img
                      src={item.url_thumb || item.imgSrc}
                      // className="img-fluid"
                      alt={item.game_name || item.name}
                      style={{ height: "100px", width: "100%" }}
                      onClick={() => handleModal(item)}
                    />
                    <div className="mcasino-name">
                      {item.game_name || item.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : ["/live-casinom"].includes(location.pathname) ? (
        <LiveCasino />
      ) : ["/virtual"].includes(location.pathname) ? (
        <SeperateMACGames gameType={"Virtual"} />
      ) : ["/slot"].includes(location.pathname) ? (
        <SeperateMACGames gameType={"slot"} />
      ) : ["/fantasy"].includes(location.pathname) ? (
        <SeperateMACGames gameType={"fantasy"} />
      ) : (
        ""
      )}
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header
          // closeButton
          className="p-2"
          style={{ color: "#fff", backgroundColor: "#004A25" }}
        >
          <Modal.Title className="w-100 ">
            <div className="w-100 d-flex justify-content-between align-items-center lh-1">
              <div
                className="d-flex flex-row align-items-center"
                onClick={() => setShow(false)}
              >
                <FaHome color="#fff" size={20} />
                <img
                  src={maxbetLogo}
                  width={"auto"}
                  height="27px"
                  alt="fairGame"
                  style={{
                    margin: "5px 5px 0",
                    maxWidth: "250px",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                />
              </div>

              <div className="title-14">
                <div>
                  Balance:
                  <b>
                    {parseFloat(
                      getProfile?.userBal?.currentBalance || 0
                    ).toFixed(2)}
                  </b>
                </div>
                <div>
                  <span className="white-text  cursor-pointer">
                    Exposure:
                    <b>
                      {parseInt(getProfile?.userBal?.exposure) === 0
                        ? 0
                        : -parseFloat(
                            getProfile?.userBal?.exposure || 0
                          ).toFixed(2)}
                    </b>
                  </span>
                </div>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {" "}
          <div className="w-100 h-100">
            <iframe
              src={liveCasinoGame?.url}
              title="Live Stream"
              referrerPolicy={"strict-origin-when-cross-origin"}
              width={"100%"}
              height={"100%"}
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MobileOneVOneGame;
