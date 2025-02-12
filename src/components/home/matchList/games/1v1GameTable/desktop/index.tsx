import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
// import { FiMonitor } from "react-icons/fi";
import moment from "moment-timezone";
import { FaHome, FaLock } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";
import { Img } from "react-image";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { maxbetLogo } from "../../../../../../assets/images";
import { expertSocketService } from "../../../../../../socketManager";
import { betPlacedReset } from "../../../../../../store/actions/betPlace/betPlaceActions";
import {
  liveCasinoList,
  liveCasinoLogin,
} from "../../../../../../store/actions/cards/cardDetail";
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
  const [dataList, setDataList] = useState(casinoIcons);
  const [show, setShow] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { matchList } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { countryWiseList } = useSelector(
    (state: RootState) => state.horseRacing.matchList
  );
  const { liveCasinoData, liveCasinoGame } = useSelector(
    (state: RootState) => state.card
  );

  const { getProfile } = useSelector((state: RootState) => state.user.profile);

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
        const gameA = a.game_id || a.name || "";
        const gameB = b.game_id || b.name || "";

        // Find the corresponding objects in liveCasinoGameList
        const gameObjA = liveCasinoGameList.find(
          (game) => game.game_id === gameA
        );
        const gameObjB = liveCasinoGameList.find(
          (game) => game.game_id === gameB
        );

        // Handle cases where games are not found in the list
        if (!gameObjA) return 1; // If A is not found, push it to the end
        if (!gameObjB) return -1; // If B is not found, push it to the end

        // Compare by indices in the list
        const indexA = liveCasinoGameList.indexOf(gameObjA);
        const indexB = liveCasinoGameList.indexOf(gameObjB);

        if (indexA !== indexB) {
          return indexA - indexB;
        }

        // If indices are the same, sort by game ID
        return gameObjA.game_id - gameObjB.game_id;
      });

      setDataList(sortedArr);
    }
  }, [liveCasinoData, liveCasinoGameList]);

  const handleModal = (data: any) => {
    if (data?.game_id) {
      let payLoad: any = {
        gameId: data?.game_id,
        platformId: "desktop",
        providerName: data?.provider_name,
      };
      dispatch(liveCasinoLogin(payLoad));
      setShow(true);
    }
  };
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
          liveCasinoGameList.map((item: any) => (
            <Link
              to={item.url}
              key={item?.name || item?.game_id}
              className="casino-list-item"
              onClick={() => {
                dispatch(betPlacedReset());
              }}
            >
              <div className="w-100 d-inline-block casinoicons">
                <Img
                  src={item.url_thumb || item.imgSrc}
                  className=""
                  alt={item.game_name || item.name}
                  style={{ height: "120px", width: "100%" }}
                  onClick={() => {
                    if (!item?.url) {
                      handleModal(item);
                    }
                  }}
                />
                <div className="casino-name">{item.game_name || item.name}</div>
              </div>
            </Link>
          ))}
      </div>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header
          // closeButton
          // closeVariant={"white"}
          style={{ color: "#fff", backgroundColor: "#004A25" }}
        >
          <Modal.Title className="w-100">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div
                className="d-flex flex-row align-items-center"
                onClick={() => setShow(false)}
              >
                <FaHome color="#fff" size={40} />
                <img
                  src={maxbetLogo}
                  width={"auto"}
                  alt="fairGame"
                  style={{
                    margin: "5px 5px 0",
                    maxWidth: "250px",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                />
              </div>

              <div className="title-16">
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
    </>
  );
};

const MatchListRow = ({ item, matchType }: any) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const navigate = useNavigate();

  return (
    <tr className="one-v-one-row overflow-hidden">
      <td className="px-2 w-50 align-middle">
        <div className="d-flex justify-content-between align-items-center ">
          {/* <Link
            className="text-decoration-none"
            to={`/game-detail/${item?.id}`}
          > */}
          <span
            className="text-decoration-none"
            // to={`/${
            //   matchType === "cricket" || matchType === "politics"
            //     ? "game-detail/cricket"
            //     : `other-game-detail/${matchType}`
            // }/${item?.id}`}
            onClick={() => {
              expertSocketService.match.joinMatchRoom(item?.id, "user");

              navigate(
                `/${
                  matchType === "cricket" || matchType === "politics"
                    ? "game-detail/cricket"
                    : `other-game-detail/${matchType}`
                }/${item?.id}`
              );
            }}
          >
            <div
              className="one-v-one-title title-14"
              style={{ color: "#343a40" }}
            >
              {item?.title} /{" "}
              {moment(item?.startAt).tz(timezone).format("MMM DD YYYY h:mmA")}
            </div>
          </span>
          <div className="d-flex align-items-center gap-2">
            {/* Live Dot */}
            {item?.inPlay === "True" || item?.iplay === true ? (
              <span className="liveDot"></span>
            ) : (
              <span style={{ width: "16px", height: "16px" }}></span> // Placeholder space
            )}

            {/* TV Icon */}
            {item?.tv === "True" || item?.tv === true ? (
              <FiMonitor />
            ) : (
              <span style={{ width: "16px", height: "16px" }}></span> // Placeholder space
            )}

            {/* Fancy Icon */}
            {item?.f === "True" || item?.f === true ? (
              <span className="fancy">
                <img src="/ic_fancy.png" alt={"fancy"} />
              </span>
            ) : (
              <span style={{ width: "16px", height: "16px" }}></span> // Placeholder space
            )}
            {/* Bookmaker Icon */}
            {item?.bm == "True" ||
            item?.bm == true ||
            item?.isBookmaker.length > 0 ? (
              <span className="bookmaker">
                <img src="/ic_bm.png" alt={"bookmaker"} />
              </span>
            ) : (
              <span style={{ width: "18px", height: "16px" }}></span> // Placeholder space
            )}
          </div>
        </div>
      </td>
      {matchType === "politics" ? (
        <>
          <td style={{ width: "10%", position: "relative" }} colSpan={2}>
            {(matchType === "politics" ? (
              <div className="suspended-list-rates">
                <FaLock color="#fff" />
              </div>
            ) : (
              item?.matchOdds?.[0]?.status === "SUSPENDED"
            )) && (
              <div className="suspended-list-rates">
                <FaLock color="#fff" />
              </div>
            )}
            <BackLayComponent
              backRate={
                (item?.matchOdds?.[0]?.runners &&
                  item?.matchOdds?.[0]?.runners[0]?.ex?.availableToBack?.[
                    item?.matchOdds?.[0]?.runners[0]?.ex?.availableToBack
                      ?.length > 1
                      ? 2
                      : 0
                  ]?.price) ??
                item?.matchOdds?.[0]?.backTeamA ??
                0
              }
              layRate={
                (item?.matchOdds?.[0]?.runners &&
                  item?.matchOdds?.[0]?.runners[0]?.ex?.availableToLay[0]
                    ?.price) ??
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
                    item?.matchOdds?.[0]?.runners[2]?.ex?.availableToBack
                      ?.length > 1
                      ? 2
                      : 0
                  ]?.price) ??
                item?.matchOdds?.[0]?.backTeamC ??
                0
              }
              layRate={
                (item?.matchOdds?.[0]?.runners &&
                  item?.matchOdds?.[0]?.runners[2]?.ex?.availableToLay[0]
                    ?.price) ??
                item?.matchOdds?.[0]?.layTeamC ??
                0
              }
              active={false}
            />
          </td>
          <td style={{ width: "10%", position: "relative" }} colSpan={2}>
            {(matchType === "politics" ? (
              <div className="suspended-list-rates">
                <FaLock color="#fff" />
              </div>
            ) : (
              item?.matchOdds?.[0]?.status === "SUSPENDED"
            )) && (
              <div className="suspended-list-rates">
                <FaLock color="#fff" />
              </div>
            )}
            <BackLayComponent
              backRate={
                (item?.matchOdds?.[0]?.runners &&
                  item?.matchOdds?.[0]?.runners[0]?.ex?.availableToBack?.[
                    item?.matchOdds?.[0]?.runners[0]?.ex?.availableToBack
                      ?.length > 1
                      ? 2
                      : 0
                  ]?.price) ??
                item?.matchOdds?.[0]?.backTeamA ??
                0
              }
              layRate={
                (item?.matchOdds?.[0]?.runners &&
                  item?.matchOdds?.[0]?.runners[0]?.ex?.availableToLay[0]
                    ?.price) ??
                item?.matchOdds?.[0]?.layTeamA ??
                0
              }
              active={false}
            />
          </td>
        </>
      ) : (
        <>
          <td style={{ width: "10%", position: "relative" }} colSpan={2}>
            {(matchType === "politics" ? (
              <div className="suspended-list-rates">
                <FaLock color="#fff" />
              </div>
            ) : (
              item?.matchOdds?.[0]?.status === "SUSPENDED"
            )) && (
              <div className="suspended-list-rates">
                <FaLock color="#fff" />
              </div>
            )}
            <BackLayComponent
              backRate={item?.back1 || item?.section?.[0]?.odds?.[0]?.odds || 0}
              layRate={item?.lay1 || item?.section?.[0]?.odds?.[1]?.odds || 0}
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
                item?.back12 || item?.section?.[2]?.odds?.[0]?.odds || 0
              }
              layRate={item?.lay12 || item?.section?.[2]?.odds?.[1]?.odds || 0}
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
                item?.back11 || item?.section?.[1]?.odds?.[0]?.odds || 0
              }
              layRate={item?.lay11 || item?.section?.[1]?.odds?.[1]?.odds || 0}
              active={false}
            />
          </td>
        </>
      )}
    </tr>
  );
};

export default DesktopOneVOneGameTable;
