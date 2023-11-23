import { BiCricketBall } from "react-icons/bi";
import { IoTennisball } from "react-icons/io5";
import { RiFootballLine } from "react-icons/ri";
import { GAME_TYPE } from "../../../utils/enum";

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
      icon: <BiCricketBall />,
    },
    {
      id: "tabletennis",
      name: "Table Tennis",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <BiCricketBall />,
    },
    {
      id: "greyhoundracing",
      name: "Greyhound Racing",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <BiCricketBall />,
    },
    {
      id: "basketball",
      name: "Basketball",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <BiCricketBall />,
    },
    {
      id: "volleyball",
      name: "Volleyball",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <BiCricketBall />,
    },
    {
      id: "kabaddi",
      name: "Kabaddi",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <BiCricketBall />,
    },
    {
      id: "futsal",
      name: "Futsal",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <BiCricketBall />,
    },
    {
      icon: <BiCricketBall />,
      id: "egames",
      name: "E Games",
      type: GAME_TYPE.ONE_V_ONE,
    },
    {
      icon: <BiCricketBall />,
      id: "snooker",
      name: "Snooker",
      type: GAME_TYPE.ONE_V_ONE,
    },
  ];
};

export default MatchListJson;
