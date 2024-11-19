import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { liveCasinoList } from "../../../store/actions/cards/cardDetail";

const LiveCasinoMobile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { liveCasinoData } = useSelector((state: RootState) => state.card);

  const initialType =
    liveCasinoData && Object.keys(liveCasinoData).length > 0
      ? Object.keys(liveCasinoData)[0]
      : null;

  const [list, setList] = useState<Record<string, any>>({});
  const [type, setType] = useState<string>("");
  const [type2, setType2] = useState<string>("");
  const [game, setGame] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

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
  const LiveCasinoTab = ({ data2 }: { data2: any }) => {
    return (
      <div className="w-100 d-flex flex-row">
        {Object.keys(data2)?.map((item: any, index: number) => {
          const isActive = item === type2 ? true : false;
          return (
            <div
              key={index}
              onClick={() => {
                setGame(data2[item]);
                setType2(item);
              }}
              className="w-100 d-flex justify-content-center align-items-center py-1 px-4"
              style={{
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
        className="w-100 d-flex flex-row flex-wrap mt-1 ms-1"
        style={{ gap: "8px" }}
      >
        {data3?.map((item: any, index: number) => {
          return (
            <img
              key={index}
              src={item?.url_thumb}
              className="img-fluid"
              alt={item?.game_name}
              loading="lazy"
              style={{ width: "calc(50% - 10px)", height: "14vh" }}
            />
          );
        })}
      </div>
    );
  };
  const handleParent = (key: any) => {
    setType(key);
    const firstKey = Object.keys(liveCasinoData[key])[0];
    setType2(firstKey);
    setGame(liveCasinoData[key][firstKey]);
  };
  return (
    <><div className="w-100 d-flex flex-column mt-1 gap-2 ">
      <div className="w-100 d-flex man-tab px-6 bg-secondary">
        {Object.keys(list)?.map((key, index) => {
          const isActive = type === key;
          return (
            <div
              key={index}
              onClick={() => handleParent(key)}
              className={`w-100 d-flex justify-content-center px-2 align-items-center py-2 ${isActive ? "bg-tab text-white" : ""}`}
              style={{
                cursor: "pointer",
              }}
            >
              {key}
            </div>
          );
        })}
      </div>


    </div><div className="w-full d-flex flex-column bg-tab man-tab ">
        <LiveCasinoTab data2={list[type]} />
       
      </div> <LiveCasinoGames data3={game ?? []} /></>
  );
};

export default LiveCasinoMobile;
