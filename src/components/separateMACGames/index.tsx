import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { dt2020, maxbetLogo } from "../../assets/images";
import { liveCasinoLogin } from "../../store/actions/cards/cardDetail";
import { AppDispatch, RootState } from "../../store/store";
import { liveCasinoGameList, mac88ListJSON } from "../../utils/constants";
import NewLoader from "../commonComponent/newLoader";

interface SeperateMACGamesInterface {
  gameType?: string;
}

const SeperateMACGames = ({ gameType }: SeperateMACGamesInterface) => {
  const dispatch: AppDispatch = useDispatch();
  const { liveCasinoGame } = useSelector((state: RootState) => state.card);

  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const [game, setGame] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    let firstArr = [];
    if (gameType === "fantasy") {
      firstArr =
        import.meta.env.VITE_NODE_ENV == "production"
          ? liveCasinoGameList.filter(
              (item: any) =>
                item.game_id === "151027" || item.game_id === "151067"
            )
          : mac88ListJSON.filter(
              (item: any) =>
                item.game_name === "AVIATORX" ||
                item.game_name === "Aviator Blue"
            );
    } else {
      firstArr = (import.meta.env.VITE_NODE_ENV == "production"
        ? liveCasinoGameList
        : mac88ListJSON
      ).filter((item: any) => item.category === gameType);
    }
    setGame(firstArr);
    setIsLoading(false);
  }, [gameType]);

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

  const LiveCasinoGames = ({ data3 }: { data3: any }) => {
    return (
      <div
        className="w-100 d-flex flex-row flex-wrap mt-1 ms-1"
        style={{ gap: "8px" }}
      >
        {(data3 || [])?.map((item: any, index: number) => {
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

  return (
    <>
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

export default SeperateMACGames;
