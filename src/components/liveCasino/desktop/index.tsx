import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { liveCasinoLogin } from "../../../store/actions/cards/cardDetail";

const LiveCasinoDesktop = () => {
  const dispatch: AppDispatch = useDispatch();
  const { liveCasinoData, liveCasinoGame } = useSelector(
    (state: RootState) => state.card
  );

  const initialType =
    liveCasinoData && Object.keys(liveCasinoData).length > 0
      ? Object.keys(liveCasinoData)[0]
      : null;

  const [list, setList] = useState<Record<string, any>>({});
  const [type, setType] = useState<string>("");
  const [type2, setType2] = useState<string>("");
  const [game, setGame] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [gameData, setGameData] = useState<any>()

  useEffect(() => {
    if (liveCasinoData && Object.keys(liveCasinoData).length > 0) {
      setList(liveCasinoData);
      setType(Object.keys(liveCasinoData)[0]);
      const firstKey = Object.keys(liveCasinoData[initialType])[0];
      setType2(Object.keys(liveCasinoData[initialType])[0]);
      const firstObject = liveCasinoData[initialType][firstKey];
      setGame(firstObject);
      setIsLoading(false);
    }
  }, [liveCasinoData]);

  if (isLoading) {
    return (
      <div className="w-100 d-flex justify-content-center align-items-center">
        <p>Loading...</p>
      </div>
    );
  }

  const handleGame = (data: any) => {
    setGameData(data)
    let payLoad: any = {
      gameId: data?.game_id,
      platformId: "desktop",
      providerName: data?.provider_name,
    };
    dispatch(liveCasinoLogin(payLoad));
    setIsShow(true);
  };

  const LiveCasinoTab = ({ data2 }: { data2: any }) => {
    return (
      <div className="w-100 d-flex flex-row bg-tab">
        {Object.keys(data2)?.map((item: any, index: number) => {
          const isActive = item === type2 ? true : false;
          return (
            <div
              key={index}
              onClick={() => {
                setGame(data2[item]);
                setType2(item);
              }}
              className="d-flex justify-content-center align-items-center py-1 px-4"
              style={{
                width: "100px",
                cursor: "pointer",
                backgroundColor: isActive ? "#004A25" : "",
                color: isActive ? "#fff" : "#000",
              }}
            >
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
        className="w-100 d-flex flex-row flex-wrap mt-1"
        style={{ gap: "10px" }}
      >
        {data3?.map((item: any, index: number) => {
          return (
            <img
              key={index}
              src={item?.url_thumb}
              className="img-fluid"
              alt={item?.game_name}
              loading="lazy"
              style={{ width: "19%", height: "10vh" }}
              onClick={(e) => {
                e.stopPropagation();
                handleGame(item);
              }}
            />
          );
        })}
      </div>
    );
  };
  const GameScreen = ({ data4 }: { data4: any }) => {
    return (
      <div
        className="w-100 d-flex flex-column mt-1"
      >
        <div className="w-100 d-flex flex-row justify-content-between align-items-center px-1 py-2 bg-primary text-white">
          <span>{gameData?.game_name}</span>
          <div className="fbold" onClick={() => setIsShow(false)}>EXIT</div>
        </div>
        <div className="w-100" style={{height:"80vh"}}>
          <iframe
            src={data4?.url}
            title="Live Stream"
            referrerPolicy={"strict-origin-when-cross-origin"}
            width={"100%"}
            height={"100%"}
          ></iframe>
        </div>
      </div>
    );
  };
  const handleParent = (key: any) => {
    setType(key);
    const firstKey = Object.keys(liveCasinoData[key])[0];
    setType2(firstKey);
    setGame(liveCasinoData[key][firstKey]);
  };
  return isShow ? (
    <GameScreen data4={liveCasinoGame} />
  ) : (
    <div className="w-100 d-flex flex-row mt-1 gap-2">
      <div className="w-25 h-100 d-flex flex-column bg-secondary">
        {Object.keys(list)?.map((key, index) => {
          const isActive = type === key;
          return (
            <div
              key={index}
              onClick={() => handleParent(key)}
              className={`w-100 d-flex justify-content-center align-items-center py-2 ${
                isActive ? "bg-tab text-white" : ""
              }`}
              style={{
                cursor: "pointer",
              }}
            >
              {key}
            </div>
          );
        })}
      </div>

      <div className="w-75 d-flex flex-column">
        <LiveCasinoTab data2={list[type]} />
        <LiveCasinoGames data3={game ?? []} />
      </div>
    </div>
  );
};

export default LiveCasinoDesktop;
