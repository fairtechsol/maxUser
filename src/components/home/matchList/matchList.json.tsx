import { BiCricketBall } from "react-icons/bi";
import { IoTennisball } from "react-icons/io5";
import { RiFootballLine } from "react-icons/ri";
import { GAME_TYPE } from "../../../utils/enum";
import { GiBasketballBall } from "react-icons/gi";
import { MdSportsKabaddi } from "react-icons/md";

import { IoGameController } from "react-icons/io5";
import { GiHorseHead } from "react-icons/gi";
import { FaTableTennis } from "react-icons/fa";
import { GiPoolTriangle } from "react-icons/gi";
import { TbPlayVolleyball } from "react-icons/tb";
import { GiHound } from "react-icons/gi";
const MatchListJson = () => {
  return [
    {
      id: "football",
      name: "Football",
      icon: <RiFootballLine />,
      type: GAME_TYPE.ONE_V_ONE,
    },
    {
      id: "tennis",
      name: "Tennis",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <IoTennisball />,
    },
    {
      id: "cricket",
      name: "Cricket",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <BiCricketBall />,
    },
    {
      id: "horseracing",
      name: "Horse Racing",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <GiHorseHead />,
    },
    {
      id: "tabletennis",
      name: "Table Tennis",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <FaTableTennis />,
    },
    {
      id: "greyhoundracing",
      name: "Greyhound Racing",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <GiHound />,
    },
    {
      id: "basketball",
      name: "Basketball",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <GiBasketballBall />,
    },
    {
      id: "volleyball",
      name: "Volleyball",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <TbPlayVolleyball />,
    },
    {
      id: "kabaddi",
      name: "Kabaddi",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <MdSportsKabaddi />,
    },
    {
      id: "futsal",
      name: "Futsal",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <IoGameController />,
    },
    {
      icon: <IoGameController />,
      id: "egames",
      name: "E Games",
      type: GAME_TYPE.ONE_V_ONE,
    },
    {
      icon: <GiPoolTriangle />,
      id: "snooker",
      name: "Snooker",
      type: GAME_TYPE.ONE_V_ONE,
    },
  ];
};

export default MatchListJson;
