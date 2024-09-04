import { BiCricketBall } from "react-icons/bi";
import { GiBasketballBall } from "react-icons/gi";
import { IoTennisball } from "react-icons/io5";
import { MdSportsKabaddi } from "react-icons/md";
import { RiFootballLine } from "react-icons/ri";
import { GAME_TYPE } from "../../../utils/enum";

import { FaTableTennis } from "react-icons/fa";
import { GiHorseHead, GiHound, GiPoolTriangle } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { TbPlayVolleyball } from "react-icons/tb";
import {
  Badmin,
  Esoc,
  Grey,
  Horse,
  Kabaddi,
  Snooker,
  TableT,
  Volley,
  amfootball,
} from "../../../assets/images";
const TrendJson = () => {
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
      id: "esoccer",
      name: "Esoccer",
      type: GAME_TYPE.ONE_V_ONE,
      img: Esoc,
    },
    {
      id: "horseRacing",
      name: "Horse Racing",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <GiHorseHead />,
      img: Horse,
    },
    {
      id: "tabletennis",
      name: "Table Tennis",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <FaTableTennis />,
      img: TableT,
    },
    {
      id: "greyHound",
      name: "Greyhound Racing",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <GiHound />,
      img: Grey,
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
      img: Volley,
    },
    {
      id: "kabaddi",
      name: "Kabaddi",
      type: GAME_TYPE.ONE_V_ONE,
      icon: <MdSportsKabaddi />,
      img: Kabaddi,
    },
    {
      id: "badminton",
      name: "Badminton",
      type: GAME_TYPE.ONE_V_ONE,
      img: Badmin,
    },
    {
      id: "americanfootball",
      name: "American Football",
      type: GAME_TYPE.ONE_V_ONE,
      img: amfootball,
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
      img: Snooker,
    },
  ];
};

export default TrendJson;
