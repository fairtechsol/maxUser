import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { dt2020, maxbetLogo } from "../../../assets/images";
import { liveCasinoLogin } from "../../../store/actions/cards/cardDetail";
import { AppDispatch, RootState } from "../../../store/store";
import { liveCasinoPics } from "../../../utils/constants";
import NewLoader from "../../commonComponent/newLoader";

const LiveCasinoMobile = () => {
  const { state } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { liveCasinoData, liveCasinoGame } = useSelector(
    (state: RootState) => state.card
  );

  const location = useLocation();

  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const [list, setList] = useState<Record<string, any>>({});
  const [type, setType] = useState<string>("");
  const [type2, setType2] = useState<string>("");
  const [game, setGame] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [casinoType, setCasinoType] = useState("casino");

  const handleParent = (key: any, secKey: string, casinoType: string) => {
    const inititalData =
      casinoType === "casino"
        ? liveCasinoData?.casino
        : liveCasinoData?.intCasino;
    setList(inititalData);
    setType(key);
    const firstKey = key === "All" ? Object.keys(inititalData[key])[0] : "All";
    setType2(secKey !== "" ? secKey : firstKey);
    setGame(inititalData[key][secKey !== "" ? secKey : firstKey]);
  };

  const handleCasinoType = (key: string) => {
    setCasinoType(key);
    handleParent(
      Object.keys(
        key === "casino" ? liveCasinoData?.casino : liveCasinoData?.intCasino
      )[0],
      "",
      key
    );
  };

  useEffect(() => {
    if (liveCasinoData && Object.keys(liveCasinoData).length > 0) {
      const initialType =
        liveCasinoData &&
        Object.keys(
          casinoType === "casino"
            ? liveCasinoData.casino
            : liveCasinoData.intCasino
        ).length > 0
          ? Object.keys(
              casinoType === "casino"
                ? liveCasinoData.casino
                : liveCasinoData.intCasino
            )[0]
          : null;
      const inititalData =
        casinoType === "casino"
          ? liveCasinoData?.casino
          : liveCasinoData?.intCasino;
      setList(inititalData);
      setType(Object.keys(inititalData)[0]);
      const firstKey =
        casinoType === "casino"
          ? "All"
          : Object.keys(inititalData?.[initialType])[0];
      setType2(firstKey);
      const firstObject = inititalData[initialType][firstKey];
      setGame(firstObject);
      setIsLoading(false);
    }
  }, [liveCasinoData, location]);

  useEffect(() => {
    if (
      state?.key &&
      liveCasinoData &&
      Object.keys(liveCasinoData).length > 0
    ) {
      handleParent("All", state.key, "intCasino");
    }
  }, [state, liveCasinoData]);

  if (isLoading) {
    return (
      <div className="w-100 d-flex justify-content-center align-items-center">
        <NewLoader />
      </div>
    );
  }

  const handleGame = (data: any) => {
    let payLoad: any = {
      gameId: data?.game_id,
      platformId: "mobile",
      providerName: data?.provider_name,
    };
    dispatch(liveCasinoLogin(payLoad));
    setIsShow(true);
  };
  const LiveCasinoTab = ({ data2 }: { data2: any }) => {
    return (
      <div className="w-100 d-flex flex-row">
        {Object.keys(data2)
          ?.sort((a, b) => {
            if (a === "All") return -1;
            if (b === "All") return 1;
            return 0;
          })
          ?.map((item: any, index: number) => {
            const isActive = item === type2 ? true : false;
            return (
              <div
                key={index}
                onClick={() => {
                  setGame(data2[item]);
                  setType2(item);
                }}
                className="w-100 flex-column d-flex justify-content-center align-items-center py-1 px-3 title-14 fbold"
                style={{
                  cursor: "pointer",
                  backgroundColor: isActive ? "#ffc742" : "#004A25",
                  border: "1px solid #fff",
                  color: isActive ? "#000" : "#fff",
                }}
              >
                <img
                  src={liveCasinoPics[item]}
                  alt="abc"
                  style={{
                    height: 30,
                    width: 30,
                    filter: !isActive
                      ? "invert(98%) sepia(0%) saturate(0%) hue-rotate(290deg) brightness(104%) contrast(101%)"
                      : "",
                  }}
                />
                {item}
              </div>
            );
          })}
      </div>
    );
  };
  const LiveCasinoGames = ({ data3 }: { data3: any }) => {
    return (
      <div
        className="w-100 d-flex flex-row flex-wrap mt-1 ms-1"
        style={{ gap: "8px" }}
      >
        {data3?.map((item: any, index: number) => {
          return (
            <img
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = dt2020;
              }}
              key={index}
              src={item?.url_thumb}
              className="img-fluid"
              alt={item?.game_name}
              loading="lazy"
              style={{ width: "calc(50% - 10px)", height: "14vh" }}
              onClick={() => handleGame(item)}
            />
          );
        })}
      </div>
    );
  };
  // const GameScreen = ({ data4 }: { data4: any }) => {
  //   return (
  //     <div className="d-flex flex-column mt-1 position-absolute" style={{width:"100vw",height:"vh"}}>
  //       <div className="w-100 d-flex flex-row justify-content-between align-items-center px-1 py-2 bg-primary text-white">
  //         <span>{gameData?.game_name}</span>
  //         <div className="fbold" onClick={() => setIsShow(false)}>
  //           EXIT
  //         </div>
  //       </div>
  //       <div className="w-100" style={{ height: "80vh" }}>
  //         <iframe
  //           src={data4?.url}
  //           title="Live Stream"
  //           referrerPolicy={"strict-origin-when-cross-origin"}
  //           width={"100%"}
  //           height={"100%"}
  //         ></iframe>
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <>
      <div className="w-100 d-flex flex-column gap-2 ">
        <div className="d-flex man-tab px-6">
          {[
            { id: "casino", val: "Casino" },
            { id: "intCasino", val: "Live Casino" },
          ]?.map((key, index) => {
            const isActive = casinoType === key.id;
            return (
              <div
                key={index}
                onClick={() => handleCasinoType(key.id)}
                className={`w-100 d-flex justify-content-center px-3 align-items-center fbold title-14 py-2 no-wrap`}
                style={{
                  cursor: "pointer",
                  backgroundColor: isActive ? "#ffc742" : "#004A25",
                  borderRight: "1px solid #fff",
                  borderBottom: "1px solid #fff",
                  color: isActive ? "#000" : "#fff",
                  height: "3rem"
                }}
              >
                {key.val}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-100 d-flex flex-column gap-2 ">
        <div className="d-flex man-tab px-6">
          {Object.keys(list)?.map((key, index) => {
            const isActive = type === key;
            return (
              <div
                key={index}
                onClick={() => handleParent(key, "", casinoType)}
                className={`w-100 d-flex justify-content-center px-3 align-items-center fbold title-14 py-2 no-wrap`}
                style={{
                  cursor: "pointer",
                  backgroundColor: isActive ? "#ffc742" : "#004A25",
                  borderRight: "1px solid #fff",
                  color: isActive ? "#000" : "#fff",
                }}
              >
                {key}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full d-flex flex-column bg-tab man-tab">
        <LiveCasinoTab data2={list[type]} />
      </div>{" "}
      <LiveCasinoGames data3={game ?? []} />
      <Modal show={isShow} fullscreen={true} onHide={() => setIsShow(false)}>
        <Modal.Header
          // closeButton
          className="p-2"
          style={{ color: "#fff", backgroundColor: "#004A25" }}
        >
          <Modal.Title className="w-100">
            <div className="w-100 d-flex justify-content-between align-items-center lh-1">
              <div
                className="d-flex flex-row align-items-center"
                onClick={() => {
                  // navigate("/home");
                  setIsShow(false);
                }}
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
    </>
  );
};

export default LiveCasinoMobile;
